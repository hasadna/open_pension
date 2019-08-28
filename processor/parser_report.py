import json
import os
from typing import Tuple, Dict
import excel_adapter
from logger import Logger
from translator import translate_from_hebrew


class ExcelSheetParsingError(Exception):
    def __init__(self, *args, **kwargs):
        super(ExcelSheetParsingError, self).__init__()
        self.parse_error = kwargs['parse_error']
        self.sheet_name = kwargs['sheet_name']


class ExcelWorkbookParsingError(Exception):
    def __init__(self, *args, **kwargs):
        super(ExcelWorkbookParsingError, self).__init__()
        self.parse_error = kwargs['parse_error']
        self.file_name = kwargs['file_name']


class ExcelParser:
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

    def parse_file(self, file_path) -> Tuple[str, dict]:
        """
        Get pension report excel file and parse data by sheet. Move over all excel data sheet and parse.

        :param file_path: Full file path.

        :return: parsed data :type: dictionary
        """
        # Load in the workbook file
        try:
            self._workbook = excel_adapter.ExcelLoader(file_path=file_path, logger=self._logger)

        except Exception as e:
            self._logger.error(f'Failed to parse {file_path}')
            errors = str(e) if str(e) else 'Workbook loading error'
            raise ExcelWorkbookParsingError(parse_error=errors, file_name=file_path)

        if not self._workbook:
            self._logger.error("Failed to load excel file")
            return False

        # Move over the all sheets.
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

            yield sheet_name, sheet_data

    def test_parse_file(self, file_path: str) -> Dict[str, Dict[str, list]]:
        """
        This function is designed to try and find all the current parsing problems.

        :param file_path: The file which we want to try and parse.

        :return: The results of the test -> dict(successful={...}, error={...})
        """
        result = dict(successful=dict(), error=dict())
        processed_sheets_generator = self.parse_file(file_path=file_path)

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
                self._logger.error(f'Failed to parse sheet {e}')

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
            "orig_file": orig_file
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
                        metadata_field = 'item_{0}'.format(metadata[0])

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
        else:
            # Get fields name.
            fields_name_hebrew = self._workbook.get_entire_row(
                sheet_name=sheet_name,
                row=current_row,
                min_column=start_column
            )

            fields_len = len(fields_name_hebrew)

            fields_name = []
            for field in fields_name_hebrew:
                translated = translate_from_hebrew(word=str(field).strip().replace("*", ""))

                if not translated:
                    # If failed to translate append the hebrew name.
                    self._logger.warn(f"Failed to translate {field} from hebrew")
                    fields_name.append(f"item_{field}")
                else:
                    fields_name.append(translated)

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
                    'Index': self._total_data,
                    "Israel": self._is_israel,
                    "Line in file": current_row
                }

                for i in range(0, fields_len):
                    try:
                        row[fields_name[i].strip()] = data_row[i]
                    except IndexError as ex:
                        self._logger.error("Failed {0} {1}".format(ex, fields_name))

                if "Instrument Number" in row and row["Instrument Number"]:
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
        elif recursive_finder(words_list=self.NOT_ISRAEL_WORDS):
            self._is_israel = False


def save_to_json_file(path, file_name, data):
    """
    Saving json to file. Probably.

    :param path: The path of the file.
    :param file_name: The file name.
    :param data: The data to write.
    """
    if not os.path.isdir(path):
        raise Exception(f"folder not exists {path}")

    full_path = os.path.join(path, file_name)

    try:

        with open(full_path, "w") as outfile:
            json.dump(data, outfile)

        return True

    except Exception as ex:
        raise ValueError("Failed to write json file {0}".format(ex))


# TODO - to run i.e. do: python3 parser_report.py --root <input_files>
# TODO                   -t --investment_house <name> --test_file <test_output>
if __name__ == '__main__':
    import argparse

    parser = argparse.ArgumentParser()

    parser.add_argument('--root', type=str, help='The excels root paths')
    parser.add_argument('--investment_house', type=str, help='the related investment house')
    parser.add_argument('--test', '-t', action='store_true')
    parser.add_argument('--test_file', type=str)

    args = parser.parse_args()

    root_path = args.root
    test_parsing = args.test
    test_file = args.test_file
    investment_house = args.investment_house

    logger = Logger(logger_name="parser_report")

    DB_NAME = "parsed_reports"

    # TODO initialize MongoDB connection - no need to an adapter - just use pymongo
    # mongo = mongo_adapter.MongoAdapter(server_address=config.MONGO_SERVER_ADDRESS,
    #                                    server_port=27017,
    #                                    user=config.MONGO_SERVER_USERNAME,
    #                                    password=config.MONGO_SERVER_PASSWORD,
    #                                    logger=logger)
    # if not mongo.is_connection:
    #     logger.error("Failed to connect mongodb server")
    #     sys.exit(1)
    #
    # if not mongo.is_db(db_name=DB_NAME):
    #     logger.error("db not exist in mongodb server")
    #     sys.exit(1)

    excel_parser = ExcelParser(logger=logger)

    for root, dirs, files in os.walk(root_path, followlinks=False):

        logger.info(msg=f"Start working on {file_path} investment house: {investment_house}")
        number_of_fund = 'מספר ני"ע'
        for sheet_name, sheet_data in process_xl.parse_file(file_path=file_path):

            if not sheet_data:
                logger.warn("Not got data from sheet")
                continue

            c = 0
            for data in sheet_data:

                if number_of_fund in data and not data[number_of_fund]:
                    c += 1
                    continue

                if not mongo.insert_document(db_name=db_name, collection_name=investment_house, data=data):
                    print("Failed to insert document to mongodb")

        logger.info(f"Done with {file}")
        logger.info(msg=f'Start working on {file_path} investment house: {investment_house}')

        if test_parsing:
            result = excel_parser.test_parse_file(file_path=file_path)

            with open(test_file, 'w+') as test_result:
                test_result.write(json.dumps(result, indent=4))
        else:
            for sheet_name, sheet_data in excel_parser.parse_file(file_path=file_path):
                for data in sheet_data:

                    if number_of_fund in data and not data[number_of_fund]:
                        continue

                    # TODO aggregate insert operations for later bulk insert
                    # if not mongo.insert_document(db_name=DB_NAME,
                    #                              collection_name=investment_house,
                    #                              data=data):
                    #     print("Failed to insert document to mongodb")

        # TODO bulk insert into MongoDB

        logger.info(f'Done with {file}')
