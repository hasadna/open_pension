import os
from django.core.management import BaseCommand, CommandError
from django.utils import translation
from pension.models import Quarter, ManagingBody, Fund, Instrument, Holding, InstrumentType, FundManagingBody, Issuer
import csv
from config.settings import DATA_ROOT


def get_instrument_type_value(instrument_type_name):
    """
    Searching an instrument type within the choices of InstrumentType.

    :param instrument_type_name:
        A string represents the instrument type.

    :return:
        Returns the value of instrument_type_name if exists.
    """
    for value, label in InstrumentType.choices:
        if label == instrument_type_name:
            return value

    raise CommandError('Instrument type "{}" not found'.format(instrument_type_name))


class Command(BaseCommand):
    def handle(self, *args, **options):
        # Activating Hebrew language since the instrument type in the csv is in hebrew.
        translation.activate('he')

        csv_filename = os.path.join(DATA_ROOT, "dummy_data.csv")
        if not os.path.isfile(csv_filename):
            raise CommandError("File does not exist at the specified path.")

        print("Importing CSV")
        csv_file = open(csv_filename)
        reader = csv.DictReader(csv_file)

        for row in reader:
            managing_body = ManagingBody.objects.get_or_create(label=row.get('managing_body'))
            quarter = Quarter.objects.get_or_create(year=row.get('report_year'), quarter=row.get('report_quarter'))
            issuer = Issuer.objects.get_or_create(label=row.get('issuer'))
            fund = Fund.objects.get_or_create(label=row.get('fund_name'))
            fund_managing_body = FundManagingBody.objects.get_or_create(
                fund=fund[0],
                managing_body=managing_body[0],
                start=quarter[0]
            )

            instrument = Instrument.objects.get_or_create(
                instrument_type=get_instrument_type_value(row.get('instrument_type')),
                label=row.get('instrument_name'),
                instrument_id=row.get('instrument_id'),
                issuer=issuer[0]
            )

            Holding.objects.get_or_create(
                instrument=instrument[0],
                fund=fund_managing_body[0],
                quarter=quarter[0],
                fair_value=row.get('fair_value')
            )

        print("Import completed successfully.")
