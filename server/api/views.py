from rest_framework import viewsets
from api.serializers import BlogSerializer

from pension.models import Blog


class BlogViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API endpoint for Example.
    """
    queryset = Blog.objects.all()
    serializer_class = BlogSerializer
