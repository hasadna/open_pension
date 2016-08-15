import csv
import os

from config.settings import DATA_ROOT
from django.utils import translation
from django.core.management import BaseCommand, CommandError


class Command(BaseCommand):
    def handle(self, *args, **options):
        # Activating Hebrew language since the instrument type in the csv is in
        # hebrew.
        translation.activate('he')

        csv_filename = os.path.join(DATA_ROOT, "dummy_data.csv")
        if not os.path.isfile(csv_filename):
            raise CommandError("File does not exist at the specified path.")

        print("Importing CSV")
        csv_file = open(csv_filename)
        reader = csv.DictReader(csv_file)

        for row in reader:
            print(row)
            break

