import pymongo
import config
from bson.objectid import ObjectId


class Mongo:

    def __init__(self):
        self.client = pymongo.MongoClient(f"mongodb://{config.MONGO_SERVER_ADDRESS}:{config.MONGO_SERVER_PORT}/")
        self.db = self.client["open_pension_processors"]

    def insert(self, item):
        return self.db['results'].insert_one(item)

    def load(self, _id):
        return self.db['results'].find_one({"_id": ObjectId(_id)})
