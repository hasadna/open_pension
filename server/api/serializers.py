from rest_framework import serializers
from pension.models import ManagingBody


class ManagingBodySerializerVersion1(serializers.ModelSerializer):

    class Meta:
        model = ManagingBody
        fields = ('pk', 'label')
