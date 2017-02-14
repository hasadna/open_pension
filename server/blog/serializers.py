from rest_framework import serializers
from blog.models import Post, Tags


class TagsSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Tags
        fields = ('name', )


class PostsSerializer(serializers.HyperlinkedModelSerializer):
    tags = TagsSerializer(many=True, read_only=True)

    class Meta:
        model = Post
        fields = ('unique_id', 'title', 'body', 'author', 'created_at', 'publish', 'tags')
