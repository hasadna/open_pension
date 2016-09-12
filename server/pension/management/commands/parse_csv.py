import os
import csv
import string
import re
from django.core.management import BaseCommand, CommandError


class Command(BaseCommand):

    fields = {
        "שם המנפיק/שם נייר ערך": 'managing_body',
        'מספר ניע': 'fund',
        "זירת מסחר": 'market_place',
        "ספק מידע": 'information_provider',
        "מספר מנפיק": 'issuer',
        "ענף מסחר": 'commercial_sectors',
        "דירוג": 'ranking',
        "שם מדרג": 'there_hierarchy',
        "תאריך רכישה": 'purchase_date',
        'מחמ': 'average_life_spend',
        "סוג מטבע": 'currency_type',
        "שיעור ריבית": 'interest_rate',
        "תשואה לפידיון": 'yield_to_maturity',
        "ערך נקוב": 'denominated_value',
        "שער": 'gate',
        "שווי שוק": 'market_value',
        "שעור מערך נקוב מונפק": 'issued_par_rate',
        "שעור מנכסי אפיק ההשקעה": 'rate_assets',
        "שעור מסך נכסי השקעה": 'total_assets _investment',
        "קונסורציום כן/לא": 'consortium',
        "שיעור ריבית ממוצע": 'average_interest_rate',
        "שווי הוגן": 'fair_value',
        "תנאי ושיעור ריבית": 'terms_and_interest ',
        "ריבית אפקטיבית": 'effective_interest',
        "עלות מתואמת": 'adjusted_cost',
        "שעור מנכסי השקעה": 'rate_of_investment_assets',
        "נכס הבסיס": 'the _underlying',
        "ספק המידע": 'information_provider',
        "סכום ההתחייבות": 'amount_of_liability',
        "תאריך סיום ההתחייבות": 'date_commitment',
        "שעור תשואה במהלך התקופה": 'rate_of_return_during_period',
        "תאריך שערוך אחרון": 'last_revaluation_Date',
        "אופי הנכס": 'type_of_property',
        "שווי משוערך": 'revalued',
        "מספר הנייר": 'several_paper',
        "שם המדרג": 'rating_given',
        "שעור הריבית": 'interest_rate',
        "תשואה לפדיון": 'yield_to_maturity',
    }

    def add_arguments(self, parser):
        parser.add_argument('--path', type=str)

    def handle(self, *args, **options):
        path = options['path']
        for file in os.listdir(options['path']):
            self.normalize(path + "/" + file)
            # todo: remove.
            break

    """
    Normalize the file content.

    :param path:
        The path of the file.

    :return:
        The human readable, relatively, CSV file.
    """
    def normalize(self, path):
        metadata = {'number': '', 'date': ''}
        csv_file = open(path, 'r').read()
        rows = csv_file.split("\n")
        for i, value in enumerate(rows):
            if i == 0:
                metadata['date'] = self.get_kupa_date(value)
            elif i == 3:
                metadata['number'] = self.get_kupa_number(value)
            elif i == 7:
                fields = self.get_fields(value)
            elif i >= 11:
                print(value)


        content = self.get_content(csv_file, fields)

    """
    Get the kupa number from the first row.

    :param row:
        The first row.

    :return:
        The kupa date
    """
    def get_kupa_date(self, row):
        for element in row.split(','):
            if re.compile("[0-9]*/[0-9]*/[0-9]*").match(element):
                # Found the date. No need to extra iteration.
                return element

    """
    Get the date of the kupa.

    :param row:
        The content of the file

    :return:
        The kupa number
    """
    def get_kupa_number(self, row):
        for element in row.split(','):
            if element.isdigit():
                # Found the kupa number. No need for extra iteration.
                return element

    """
    Get the fields from the csv file.

    :param row:
        The content of the file

    :return:
        The metadata of the file
    """
    def get_fields(self, row):
        fields = row.split(",")

        new_fields = []
        for field in fields:
            if field.strip() == '':
                # An empty fields cannot be added as a field in the CSV header.
                continue

            new_fields.append(self.fields[field.strip().replace('"', '')])

        return new_fields

    """
    Get the content of the fields.

    :param content:
        The content of the CSV.

    :param fields:
        The fields of the file. The fields are passed in order to add fields
        which will be added by the row context(in israel, not in israel etc.
        etc.)
    """
    def get_content(self, content, fields):
        fields = content.split("\n")

        return ''
