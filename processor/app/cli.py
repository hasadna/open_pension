import argparse
from .exceptions import ExcelWorkbookParsingError
from .parser import ExcelParser
from .logger import Logger
import json
import os


class Handler:

    @staticmethod
    def trigger():
        handler = Handler()
        print(json.dumps(handler.process()))

    def __init__(self):
        """
        Init the cli handler.
        """
        parser = argparse.ArgumentParser(description='Process some integers.')

        parser.add_argument('path', metavar='path', type=str, help='Path to the file or folder')
        parser.add_argument('--folder', metavar='folder', type=int,
                            help='Determine if the given path is a folder or not')
        parser.add_argument('--output_folder', metavar='output_folder', type=str,
                            help='Path to export content of folders')

        args = parser.parse_args()
        self.logger = Logger("cli")

        self.path, self.folder, self.output_to_folder = args.path, args.folder, args.output_folder

    def process(self):
        """
        Main logic of the cli handler.
        """
        # First, we need to check if it's a folder of a path to to the file.
        if self.folder:
            return self.recursive_handler()

        return self.handle_file(self.path)

    def recursive_handler(self):

        paths = []
        self._collect_paths(self.path, paths)

        results = {}

        for file_path in paths:
            try:
                parsed = self.handle_file(file_path)
                file_name = self.get_filename_from_path(file_path)
                if not parsed:
                    results[file_name] = 'Failed'
                    # Nothing to return.
                    continue

                if self.output_to_folder:
                    filename = self.get_filename_from_path(file_path).split('.')[0]

                    self.save_to_json_file(
                        path=self.output_to_folder,
                        file_name=f"{filename}.json",
                        data=parsed
                    )
                    results[file_name] = 'Passed'
                else:
                    results[file_name] = parsed
            except ExcelWorkbookParsingError as e:
                self.logger.error(f"Cannot parse the file {file_path} due to to: {str(e)}")

        return results

    def _collect_paths(self, path, folders):
        """
        Recursive walker over a path and collect all files.

        :param path: The main path.
        :param folders: List of files to append path of files.
        """
        for inner_path in os.listdir(path):
            full_path = os.path.join(path, inner_path)
            if os.path.isfile(full_path):
                folders.append(full_path)
            else:
                self._collect_paths(full_path, folders)

    def handle_file(self, file):
        """
        Processing a single file.

        :param file: The path to the file.

        :return: A processed file object.
        """
        logger = Logger(self.get_filename_from_path(file))
        parser = ExcelParser(logger=logger)
        return parser.parse(file)

    def get_filename_from_path(self, file_path):
        """
        Getting the filename from a file path.

        :param file_path: The file path.

        :return: The file name.
        """
        return file_path.split('/')[-1]

    def save_to_json_file(self, path, file_name, data):
        """
        Saving json to file. Probably.

        :param path: The path of the file.
        :param file_name: The file name.
        :param data: The data to write.
        """
        if not os.path.isdir(path):
            raise Exception(f"folder not exists {path}")

        full_path = os.path.join(path, file_name)

        try:

            with open(full_path, "w") as outfile:
                json.dump(data, outfile)

            return True

        except Exception as ex:
            raise ValueError(f"Failed to write json file {ex}")


Handler.trigger()
