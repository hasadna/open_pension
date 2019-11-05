import json
import flask_restful
from io import BytesIO
from unittest import TestCase
from bson import BSON
from bson.raw_bson import RawBSONDocument
from flask import Flask
from pymongo.results import InsertOneResult
from resources import UploadFile
from mongodb import Mongo


class DummyMongo(Mongo):

    def __init__(self):
        self.inserted_items = []

    def insert(self, document):
        self.inserted_items.append(document)
        return InsertOneResult(RawBSONDocument(BSON.encode(document)), True)


class TestApp(TestCase):
    def test_upload_file(self):
        dummy_mongo = DummyMongo()

        app = Flask(__name__)
        api = flask_restful.Api(app)
        api.add_resource(UploadFile, '/upload', resource_class_kwargs={"mongo": dummy_mongo})

        app = app.test_client()

        resp = app.post('/upload')
        self.assertEquals(json.loads(resp.data), {'message': {'files': 'File to store and process later on'}})

        data = dict(
            files=(BytesIO(b'my file contents'), "work.xlsx"),
        )

        app.post('/upload', data=data, content_type='multipart/form-data', follow_redirects=True)
        self.assertNotEquals(dummy_mongo.inserted_items, [])
