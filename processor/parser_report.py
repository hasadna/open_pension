import os
import sys
import json
import excel_adapter
import mongo_adapter
from logger import Logger
import config
from translator import translate_from_hebrew


class ExcelParser:
    FIRST_TABLE = None
    NOT_ISRAEL_WORDS = ['מט"ח', 'חוץ לארץ', 'חו"ל']
    ISRAEL_WORDS = ['ישראל', 'בארץ']
    FIRST_FIELD_TABLE = ['שם נ"ע', 'שם המנפיק/שם נייר ערך']
    MAX_METADATA_ROWS = 10

    def __init__(self, logger):
        self._logger = logger
        self._is_israel = None

    def parse_file(self, file_path):
        """
        Get pension report excel file and parse data by sheet
        Move over all excel data sheet and parse
        :param file_path: full file path
        :return: parsed data :type: dictionary
            """
        # Load in the workbook file
        try:
            self._workbook = excel_adapter.ExcelLoader(file_path=file_path, logger=self._logger)
        except Exception as ex:
                self._logger.error("Failed to load {0}, {1}".format(ex, file_path))
                return False

        if not self._workbook:
            self._logger.error("Failed to load excel file")
            return False

        # Move over the all sheets
        for sheet_name in self._workbook.sheet_names:
            if sheet_name == 'סכום נכסי הקרן':
                # :todo: need parse this sheet ?
                continue
            # Parse sheet
            sheet_data = self._parse_sheet(sheet_name=sheet_name, orig_file=os.path.basename(file_path))
            if not sheet_data:
                self._logger.warn("Not got data from this sheet. maybe is empty.. {0} {1}".format(sheet_name,
                                                                                                  file_path))
                continue

            yield sheet_name, sheet_data

    def _parse_sheet(self, sheet_name, orig_file="", start_row=0, start_column=2):
        """
        Parse excel pension report sheet
        :param sheet_name: sheet name
        :param start_row: row number to start
        :param start_column: column numbrt to start
        :return: True / False
        """
        current_row = start_row
        current_column = start_column
        current_cell = None
        row_data = None

        data = []
        sheet_metadata = {
            "Investment": sheet_name,
            "orig_file" : orig_file
        }

        # Parse metadata, stop when find the first table field or until max metadata
        start_metadata_row = current_row
        while current_cell not in self.FIRST_FIELD_TABLE:
            if current_cell:
                metadata = self._get_metadata(data=row_data)
                if metadata:
                    sheet_metadata[metadata[0]] = metadata[1]

            current_row += 1
            row_data = self._workbook.get_entire_row(sheet_name=sheet_name,
                                                     row=current_row,
                                                     min_column=current_column)

            if row_data:
                # strip all spaces from start and end string
                current_cell = row_data[0].strip()
            else:
                current_cell = None

            if current_row - start_metadata_row > self.MAX_METADATA_ROWS:
                self._logger.error("Failed to parser sheet. max metadata rows in {0}/{1}".format(orig_file, sheet_name))
                return None
        else:
            # Get fields name
            fields_name_hebrew = self._workbook.get_entire_row(sheet_name=sheet_name,
                                                        row=current_row,
                                                        min_column=start_column)

            fields_len = len(fields_name_hebrew)

            fields_name_translated = []
            for field in fields_name_hebrew:
                translated = translate_from_hebrew(word=str(field))
                if not translated:
                    # If failed to translate append the hebrew name
                    self._logger.warn("Failed to translate {0} from hebrew")
                    fields_name_translated.append(field)
                else:
                    fields_name_translated.append(translated)

        empty_len = 0
        current_cell = ""

        # Parsing until find the end of excel sheet
        while current_cell not in ['* בעל ענין/צד קשור','בהתאם לשיטה שיושמה בדוח הכספי **']:

            if empty_len > 5:
                # self._logger.info("max empty row")
                break

            # Get next row
            current_row += 1
            data_row = self._workbook.get_entire_row(sheet_name=sheet_name,
                                                     row=current_row,
                                                     min_column=start_column,
                                                     max_column=fields_len+start_column)

            # Check if is empty row or first cell is empty
            if not data_row or not data_row[0]:
                empty_len += 1
                continue

            current_cell = data_row[0]

            # if current cell start is total row
            if current_cell.find('סה"כ') != -1:
                self._parse_total_field(current_cell)
                continue
            else:
                row = {
                    'שייכות למדד': self._total_data,
                    "ישראל": self._is_israel,
                    "שורה בקובץ": current_row
                }

                # if another row is empty continue
                # if not all(data_row[1:]):
                #     continue

                for i in range(0, fields_len):
                    try:
                        row[fields_name[i].strip()] = data_row[i]
                    except IndexError as ex:
                        self._logger.error("Failed {0} {1}".format(ex, fields_name))

                # check if stock name not empty
                # if row[first_field_table]:
                # Add metadata
                row.update(sheet_metadata)
                # Add row data to data list
                data.append(row)

        return data

    def _get_metadata(self, data):
        """
        Parse metadata data
        :param data: list of data   
        :return:
        """
        first_cell = data[0]
        if not first_cell:
            self._logger.error("No data in first cell")
            return None, None

        finder = first_cell.find(":")
        # find func return -1 when not find
        if finder != -1:
            # Check if the colon char is not last data char (The meaning data in the first cell)
            if len(first_cell) > finder:
                return first_cell[:finder], first_cell[finder+1:]

        # check if len of data is bigger than one
        elif len(data) > 1:
            return first_cell, data[1]

    def _parse_total_field(self, data):
        """
        Parse total field, total filed start with 'סה"כ' word
        In total field we get if the investment in Israel
        :param data:
        :return:
        """
        # strip 'סה"כ' word
        self._total_data = data.strip('סה"כ')

        # lambda warp for string find function
        # Finder return True/False , instead of number in find function
        # Check if search word in self._total_data
        finder = lambda search_word: False if self._total_data.find(search_word) == -1 else True

        # Get words list and use finder lambda and filter function to check if one or more of word_list in data string
        recursive_finder = lambda words_list: True if len(list(filter(finder, words_list))) else False

        if recursive_finder(words_list=self.ISRAEL_WORDS):
            self._is_israel = True
            # print("{0} is israel".format(data))
        elif recursive_finder(words_list=self.NOT_ISRAEL_WORDS):
            self._is_israel = False
            # print("{0} is not israel".format(data))

        # print(self._total_data)


