from .app import mongo
from bson.objectid import ObjectId


class Mongo:

    def __init__(self):
        self.client = mongo
        self.db = self.client.db

    def set_client(self, address):
        """
        Setting the client address to to something else.

        :param address: The address of the client.
        """
        # self.client = pymongo.MongoClient(address)
        # self.db = self.client["open_pension_processors"]

    def insert(self, item):
        """
        Inserting a single item.

        :param item: The item to insert.

        :return: The result of the insert.
        """
        return self.db.results.insert_one(item)

    def insert_multiple(self, items):
        """
        Insert multiple items.

        :param items: The to insert.

        :return: The results of the insert.
        """
        return self.db.results.insert_many(items, bypass_document_validation=False)

    def load(self, object_id):
        """
        Loading a single object.

        :param object_id: The object ID to retrieve.

        :return: An object from the DB.
        """
        return self.db.results.find_one({"_id": ObjectId(object_id)})

    def update(self, object_id, values):
        """
        Updating a single object.

        :param object_id: The object ID.
        :param values: The values to update.

        :return: Results of the update.
        """
        return self.db.results.update_one({"_id": ObjectId(object_id)}, {"$set": values})

    def delete_all(self, condition={}):
        """
        Delete items. If none given then all the records will be removed.

        :param condition: The condition which the records need to match.

        :return: Results of the delete.
        """
        return self.db.results.delete_many(condition)

    def close(self):
        self.client.close()
