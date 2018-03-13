from django.core.management import BaseCommand

from pension.models import FilterFields


class Command(BaseCommand):
    def handle(self, *args, **options):

        print("Started creating Filter Fields.")
        create_filter_fields()
        print("Finish creating Filter Fields.")


def create_filter_fields():
    FilterFields.objects.get_or_create(
        fields_to_show='managing_body',
        fields_to_show_en='managing_body',
        fields_to_show_he='managing_body',
        color='#ffa6bc',
    )
    FilterFields.objects.get_or_create(
        fields_to_show='instrument_type',
        fields_to_show_en='instrument_type',
        fields_to_show_he='instrument_type',
        color='#b0fff6',
    )
    FilterFields.objects.get_or_create(
        fields_to_show='rating_agency',
        fields_to_show_en='rating_agency',
        fields_to_show_he='rating_agency',
        color='#fdffa9',
    )
    FilterFields.objects.get_or_create(
        fields_to_show='currency',
        fields_to_show_en='currency',
        fields_to_show_he='currency',
        color='#ff00f7',
    )
    FilterFields.objects.get_or_create(
        fields_to_show='sector',
        fields_to_show_en='sector',
        fields_to_show_he='sector',
        color='#ff0002',
    )
    FilterFields.objects.get_or_create(
        fields_to_show='liquidity',
        fields_to_show_en='liquidity',
        fields_to_show_he='liquidity',
        color='#fffc00',
    )
    FilterFields.objects.get_or_create(
        fields_to_show='type_of_asset',
        fields_to_show_en='type_of_asset',
        fields_to_show_he='type_of_asset',
        color='#00ff32',
    )
    FilterFields.objects.get_or_create(
        fields_to_show='issuer',
        fields_to_show_en='issuer',
        fields_to_show_he='issuer',
        color='#00fffd',
    )
