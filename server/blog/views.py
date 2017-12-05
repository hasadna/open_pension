from rest_framework import viewsets

from blog.models import Post
from blog.serializers import PostsSerializer


class PostViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API endpoint to expose all blog posts.
    """
    queryset = Post.objects.all()
    serializer_class = PostsSerializer
    lookup_field = 'unique_id'
