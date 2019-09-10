from flask_restful import Resource
from flask_json import json_response
from flask_restful import reqparse
from werkzeug import secure_filename, datastructures
import os
from datetime import datetime


class UploadFile(Resource):

    def post(self):
        """
        Uploading a file to the system for processing.
        """
        parser = reqparse.RequestParser()
        parser.add_argument(
            'files',
            type=datastructures.FileStorage,
            help='File to store and process later on',
            location='files',
            required=True,
            action='append'
        )

        args = parser.parse_args()
        files = args['files']

        saved_files = {}
        for file in files:
            path = os.path.join(os.getcwd(), 'files', 'uploaded')

            if os.path.exists(os.path.join(path, file.filename)):
                # Set the file filename as a unique file since we already got this one.
                filename, extension = file.filename.split('.')
                file.filename = f'{filename}_{int(datetime.now().timestamp())}.{extension}'

            # todo: save to DB.
            saved_path = os.path.join(path, file.filename)
            file.save(saved_path)

            # Appending data to info array.
            saved_files[file.filename] = {
                'path': saved_path,
                'id': '',
            }

        return json_response(
            status_=201,
            data={
                'message': 'All the files were uploaded successfully',
                'files': saved_files,
            }
        )


class ProcessFile(Resource):

    def post(self):
        """
        Start to process file.
        """
        return json_response(data={'message': 'processing files'})
