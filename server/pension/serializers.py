from rest_framework import serializers
from pension.models import Quarter, Instrument, InstrumentFields


class QuartersSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Quarter
        fields = ('quarter_id', 'year', 'month', )


class InstrumentsSerializer(serializers.HyperlinkedModelSerializer):
    quarter_id = serializers.CharField(source='quarter.quarter_id')
    quarter_year = serializers.CharField(source='quarter.year')
    quarter_month = serializers.CharField(source='quarter.month')
    managing_body_name = serializers.SerializerMethodField()
    geographical_location_name = serializers.SerializerMethodField()
    instrument_sub_type_name = serializers.SerializerMethodField()

    class Meta:
        model = Instrument
        fields = ('instrument_id', 'issuer_id', 'rating', 'rating_agency', 'currency', 'interest_rate',
                  'yield_to_maturity', 'market_cap', 'rate_of_investment_channel', 'rate_of_fund',
                  'trading_floor', 'date_of_purchase', 'average_of_duration', 'rate', 'rate_of_ipo',
                  'informer', 'fair_value', 'activity_industry', 'date_of_revaluation', 'type_of_asset',
                  'return_on_equity', 'liabilities', 'expiry_date_of_liabilities', 'effective_rate',
                  'coordinated_cost', 'underlying_asset', 'consortium', 'average_rate', 'par_value',
                  'managing_body', 'managing_body_name', 'geographical_location', 'geographical_location_name',
                  'instrument_sub_type', 'instrument_sub_type_name', 'quarter_id', 'quarter_year', 'quarter_month', )

    def get_managing_body_name(self, obj):
        return obj.get_managing_body_display()

    def get_geographical_location_name(self, obj):
        return obj.get_geographical_location_display()

    def get_instrument_sub_type_name(self, obj):
        return obj.get_instrument_sub_type_display()


class InstrumentFieldsSerializer(serializers.HyperlinkedModelSerializer):
    fields_to_show_name = serializers.SerializerMethodField()

    class Meta:
        model = InstrumentFields
        fields = ('fields_to_show', 'fields_to_show_name', 'color', )

    def get_fields_to_show_name(self, obj):
        return obj.get_fields_to_show_display()
