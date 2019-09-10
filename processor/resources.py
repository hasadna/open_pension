from flask_restful import Resource
from flask_json import json_response
from flask_restful import reqparse
from werkzeug import secure_filename, datastructures
import os
from datetime import datetime
from mongodb import Mongo
from parser import ExcelParser
from logger import Logger


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
        mongo = Mongo()

        saved_files = {}
        for file in files:
            path = os.path.join(os.getcwd(), 'files', 'uploaded')

            if os.path.exists(os.path.join(path, file.filename)):
                # Set the file filename as a unique file since we already got this one.
                filename, extension = file.filename.split('.')
                file.filename = f'{filename}_{int(datetime.now().timestamp())}.{extension}'

            saved_path = os.path.join(path, file.filename)
            file.save(saved_path)

            # Saving data to the DB.
            mongo_results = mongo.insert({
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

    def get(self, object_id):
        mongo = Mongo()

        process_item = mongo.load(object_id)
        del process_item['_id']
        return json_response(data={'item': process_item})

    def patch(self, object_id):
        """
        Start to process file.
        """
        logger = Logger("cli")
        parser = ExcelParser(logger=logger)
        mongo = Mongo()

        process_item = mongo.load(object_id)
        results = parser.parse(process_item['path'])

        mongo.update(object_id, {"processed": results, "status": "processed"})
        del process_item['_id']
        return json_response(data={'results': results})
