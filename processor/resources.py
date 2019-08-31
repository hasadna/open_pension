from flask import request
from flask_restful import Resource
from flask_json import json_response


class UploadFile(Resource):

    def post(self):
        """
        Uploading a file to the system for processing.
        """
        return json_response(data={'message': 'Uploading files'})


class ProcessFile(Resource):

    def post(self):
        """
        Start to process file.
        """
        return json_response(data={'message': 'processing files'})
