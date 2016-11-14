from rest_framework import serializers
from pension.models import Blog


class BlogSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Blog
        fields = ('title',)
