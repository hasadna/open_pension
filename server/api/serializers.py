from rest_framework import serializers
from pension.models import ManagingBody, InvestmentHome


class ManagingBodySerializer(serializers.ModelSerializer):

    class Meta:
        model = ManagingBody
        fields = ('pk', 'label')


class InvestmentHomeSerializer(serializers.ModelSerializer):

    class Meta:
        model = InvestmentHome
        fields = ('investment_home_id', 'name', 'place', 'investment_firm_size')


