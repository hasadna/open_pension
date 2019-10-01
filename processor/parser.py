import json
import os
from excel_adapter import ExcelProcessor
from translator import translate_from_hebrew
from exceptions import ExcelWorkbookParsingError, ExcelSheetParsingError


class ExcelParser:
    """
    This class receive a file, process that file and return an object representing the file.
    """
    FIRST_TABLE = None
    NOT_ISRAEL_WORDS = ['מט"ח', 'חוץ לארץ', 'חו"ל']
    ISRAEL_WORDS = ['ישראל', 'בארץ']
    FIRST_FIELD_TABLE = ['שם נ"ע', 'שם המנפיק/שם נייר ערך']
    MAX_METADATA_ROWS = 10
    SHEETS_TO_SKIP = ['סכום נכסי הקרן']
    CELLS_TO_SKIP = ['* בעל ענין/צד קשור', 'בהתאם לשיטה שיושמה בדוח הכספי **']

    def __init__(self, logger):
        self._logger = logger
        self._is_israel = None
        self._workbook = None

    def parse(self, file_path):
        """
        Get pension report excel file and parse data by sheet. Move over all excel data sheet and parse.

        :param file_path: Full file path.

        :return: parsed data :type: dictionary
        """
        try:
            self._workbook = ExcelProcessor(file_path=file_path, logger=self._logger)

        except Exception as e:
            self._logger.error(f'Failed to parse {file_path}: {str(e)}')
            errors = str(e) if str(e) else 'Workbook loading error'
            raise ExcelWorkbookParsingError(parse_error=errors, file_name=file_path)

        if not self._workbook:
            self._logger.error(f"Failed to load excel file - {file_path}")
            return False

        # Move over the all sheets.
        parsed_file = dict()

        for sheet_name in self._workbook.sheet_names:

            if sheet_name in self.SHEETS_TO_SKIP:
                # We need to skip this sheet.
                continue

            try:
                sheet_data = self._parse_sheet(sheet_name=sheet_name, orig_file=file_path)
            except Exception as e:
                self._logger.error(f'Failed to parse {sheet_name} in {file_path}')
                raise ExcelSheetParsingError(parse_error=str(e), sheet_name=sheet_name)

            if not sheet_data:
                self._logger.warn(f'No sheet data for "{sheet_name}". maybe its empty...')
                continue

            parsed_file[sheet_name] = sheet_data

        return parsed_file

    def test_parse_file(self, file_path: str):
        """
        This function is designed to try and find all the current parsing problems.

        :param file_path: The file which we want to try and parse.

        :return: The results of the test -> dict(successful={...}, error={...})
        """
        result = dict(successful=dict(), error=dict())
        processed_sheets_generator = self.parse(file_path=file_path)

        while True:
            try:
                sheet_name, processed_sheet = next(processed_sheets_generator)

                if not result['successful'].get(file_path):
                    result['successful'][file_path] = dict()

                if not result['successful'][file_path].get(sheet_name):
                    result['successful'][file_path][sheet_name] = processed_sheet

                result['successful'][file_path][sheet_name] = processed_sheet

            except StopIteration:
                break

            except ExcelSheetParsingError as e:
                self._logger.error(f'Failed to parse sheet "{e.sheet_name}": {e.parse_error}')

                if not result['error'].get(e.parse_error):
                    result['error'][e.parse_error] = list()

                result['error'][e.parse_error].append(dict(sheet_name=e.sheet_name, file_name=file_path))

            except ExcelWorkbookParsingError as e:
                # TODO this is not working - only the last error is overridden.
                if not result['error'].get(e.parse_error):
                    result['error'][e.parse_error] = list()

                result['error'][e.parse_error].append(file_path)

            except Exception as e:
                self._logger.error(f'Failed to parse sheet {str(e)}')

        return result

    def _parse_sheet(self, sheet_name, orig_file="", start_row=0, start_column=2):
        """
        Parse excel pension report sheet.

        :param sheet_name: Sheet name
        :param start_row: Row number to start
        :param start_column: Column number to start

        :return: True / False
        """
        current_row = start_row
        current_column = start_column
        current_cell = None
        row_data = None

        data = []
        sheet_metadata = {
            "Investment": sheet_name,
            "file_name": orig_file.split('/')[-1]
        }

        # Parse metadata, stop when find the first table field or until max metadata.
        start_metadata_row = current_row
        while current_cell not in self.FIRST_FIELD_TABLE:
            if current_cell:
                metadata = self._get_metadata(data=row_data)

                if metadata:
                    translated_metadata = translate_from_hebrew(word=metadata[0])

                    if translated_metadata:
                        metadata_field = translated_metadata
                    else:
                        metadata_field = f'item_{metadata[0]}'

                    sheet_metadata[metadata_field] = metadata[1]

            current_row += 1
            row_data = self._workbook.get_entire_row(sheet_name=sheet_name, row=current_row, min_column=current_column)

            if row_data:
                # Strip all spaces from start and end string.
                current_cell = row_data[0].strip()
            else:
                current_cell = None

            if current_row - start_metadata_row > self.MAX_METADATA_ROWS:
                self._logger.error(f"Failed to parser sheet. max metadata rows in {orig_file}/{sheet_name}")
                return None

            # Get fields name.
            fields_len = len(self._workbook.get_entire_row(
                sheet_name=sheet_name,
                row=current_row,
                min_column=start_column
            ))

        empty_len = 0
        current_cell = ""

        # Parsing until find the end of excel sheet.
        while current_cell not in self.CELLS_TO_SKIP:

            if empty_len > 5:
                break

            current_row += 1
            data_row = self._workbook.get_entire_row(
                sheet_name=sheet_name,
                row=current_row,
                min_column=start_column,
                max_column=fields_len + start_column
            )

            # Check if is empty row or first cell is empty.
            if not data_row or not data_row[0]:
                empty_len += 1
                continue

            current_cell = data_row[0]

            # if current cell start is total row.
            if current_cell.find('סה"כ') != -1:
                self._parse_total_field(current_cell)
                continue
            else:
                row = {
                    "index": self._total_data,
                    "israel": self._is_israel,
                    "line_in_file": current_row
                }

                for i in range(0, fields_len):
                    try:
                        # todo: translate the field name.
                        row[f"column_{i}"] = data_row[i]
                    except IndexError as ex:
                        self._logger.error(f"Failed {ex}")

                # Get the rel field of column_1. column_1 is the column which determine if the row is qualified or not.
                column_1_translated_name = "column_1"

                if column_1_translated_name in row and row[column_1_translated_name]:
                    # Add metadata and add row data to data list.
                    row.update(sheet_metadata)
                    data.append(row)

        return data

    def _get_metadata(self, data):
        """
        Parse metadata data.

        :param data: list of data

        :return:
        """
        first_cell = data[0]

        if not first_cell:
            self._logger.error("No data in first cell")
            return None, None

        finder = first_cell.find(":")
        # Find func return -1 when not find.
        if finder != -1:
            # Check if the colon char is not last data char (The meaning data in the first cell).
            if len(first_cell) > finder:
                return first_cell[:finder], first_cell[finder + 1:]

        # Check if len of data is bigger than one.
        elif len(data) > 1:
            return first_cell, data[1]

    def _parse_total_field(self, data):
        """
        Parse total field, total filed start with 'סה"כ' word in total field we get if the investment in Israel.

        :param data:

        :return:
        """
        # strip 'סה"כ' word.
        self._total_data = data.strip('סה"כ')

        if self.__recursive_finder(words_list=self.ISRAEL_WORDS):
            self._is_israel = True
        elif self.__recursive_finder(words_list=self.NOT_ISRAEL_WORDS):
            self._is_israel = False

    def __finder(self, search_word):
        """
        return True/False , instead of number in find function.

        :param search_word:
        """
        return self._total_data.find(search_word) == -1

    def __recursive_finder(self, words_list):
        """
        Get words list and use finder lambda and filter function to check if one or more of word_list in data string.

        :param words_list:
        """
        return len(list(filter(self.__finder, words_list)))
