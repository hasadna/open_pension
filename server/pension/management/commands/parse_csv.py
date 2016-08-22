import os
import csv
import string
import re
from django.core.management import BaseCommand, CommandError


class Command(BaseCommand):

    def add_arguments(self, parser):
        parser.add_argument('--path', type=str)

    def handle(self, *args, **options):
        path = options['path']
        for file in os.listdir(options['path']):
            self.normalize(path + "/" + file)

    """
    Normalize the file content.

    :param path:
        The path of the file.

    :return:
        The human readable, relatively, CSV file.
    """
    def normalize(self, path):
        content = open(path, 'r').read()
        metadata = self.get_meta_data(content)

    """
    Get the metadata of the file - Kupa number and date

    :param content:
        The content of the file

    :return:
        The metadata of the file
    """
    def get_meta_data(self, content):
        split = content.split("\n")

        date = filter(lambda x: re.compile("[0-9]*/[0-9]*/[0-9]*").match(x), split[0].split(','))
        number = filter(lambda x: x.isdigit(), split[3].split(','))

        return {
            'date': list(date)[0],
            'number': list(number)[0]
        }

