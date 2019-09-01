import argparse
from parser import ExcelParser
from logger import Logger
import json


class Handler:

    @staticmethod
    def trigger():
        handler = Handler()
        return handler.process()

    def __init__(self):
        """
        Init the cli handler.
        """
        parser = argparse.ArgumentParser(description='Process some integers.')

        parser.add_argument('path', metavar='path', type=str, help='Path to the file or folder')
        parser.add_argument('--folder', metavar='folder', type=int,
                            help='Determine if the given path is a folder or not')

        args = parser.parse_args()
        logger = Logger("cli")

        self.path, self.folder = args.path, args.folder
        self.parser = ExcelParser(logger=logger)

    def process(self):
        """
        Main logic of the cli handler.
        """
        # First, we need to check if it's a folder of a path to to the file.
        if self.folder:
            results = []

            self.recursive_handler()
            return results

        return self.handle_file(self.path)

    def recursive_handler(self):
        # Open folder.
        # Go over sub folders.
        # Collect files in sub folders.
        # Process them.
        pass

    def handle_file(self, file):
        """
        Processing a single file.

        :param file: The path to the file.

        :return: A processed file object.
        """
        #todo: change the output of the file.
        return self.parser.parse(file)


print(json.dumps(Handler.trigger()))
