from rest_framework import serializers
from pension.models import ManagingBody


class ManagingBodySerializer(serializers.ModelSerializer):

    class Meta:
        model = ManagingBody
        fields = ('pk', 'label')
