from flask import Flask
from parser_report import ExcelParser
from loggers.logger import Logger
import os
from flask import jsonify

app = Flask(__name__)


@app.route('/')
def hello_world():
    parser = ExcelParser(logger=Logger)
    parsed = parser.parse_file(file_path=os.path.join(os.getcwd(), "assets", "513026484_gs.xlsx"))
    return jsonify({'results': parsed})


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
