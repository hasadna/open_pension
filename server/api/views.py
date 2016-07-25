from rest_framework import viewsets
from pension.models import Issuer
from api.serializers import IssuerSerializer


class IssuerViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Issuer.objects.all()
    serializer_class = IssuerSerializer
