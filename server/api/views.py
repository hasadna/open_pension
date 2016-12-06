from rest_framework import viewsets
from api.serializers import ExampleSerializer

from pension.models import Example


class ExampleViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API endpoint for Example.
    """
    queryset = Example.objects.all()
    serializer_class = ExampleSerializer
