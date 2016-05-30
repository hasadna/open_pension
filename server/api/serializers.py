from rest_framework import serializers
from pension.models import ManagingBody, Fund, FundManagingBody, Instrument, Holding, Quarter


class ManagingBodySerializer(serializers.ModelSerializer):

    class Meta:
        model = ManagingBody
        fields = ('pk', 'label')


class FundSerializer(serializers.ModelSerializer):

    class Meta:
        model = Fund
        fields = ('pk', 'label')


class FundManagingBodySerializer(serializers.ModelSerializer):

    class Meta:
        model = FundManagingBody
        fields = ('pk', 'fund', 'managing_body')


class InstrumentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Instrument
        fields = ('pk', 'instrument_type', 'instrument_id')


class HoldingSerializer(serializers.ModelSerializer):

    class Meta:
        model = Holding
        fields = ('pk', 'instrument', 'fund', 'quarter', 'fair_value')


class QuarterSerializer(serializers.ModelSerializer):

    class Meta:
        model = Quarter
        fields = ('pk', 'year', 'quarter')


class ManagingBodyDataSerializer(serializers.Serializer):
    managing_body = serializers.CharField(max_length=200)
    fair_value = serializers.DecimalField(default=0, decimal_places=2, max_digits=16)
    relative_value = serializers.DecimalField(default=0, decimal_places=4, max_digits=16)
