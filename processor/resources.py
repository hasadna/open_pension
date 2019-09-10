from flask import request
from flask_restful import Resource
from flask_json import json_response
from flask_restful import reqparse
import werkzeug


class UploadFile(Resource):

    def post(self):
        """
        Uploading a file to the system for processing.
        """
        parser = reqparse.RequestParser()
        parser.add_argument(
            'file',
            type=werkzeug.datastructures.FileStorage,
            help='File to store and process later on',
            location='files'
        )

        args = parser.parse_args()
        print(args)

        return json_response(data={'message': 'Uploading files'})


class ProcessFile(Resource):

    def post(self):
        """
        Start to process file.
        """
        return json_response(data={'message': 'processing files'})
