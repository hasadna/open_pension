from rest_framework import viewsets
from rest_framework.views import APIView
from api.serializers import BlogSerializer

from pension.models import Blog


class BlogViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API endpoint for Example.
    """
    queryset = Blog.objects.all()
    serializer_class = BlogSerializer


# class TestGrpahQL(APIView):
#     pass
#     # query = '''
#     #     query {
#     #       users {
#     #         name,
#     #         lastName
#     #       }
#     #     }
#     # '''
#     # result = schema.execute(query)
