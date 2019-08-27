from flask import request
from flask_restful import Resource
from flask_json import json_response


class QuarterReport(Resource):
    def __init__(self, mongo):
        self._mongo = mongo

    def get(self):
        report_databases = []
        for db_name in self._mongo.database_names:
            if str(db_name).startswith("report"):
                report_databases.append(db_name)
        return json_response(data=report_databases)


class InvestmentHouseList(Resource):
    def __init__(self, mongo):
        self._mongo = mongo

    def get(self):
        report = request.args.get('quarter')
        if not report:
            return json_response(status_=400, message="quarter argument missing")
        return json_response(data=self._mongo.get_collection_names(database_name=report))


class Reports(Resource):
    def __init__(self, mongo):
        self._mongo = mongo

    def get(self):
        quarter = request.args.get('quarter')
        if not quarter:
            return json_response(status_=400, message="quarter argument missing")

        investment_house = request.args.get('investment_house')
        if not investment_house:
            return json_response(status_=400, message="investment_house argument missing")

        reports = self._mongo.get_documents(db_name=quarter, collection_name=investment_house)
        return json_response(data=list(reports))


class UploadFile(Resource):
    def __init__(self, mongo):
        self._mongo = mongo

    def post(self):
        """
        Uploading a file to the system for processing.
        """
        return json_response(data={'message': 'Uploading files'})


class ProcessFile(Resource):
    def __init__(self, mongo):
        self._mongo = mongo

    def post(self):
        """
        Start to process file.
        """
        return json_response(data={'message': 'processing files'})
