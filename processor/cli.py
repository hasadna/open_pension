import argparse
from exceptions import ExcelWorkbookParsingError
from parser import ExcelParser
from logger import Logger
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

        args = parser.parse_args()
        self.logger = Logger("cli")

        self.path, self.folder = args.path, args.folder
        self.parser = ExcelParser(logger=self.logger)

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

        results = []

        for file_path in paths:
            try:
                parsed = self.handle_file(file_path)

                if not parsed:
                    # Nothing to return.
                    continue

                results.append(parsed)
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
        return self.parser.parse(file)

Handler.trigger()