def save_to_json_file(path, file_name, data):
    if not os.path.isdir(path):
        raise Exception("folder not exists {0}".format(path))

    full_path = os.path.join(path, file_name)
    try:
        with open(full_path, "w") as outfile:
            json.dump(data, outfile)
        return True
    except Exception as ex:
        raise ValueError("Failed to write json file {0}".format(ex))


if __name__ == '__main__':
    logger = Logger(logger_name="parser_report")
    DB_NAME = "2018Q1"
    mongo = mongo_adapter.MongoAdapter(server_address = config.MONGO_SERVER_ADDRESS,
                                       server_port = config.MONGO_SERVER_PORT,
                                       user = config.MONGO_SERVER_USERNAME,
                                       password = config.MONGO_SERVER_PASSWORD,
                                       logger=logger)
    if not mongo.is_connection:
        logger.error("Failed to connect mongodb server")
        sys.exit(1)

    if not mongo.is_db(db_name=DB_NAME):
        logger.error("db not exist in mongodb server")
        sys.exit(1)

    process_xl = ExcelParser(logger=logger)

    for root, dirs, files in os.walk("/home/user/Documents/2018Q1-2", followlinks=False):
        for file in files:
            file_path = os.path.join(root, file)

            investment_house = os.path.basename(root)
            logger.add_extra(info=investment_house)
            logger.info(msg="Start working on {0} investment house: {1}".format(file_path, investment_house))
            for sheet_name, sheet_data in process_xl.parse_file(file_path=file_path):
                if not sheet_data:
                    logger.warn("Not got data from sheet")
                    continue

                c = 0
                for data in sheet_data:
                    if 'מספר ני"ע' in data and not data['מספר ני"ע']:
                        c += 1
                        continue
                    if not mongo.insert_document(db_name=DB_NAME,
                                                 collection_name=investment_house,
                                                 data=data):
                        print("Failed to insert document to mongodb")
                # if c > 5:
                #     logger.warn(msg="number of empty stock number is bigger than 5 - "
                #                     "{0} - sheet name: {1}".format(c, sheet_name))

            logger.info("Done with {0}".format(file))

    """  
        
    for sheet_data in process_xl.parse_file(file_path="test.xlsx"):
        # print(sheet_data)
        # try:
        # save_to_json_file(path="/tmp", file_name=sheet_data["metadata"]['אפיק השקעה'], data=sheet_data)
        mongo.insert_document(db_name="reports_raw2", collection_name=sheet_data["metadata"]['אפיק השקעה'], data=sheet_data)
        # except Exception as ex:
        #     logger.error("{0} - Failed to write json file {1}".format(sheet_data["metadata"]['אפיק השקעה'], ex))
"""