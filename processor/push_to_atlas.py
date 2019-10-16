from mongodb import Mongo

mongo = Mongo()
mongo.set_client("mongodb+srv://admin:sam@processedfiles-aupgc.mongodb.net/test?retryWrites=true&w=majority")

mongo.delete_all()
mongo.insert_multiple([{"item": "one"}, {"item": "second"}])
