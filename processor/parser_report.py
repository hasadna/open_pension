import os
import sys
import excel_adapter
import mongo_adapter
from loggers.logger import Logger


class ExcelParser:
    FIRST_TABLE = None
    NOT_ISRAEL_WORDS = ['מט"ח', 'חוץ לארץ', 'חו"ל']
    ISRAEL_WORDS = ['ישראל', 'בארץ']
    FIRST_FIELD_TABLE = ['שם נ"ע', 'שם המנפיק/שם נייר ערך']
    MAX_METADATA_ROWS = 10
    SHEETS_TO_SKIP = ['סכום נכסי הקרן']

    def __init__(self, logger):
        # todo: Pull a logger based on settings: A logger that will throw it to logz.io or a logger that will throw it
        #       to a local DB.
        self._logger = logger
        self._is_israel = None

    def parse_file(self, file_path):
        """
        Get pension report excel file and parse data by sheet
        Move over all excel data sheet and parse.

        :param file_path:
            The file path to process.
        :return:
        """
        try:
            self._workbook = excel_adapter.ExcelLoader(file_path=file_path, logger=self._logger)
        except Exception as ex:
            self._logger.error("Failed to load {0}, {1}".format(ex, file_path))
            return False

        if not self._workbook:
            self._logger.error("Failed to load excel file")
            return False

        # Move over the all sheets.
        for sheet_name in self._workbook.sheet_names:
            if sheet_name in self.SHEETS_TO_SKIP:
                # No need to parse this one since this is a sum of all the other sheets.
                continue

            # Parse sheet.
            sheet_data = self._parse_sheet(sheet_name=sheet_name, orig_file=file_path)

            if not sheet_name:
                self._logger.error("Failed to parser sheet {0}".format(sheet_name))
                continue

            return sheet_data

    def _parse_sheet(self, sheet_name, orig_file="", start_row=0, start_column=2):
        """
        Parse excel pension report sheet.

        :param sheet_name:
            Sheet name.
        :param start_row:
            Row number to start.
        :param start_column:
            Column number to start.
        :return:
            True / False
        """
        current_row = start_row
        current_column = start_column
        current_cell = None
        row_data = None

        data = []
        sheet_metadata = {
            "Investment": sheet_name,
            "orig_file": orig_file
        }

        # Parse metadata, stop when find the first table field or until max metadata.
        start_metadata_row = current_row

        while current_cell not in self.FIRST_FIELD_TABLE:

            if current_cell:
                metadata = self._get_metadata(data=row_data)

                if metadata:
                    sheet_metadata[metadata[0]] = metadata[1]

            current_row += 1
            row_data = self._workbook.get_entire_row(sheet_name=sheet_name, row=current_row, min_column=current_column)

            if row_data:
                # strip all spaces from start and end string.
                current_cell = row_data[0].strip()
            else:
                current_cell = None

            if current_row - start_metadata_row > self.MAX_METADATA_ROWS:
                self._logger.error("Failed to parser sheet. max metadata rows in {0}/{1}".format(orig_file, sheet_name))
                return None
        else:
            first_field_table = current_cell
            # Get fields name.
            fields_name = self._workbook.get_entire_row(sheet_name=sheet_name, row=current_row, min_column=start_column)
            fields_len = len(fields_name)

        empty_len = 0
        current_cell = ""

        while current_cell not in ['* בעל ענין/צד קשור', 'בהתאם לשיטה שיושמה בדוח הכספי **']:

            if empty_len > 5:
                break

            # Get next row.
            current_row += 1
            data_row = self._workbook.get_entire_row(sheet_name=sheet_name,
                                                     row=current_row,
                                                     min_column=start_column,
                                                     max_column=fields_len+start_column)

            # Check if is empty row or first cell is empty.
            if not data_row or not data_row[0]:
                empty_len += 1
                continue

            current_cell = data_row[0]
            if current_cell.find('סה"כ') != -1:
                self._parse_total_field(current_cell)
            else:
                row = {
                    "שייכות למדד": self._total_data,
                    "ישראל": self._is_israel
                }

                for i in range(0, fields_len):
                    try:
                        row[fields_name[i].strip()] = data_row[i]
                    except IndexError as ex:
                        self._logger.error(
                            "Failed {0} {1}".format(ex, fields_name))

                # Check if stock name not empty.
                if row[first_field_table]:
                    # Add metadata and add row data to data list.
                    row.update(sheet_metadata)
                    data.append(row)

        return data

    def _get_metadata(self, data):
        """
        Parse metadata data.

        :param data:
            The data to parse.
        :return:
        """
        first_cell = data[0]
        if not first_cell:
            self._logger.error("No data in first cell")
            return None, None

        finder = first_cell.find(":")
        if finder != -1:
            # Check if the colon char is not last data char (The meaning data in the first cell).
            if len(first_cell) > finder:
                return first_cell[:finder], first_cell[finder+1:]
        elif len(data) > 1:
            return first_cell, data[1]

    def _parse_total_field(self, data):
        """
        Parse total field, total filed start with 'סה"כ' word
        In total field we get if the investment in Israel
        :param data:
        :return:
        """
        self._total_data = data.strip('סה"כ')

        # lambda warp for string find function
        # Finder return True/False , instead of number in find function
        # Check if search word in self._total_data
        def finder(search_word): return False if self._total_data.find(
            search_word) == -1 else True

        # Get words list and use finder lambda and filter function to check if one or more of word_list in data string
        def recursive_finder(words_list): return True if len(
            list(filter(finder, words_list))) else False

        if recursive_finder(words_list=self.ISRAEL_WORDS):
            self._is_israel = True
        elif recursive_finder(words_list=self.NOT_ISRAEL_WORDS):
            self._is_israel = False
