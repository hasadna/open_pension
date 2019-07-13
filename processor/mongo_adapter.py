from pymongo import MongoClient
from pymongo.errors import ServerSelectionTimeoutError, OperationFailure, InvalidName
from bson.errors import InvalidDocument

class MongoAdapter():
    def __init__(self, logger, server_address, server_port, user=None, password=None):
        self._server_address = server_address
        self._server_port = server_port
        self._user = user
        self._password = password
        self._logger = logger
        self._connect()

    def _connect(self, server_timeout=10):
        if self._user:
            self._mongo_connection = MongoClient(self._server_address, self._server_port,
                                                 username=self._user, password=self._password,
                                                 serverSelectionTimeoutMS=server_timeout)
        else:
            self._mongo_connection = MongoClient(self._server_address, self._server_port,
                                                 serverSelectionTimeoutMS=server_timeout)

    @property
    def is_connection(self):
        """
        :return:
        """
        # The ismaster command is cheap command
        try:
            self._mongo_connection.admin.command('ismaster')
            return True
        except ServerSelectionTimeoutError as ex:
            self._logger.error("Failed to connect MongoDB server {0}".format(ex))
        except OperationFailure as ex:
            self._logger.error("Failed to connect MongoDB server {0}".format(ex))
        except Exception as ex:
            self._logger.error("Failed to connect MongoDB - unexpected error - {0}".format(ex))

    def is_db(self, db_name):
        if db_name in self._mongo_connection.list_database_names():
            return True
        return False

    def is_collection(self, db_name, collection_name):
        if collection_name in self._mongo_connection[db_name].list_collection_names():
            return True
        return False

    def insert_document(self, db_name, collection_name, data):
        if not isinstance(data, dict):
            self._logger.error("data must to be dictionary")
            return None

        try:
            try:
                document_id = self._mongo_connection[db_name][collection_name].insert(doc_or_docs=data,
                                                                                      check_keys=False)
                # document_id = self._mongo_connection[db_name][collection_name].insert_one(document=data)
            except InvalidDocument as ex:
                print(ex)
                # print(data)
            if document_id:
                return document_id

        except ServerSelectionTimeoutError as ex:
            self._logger.error("Failed to connect MongoDB server {0}".format(ex))
            return None
        except OperationFailure as ex:
            self._logger.error("Failed to connect MongoDB server {0}".format(ex))
            return None
        # except Exception as ex:
        #     self._logger.error("Failed to connect MongoDB - unexpected error - {0}".format(ex))
        #     return None

    @property
    def database_names(self):
        return self._mongo_connection.list_database_names()

    def get_collection_names(self, database_name):
        return self._mongo_connection[database_name].collection_names()

    def get_documents(self, db_name, collection_name, filter=None):
        for document in self._mongo_connection[db_name][collection_name].find(filter, {'_id': 0}):
            yield document

# TODO: add logger
class FakeLogger:
    def error(self, msg):
        print("ERROR {0}".format(msg))

    def info(self, msg):
        print("INFO {0}".format(msg))

    def warning(self,msg):
        print("WARNING {0}".format(msg))


if __name__ == '__main__':
    # debug
    logger = FakeLogger()
    mongo = MongoAdapter(server_address="35.233.115.43", server_port=30847, user="openpension", password="eayfqV0PYg7xkmuLE84A", logger=logger)
    for doc in mongo.get_documents(db_name="2018Q1", collection_name="menora"):
        print(doc)
    # print(mongo.is_connection)
    # print(mongo.is_collection(db_name="config",collection_name="bla"))
    # mongo.create_collection(db_name="config", collection_name="dada")