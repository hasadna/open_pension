from flask import Flask, request
from flask_restful import Resource, Api
from flask_json import FlaskJSON, JsonError, json_response, as_json
from logger import Logger
import mongo_adapter
import config

app = Flask(__name__)
api = Api(app)
json = FlaskJSON(app)


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


if __name__ == '__main__':
    logger = Logger("API")
    mongo = mongo_adapter.MongoAdapter(server_address=config.MONGO_SERVER_ADDRESS,
                                       server_port=config.MONGO_SERVER_PORT,
                                       user=config.MONGO_SERVER_USERNAME,
                                       password=config.MONGO_SERVER_PASSWORD,
                                       logger=logger)

    api.add_resource(QuarterReport, '/GetQuarterList', resource_class_kwargs={"mongo": mongo})

    api.add_resource(InvestmentHouseList, '/GetInvestmentHouseList', resource_class_kwargs={"mongo": mongo})

    api.add_resource(Reports, '/GetReports', resource_class_kwargs={"mongo": mongo})

    app.run(host="0.0.0.0", port=5000, debug=False)