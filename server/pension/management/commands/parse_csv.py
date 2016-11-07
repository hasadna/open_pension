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
        "בישראל": "in_israel",
        "צמודות מדד": "cpi",
        "לא צמודות": "no_cpi",
        "צמודות למטח": "foreign_coin_related",
        "אחר": "other",
        "בחול": "not_in_israel",
        "חברות ישראליות בחול": "israel_company_out_state",
        "חברות זרות בחול": "foreign_company_out_state"
    }

    global_contexts = {
        "in_israel",
        "not_in_israel"
    }

    def add_arguments(self, parser):
        parser.add_argument('--path', type=str)

    def handle(self, *args, **options):
        path = options['path']
        for file in os.listdir(options['path']):
            print(self.normalize(path + "/" + file))
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
        contexts = []
        fields = []
        local_context = ''
        global_context = ''
        body = []

        for i, value in enumerate(rows):
            if i == 0:
                metadata['date'] = self.get_kupa_date(value)
            elif i == 3:
                metadata['number'] = self.get_kupa_number(value)
            elif i == 7:
                fields = self.get_fields(value)
            elif i >= 11:
                row_context = self.is_context(value, contexts)
                if row_context:
                    """ Get the current context """
                    local_context = self.english_text(row_context)

                    """ Check if the current context is a global context or. """
                    if self.is_global_context(local_context):
                        global_context = local_context
                else:
                    """ Remove the extra comma from the end. """
                    value = value[:-1]
                    value += global_context + "," + local_context

                    """ Remove the comma at the beginning. """
                    body.append(value[1:])
        fields.append('global_context')
        fields.append('local_context')
        return ','.join(fields) + "\n" + "\n".join(body)

    """
    Get the kupa number from the first row.

    :param row:
        The first row.

    :return:
        The kupa date.
    """
    def get_kupa_date(self, row):
        for element in row.split(','):
            if re.compile("[0-9]*/[0-9]*/[0-9]*").match(element):
                # Found the date. No need to extra iteration.
                return element

    """
    Get the date of the kupa.

    :param row:
        The content of the file.

    :return:
        The kupa number.
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

            new_fields.append(self.english_text(field))

        return new_fields

    """
    Get the english field representation of the hebrew.

    :param field:
        The hebrew field.

    :return:
        The english field for the hebrew term.
    """
    def english_text(self, field):
        return self.fields[field.strip().replace('"', '')]

    """
    Check if the current line is a line context.

    :return:
        The text context of boolean when not found.
    """
    def is_context(self, row, contexts):
        if re.compile(',(.+),,,,,,,,,,,,,,,,,,,,').match(row):
            field = row.replace(",", '').replace('"', '')
            # Don't return this field. Yet.
            if field != "בעל ענין/צד קשור *":
                return field
        else:
            return False

    """
    Check if the given context is a global context

    : param context:
        The name of the context

    :return:
        The text context of boolean when not found.
    """
    def is_global_context(self, context):
        return context in self.global_contexts
