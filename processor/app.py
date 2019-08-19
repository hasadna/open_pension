from flask import Flask
from flask_restful import Resource, Api
from flask_json import FlaskJSON, JsonError, json_response, as_json
from logger import Logger

import mongo_adapter
import config
from resources import QuarterReport, InvestmentHouseList, Reports

app = Flask(__name__)
api = Api(app)
json = FlaskJSON(app)


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
