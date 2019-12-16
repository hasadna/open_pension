from os import getenv
from flask import Flask
from flask_restful import Resource, Api
from flask_json import FlaskJSON
from flask_pymongo import PyMongo

app = Flask(__name__)
app.config["MONGO_URI"] = getenv('MONGO_URL') + "open_pension_processors"
api = Api(app)
json = FlaskJSON(app)
mongo = PyMongo(app)
