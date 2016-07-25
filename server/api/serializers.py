from rest_framework import serializers
from pension.models import Issuer


class IssuerSerializer(serializers.ModelSerializer):

    class Meta:
        model = Issuer
        fields = ('pk', 'label')
