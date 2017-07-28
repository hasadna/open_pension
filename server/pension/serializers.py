from rest_framework import serializers
from pension.models import Quarter, Instrument


class QuartersSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Quarter
        fields = ('quarter_id', 'year', 'month')


class InstrumentsSerializer(serializers.HyperlinkedModelSerializer):
    quarter_id = serializers.CharField(source='quarter.quarter_id')
    quarter_year = serializers.CharField(source='quarter.year')
    quarter_month = serializers.CharField(source='quarter.month')

    class Meta:
        model = Instrument
        fields = ('instrument_id', 'issuer_id', 'rating', 'rating_agency', 'currency', 'interest_rate',
                  'yield_to_maturity', 'market_cap', 'rate_of_investment_channel', 'rate_of_fund',
                  'trading_floor', 'date_of_purchase', 'average_of_duration', 'rate', 'rate_of_ipo',
                  'informer', 'fair_value', 'activity_industry', 'date_of_revaluation', 'type_of_asset',
                  'return_on_equity', 'liabilities', 'expiry_date_of_liabilities', 'effective_rate',
                  'coordinated_cost', 'underlying_asset', 'consortium', 'average_rate', 'par_value',
                  'managing_body', 'geographical_location', 'instrument_sub_type', 'quarter_id',
                  'quarter_year', 'quarter_month')
