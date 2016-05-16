import os
from django.core.management import BaseCommand, CommandError
from pension.models import Quarter, ManagingBody, Fund, Instrument, Holding, InstrumentType
import csv, codecs
from config import settings


class Command(BaseCommand):

    def get_unicode(self, s):
        try:
            return s.encode("utf-8")
        except:
            return s


    def get_choice(self, choice_str):
        i=0
        for i in range(len(InstrumentType.choices)):
            if self.get_unicode(InstrumentType.choices[i][1]) == self.get_unicode(choice_str):
                return InstrumentType.choices[i][0]
            i = i+1


    def handle(self, *args, **options):
        csv_filename=os.path.join(settings.BASE_DIR, "dummy_data.csv")
        if not os.path.isfile(csv_filename) :
            raise CommandError("File does not exist at the specified path.")

        print("Importing CSV")

        data_reader = csv.reader(open(csv_filename, 'r', encoding='utf-8'), delimiter=',', quotechar='"')

        for row in data_reader:
            if str(row[0]).find('managing_body') == -1:
                managing_body = ManagingBody.objects.get_or_create(label=row[0])[0]
                quarter = Quarter.objects.get_or_create(year=row[3], quarter=row[4])[0]
                fund = Fund.objects.get_or_create(label=row[1], managing_body=managing_body)[0]
                instrument_type = self.get_choice(row[5])
                instrument = Instrument.objects.get_or_create(instrument_type=instrument_type, label=row[9], instrument_id=row[7])[0]
                Holding.objects.get_or_create(instrument=instrument, fund=fund, quarter=quarter, fair_value=row[13])

        print("Import completed successfully")


