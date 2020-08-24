import json
from flask import Flask, request, Response
from http import HTTPStatus

from normalization.main import process_entry, process_instruments_dict

app = Flask(__name__)


@app.route('/api/v1/normalize-json', methods=["POST"])
def normalize_json_api():
    instruments_dict = request.json

    try:
        result = process_instruments_dict(instruments_dict)
        return Response(
            json.dumps(result),
            status=HTTPStatus.OK,
            mimetype="application/json"
        )
    except ValueError as e:
        error = json.dumps({
            "error_message": e.args[0]
        })
        return Response(
            error,
            status=HTTPStatus.BAD_REQUEST
        )


@app.route('/api/v1/normalize-entry', methods=["POST"])
def normalize_instrument():
    entry = request.json
    try:
        result = process_entry(entry)
        return Response(
            json.dumps(result),
            status=HTTPStatus.OK,
            mimetype="application/json"
        )
    except ValueError as e:
        error = json.dumps({
            "error_message": e.args[0]
        })
        return Response(
            error,
            status=HTTPStatus.BAD_REQUEST
        )


@app.route('/is-alive', methods=["GET"])
def ping_server():
    return Response(
        "Server Up",
        status=HTTPStatus.OK
    )



