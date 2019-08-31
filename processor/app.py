from flask import Flask
from flask_restful import Resource, Api
from flask_json import FlaskJSON
from logger import Logger
from resources import UploadFile, ProcessFile

app = Flask(__name__)
api = Api(app)
json = FlaskJSON(app)


if __name__ == '__main__':
    logger = Logger("API")

    api.add_resource(UploadFile, '/upload')
    api.add_resource(ProcessFile, '/process')

    app.run(host="0.0.0.0", port=5000, debug=False)
