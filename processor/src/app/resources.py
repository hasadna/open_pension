from flask_restful import Resource
from flask_json import json_response
from flask_restful import reqparse
from werkzeug import secure_filename, datastructures
import os
from datetime import datetime
from .parser import ExcelParser
from .logger import Logger
from .mongodb import Mongo


class UploadFile(Resource):

    def __init__(self):
        self._mongo = Mongo()

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
            path = os.path.join(os.getcwd(), 'app', 'files', 'uploaded')

            if os.path.exists(os.path.join(path, file.filename)):
                # Set the file filename as a unique file since we already got this one.
                filename, extension = file.filename.split('.')
                file.filename = f'{filename}_{int(datetime.now().timestamp())}.{extension}'

            saved_path = os.path.join(path, file.filename)
            file.save(saved_path)

            # Saving data to the DB.
            mongo_results = self._mongo.insert({
                'path': saved_path,
                'status': 'new',
            })

            # Appending data to info array.
            saved_files[file.filename] = {
                'path': saved_path,
                'id': str(mongo_results.inserted_id),
            }

        return json_response(
            status_=201,
            data={
                'message': 'All the files were uploaded successfully',
                'files': saved_files,
            }
        )


class ProcessFile(Resource):

    def __init__(self):
        self._mongo = Mongo()

    def get(self, object_id):
        process_item = self._mongo.load(object_id)
        del process_item['_id']
        return json_response(data={'item': process_item})

    def patch(self, object_id):
        """
        Start to process file.
        """
        logger = Logger("cli")
        parser = ExcelParser(logger=logger)

        process_item = self._mongo.load(object_id)
        results = parser.parse(process_item['path'])

        if logger.errored:
            status = 'processed with errors'
        else:
            status = 'processed'

        self._mongo.update(object_id, {"processed": results, "status": status})

        # Remove the path and the id. We don't need to expose them.
        del process_item['_id']
        del process_item['path']

        return json_response(data={'results': results})
