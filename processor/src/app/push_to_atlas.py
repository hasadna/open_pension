from .mongodb import Mongo
import os
import json


mongo = Mongo()
mongo.set_client("mongodb+srv://admin:sam@processedfiles-aupgc.mongodb.net/test?retryWrites=true&w=majority")

print("Remove all records form the DB")
mongo.delete_all()

print("Start to collect the records")
items = []
directory = os.path.join(os.getcwd(), "fdb-output")

files = os.listdir(directory)
i = 1
for filename in files[:10]:
    if filename.endswith(".json"):
        with open(os.path.join(directory, filename)) as file:
            print(f"{i}/{len(files)}: Pushing {filename} to mongo")
            mongo.insert({'results': json.load(file)})
            i = i + 1


print("Done")
mongo.close()
