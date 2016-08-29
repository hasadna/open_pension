import os
import csv
import string
import re
from django.core.management import BaseCommand, CommandError


class Command(BaseCommand):

    fields = {
        "שם המנפיק/שם נייר ערך": 'managing_body',
        'מספר ני""ע': 'fund',
        "זירת מסחר": '',
        "ספק מידע": '',
        "מספר מנפיק": '',
        "ענף מסחר": '',
        "דירוג": '',
        "שם מדרג": '',
        "תאריך רכישה": '',
        'מח""מ': '',
        "סוג מטבע": '',
        "שיעור ריבית": '',
        "תשואה לפידיון": '',
        "ערך נקוב": '',
        "שער": '',
        "שווי שוק": '',
        "שעור מערך נקוב מונפק": '',
        "שעור מנכסי אפיק ההשקעה": '',
        "שעור מסך נכסי השקעה": '',
        "קונסורציום כן/לא": '',
        "שיעור ריבית ממוצע": '',
        "שווי הוגן": '',
        "תנאי ושיעור ריבית": '',
        "ריבית אפקטיבית": '',
        "עלות מתואמת": '',
        "שעור מנכסי השקעה": '',
        "נכס הבסיס": '',
        "ספק המידע": '',
        "סכום ההתחייבות": '',
        "תאריך סיום ההתחייבות": '',
        "שעור תשואה במהלך התקופה": '',
        "תאריך שערוך אחרון": '',
        "אופי הנכס": '',
        "שווי משוערך": '',
        "מספר הנייר": '',
        "שם המדרג": '',
        "שעור הריבית": '',
        "תשואה לפדיון": '',
    }

    def add_arguments(self, parser):
        parser.add_argument('--path', type=str)

    def handle(self, *args, **options):
        path = options['path']
        for file in os.listdir(options['path']):
            self.normalize(path + "/" + file)
            break

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
        fields = self.get_fields(content)
        input(fields.format())

    """
    Get the metadata of the file - Kupa number and date

    :param content:
        The content of the file

    :return:
        The metadata of the file
    """
    def get_meta_data(self, content):
        split = content.split("\n")

        for element in split[3].split(','):
            if element.isdigit():
                number = element
                break

        for element in split[0].split(','):
            if re.compile("[0-9]*/[0-9]*/[0-9]*").match(element):
                date = element
                break

        return {
            'number': number,
            'date': date,
        }

    """
    Get the fields from the csv file

    :param content:
        The content of the file

    :return:
        The metadata of the file
    """
    def get_fields(self, content):
        split = content.split("\n")
        return split[7]

