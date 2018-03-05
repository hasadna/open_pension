from rest_framework import serializers

from pension.models import Fund, Quarter, FilterFields


class QuartersSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Quarter
        fields = ('quarter_id', 'year', 'month', )


class InstrumentsSerializer(serializers.HyperlinkedModelSerializer):
    quarter_id = serializers.CharField(source='quarter.quarter_id')
    quarter_year = serializers.CharField(source='quarter.year')
    quarter_month = serializers.CharField(source='quarter.month')
    managing_body_name = serializers.SerializerMethodField()
    instrument_sub_type_name = serializers.SerializerMethodField()

    class Meta:
        model = Fund
        fields = ('managing_body_name', 'fund', 'fund_name', 'quarter_id', 'quarter_year', 'quarter_month',
                  'instrument_type', 'instrument_sub_type_name', 'instrument_id', 'orig_instrument_id', 'issuer',
                  'instrument_name', 'activity_industry', 'currency', 'fair_value', 'market_cap', 'rate_of_fund',
                  'rating_agency', 'reference_index', 'intrest_rate', 'date_of_purchase', 'average_of_duration',
                  'date_of_revaluation', 'rate', 'yield_to_maturity', 'rating', 'par_value', 'underlying_asset',
                  'type_of_asset', 'rate_of_ipo', 'liquidity', 'asset_type', 'row_cleansing_time', 'issuer_number',
                  'owner_option', 'original_issuer_number', 'isin', 'instrument_symbol', 'movil', 'dual_trade',
                  'sector', 'cleansing_action')

    @classmethod
    def get_managing_body_name(cls, obj):
        return obj.get_managing_body_display()

    @classmethod
    def get_instrument_sub_type_name(cls, obj):
        return obj.get_instrument_sub_type_display()


class InstrumentFieldsSerializer(serializers.HyperlinkedModelSerializer):
    fields_to_show_name = serializers.SerializerMethodField()

    class Meta:
        model = FilterFields
        fields = ('fields_to_show', 'fields_to_show_name', 'color', )

    @classmethod
    def get_fields_to_show_name(cls, obj):
        return obj.get_fields_to_show_display()
