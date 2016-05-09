
from django.core.management import BaseCommand
from pension.models import Quarter, ManagingBody, Fund, Instrument, Holding
import csv, codecs

class Command(BaseCommand):
    def handle(self, *args, **options):
        print("Hello Command")
        csv_filename="C:/Users/user/Documents/PycharmProjects/open-pension/dummy_data.csv"

        # TODO Handle Hebrew Characters
        print("opening csv file")
        data_reader = csv.reader(open(csv_filename, 'r', encoding='utf-8'), delimiter=',', quotechar='"')
        print("opened csv file")

        for row in data_reader:
            if str(row[0]).find('managing_body') == -1:

                # mbody = ManagingBody.objects.get(pk=row[0])
                if not(ManagingBody.objects.filter(label=row[0]).exists()):
                    print("saving Managing Body")
                    managing_body = ManagingBody(label=row[0])
                    managing_body.save()
                else:
                    managing_body = ManagingBody.objects.filter(label=row[0])[0]

                if not(Fund.objects.filter(label=row[1]).exists()):
                    print("saving Fund")
                    fund = Fund(label=row[1], managing_body=managing_body)
                    fund.save()
                else:
                    fund = Fund.objects.filter(label=row[1])[0]

                if not(Quarter.objects.filter(year=row[3], quarter=row[4]).exists()):
                    print("saving quarter")
                    quarter = Quarter(year=row[3], quarter=row[4])
                    quarter.save()
                else:
                    quarter = Quarter.objects.filter(year=row[3], quarter=row[4])[0]

                if not(Instrument.objects.filter(instrument_id=row[7]).exists()):
                    print("saving instrument")
                    # TODO Get Choice and translate to int
                    instrument = Instrument(instrument_type=row[5], label=row[9], instrument_id=row[7])
                    instrument.save()
                else:
                    instrument = Instrument.objects.filter(instrument_id=row[7])[0]

                if not(Holding.objects.filter(instrument=instrument, fund=fund, quarter=quarter, fair_value=row[13])):
                    print("saving holding")
                    holding = Holding(instrument=instrument, fund=fund, quarter=quarter, fair_value=row[13])
                    holding.save()