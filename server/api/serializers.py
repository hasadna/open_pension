from rest_framework import serializers
from pension.models import Blog, Tags


class TagsSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Tags
        fields = ('name', )


class BlogSerializer(serializers.HyperlinkedModelSerializer):
    tags = TagsSerializer(many=True, read_only=True)

    class Meta:
        model = Blog
        fields = ('unique_id', 'title', 'author', 'body', 'created_at', 'tags',)
