from .app import api, app
from .resources import UploadFile, ProcessFile

api.add_resource(UploadFile, '/upload')
api.add_resource(ProcessFile, '/process/<object_id>')

if __name__ == '__main__':
    # Doesn't run in production.
    app.run(host="0.0.0.0", port=80, debug=True)
