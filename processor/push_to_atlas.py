from mongodb import Mongo
import os
import json


mongo = Mongo()
mongo.set_client("mongodb+srv://admin:sam@processedfiles-aupgc.mongodb.net/test?retryWrites=true&w=majority")

print("Remove all records form the DB")
mongo.delete_all()

print("Start to collect the records")
items = []
directory = os.path.join(os.getcwd(), "fdb-output")

for filename in os.listdir(directory):
    if filename.endswith(".json"):
        with open(os.path.join(directory, filename)) as file:
            items.append(json.load(file))
            break

print(items)
print("Push to mongo")
mongo.insert_multiple(items)
