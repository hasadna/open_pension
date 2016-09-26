from rest_framework import serializers
from pension.models import Example


class ExampleSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Example
        fields = ('title', 'number',)
