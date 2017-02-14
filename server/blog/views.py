from rest_framework import viewsets

from blog.serializers import PostsSerializer
from blog.models import Post

class PostViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API endpoint to expose all blog posts.
    """
    queryset = Post.objects.all()
    serializer_class = PostsSerializer
    lookup_field = 'unique_id'
