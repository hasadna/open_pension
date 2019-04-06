from parser_report import ExcelParser
from loggers.fake_logger import FakeLogger


path = "C:\\Users\\roy.DM\\Projects\\open_processor\\assets\\513026484_gs.xlsx"

parser = ExcelParser(logger=FakeLogger)
parsed = parser.parse_file(file_path=path)

print(parsed)

# if __name__ == '__main__':
#     logger = Logger(logger_name="parser_report")
#     DB_NAME = "2018Q1"
#     mongo = mongo_adapter.MongoAdapter(server_address="127.0.0.1", server_port=27017, logger=logger)
#     if not mongo.is_connection:
#         logger.error("Failed to connect mongodb server")
#         sys.exit(1)
#
#     if not mongo.is_db(db_name=DB_NAME):
#         logger.error("db not exist in mongodb server")
#         sys.exit(1)
#
#     process_xl = ExcelParser(logger=logger)
#
#     for root, dirs, files in os.walk("/home/user/Documents/2018Q1-2", followlinks=False):
#         for file in files:
#             file_path = os.path.join(root, file)
#             investment_house = os.path.basename(root)
#             logger = Logger(logger_name=investment_house)
#             logger.info(msg="Start working on {0} investment house: {1}".format(file_path, investment_house))
#             for sheet_data in process_xl.parse_file(file_path=file_path):
#                 if not sheet_data:
#                     logger.warn("Not get data from sheet")
#                     continue
#
#                 for data in sheet_data:
#                     if not mongo.insert_document(db_name=DB_NAME, collection_name=investment_house, data=data):
#                         print("Failed to insert document to mongodb")
#             logger.info("Done with {0}".format(file))
