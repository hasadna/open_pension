from flask import Flask
from flask_restful import Resource, Api
from flask_json import FlaskJSON
from logger import Logger
from resources import UploadFile, ProcessFile
from mongodb import Mongo

app = Flask(__name__)
api = Api(app)
json = FlaskJSON(app)

logger = Logger("API")
mongo = Mongo()

api.add_resource(UploadFile, '/upload', resource_class_kwargs={"mongo": mongo})
api.add_resource(ProcessFile, '/process/<object_id>', resource_class_kwargs={"mongo": mongo})

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000, debug=True)
