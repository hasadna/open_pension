import json
import os


def save_to_json_file(path, file_name, data):
    """
    Saving file to json file.

    :param path:
    :param file_name:
    :param data:
    :return:
    """
    if not os.path.isdir(path):
        raise Exception("folder not exists {0}".format(path))

    full_path = os.path.join(path, file_name)
    try:
        with open(full_path, "w") as outfile:
            json.dump(data, outfile)
        return True

    except Exception as ex:
        raise ValueError("Failed to write json file {0}".format(ex))
