from rest_framework import viewsets
from pension.models import ManagingBody
from api.serializers import ManagingBodySerializer


class ManagingBodyViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = ManagingBody.objects.all()
    serializer_class = ManagingBodySerializer
