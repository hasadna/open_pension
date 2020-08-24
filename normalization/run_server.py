import datetime
import os
import sys

import werkzeug.serving
from flask import request
# from gevent import pywsgi
# from geventwebsocket.handler import WebSocketHandler

from normalization.app import app


PORT = int(os.environ.get("PORT", 4200))

print("Running on port:", PORT)


def run_server_pyswgi():
    """
    This supports web sockets for dev server
    :return:
    """
    @werkzeug.serving.run_with_reloader
    def run_server_with_reloader():
        @app.after_request
        def log_calling_endpoint(response):
            # Simulating the same debug logs for requests like in flask
            sys.stderr.write(
                "{remote_addr} - - [{date}] \"{method} {endpoint} {protocol}\" {status} -\n".format(
                    remote_addr=request.remote_addr,
                    date=datetime.datetime.now().strftime("%d/%m/%Y %H:%M:%S"),
                    method=request.method,
                    protocol=request.environ.get('SERVER_PROTOCOL', ''),
                    endpoint=request.full_path.rstrip("?"),
                    status=response.status_code
                )
            )
            return response

        # if os.environ.get("WERKZEUG_RUN_MAIN") == "true":
        #     server = pywsgi.WSGIServer(('', PORT), app, handler_class=WebSocketHandler)
        #     server.serve_forever()


def run_server_flask():
    if app.debug:
        app.run(host='0.0.0.0', port=PORT, debug=app.debug, use_reloader=True, use_debugger=True)
    else:
        app.run(host='0.0.0.0', port=PORT, debug=app.debug)


def main():
    run_server_flask()


if __name__ == "__main__":
    main()