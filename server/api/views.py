from rest_framework import viewsets
from pension.models import ManagingBody, InvestmentHome
from .serializers import ManagingBodySerializer, InvestmentHomeSerializer
import random


class ManagingBodyViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = ManagingBody.objects.all()
    serializer_class = ManagingBodySerializer


class InvestmentHomeViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = InvestmentHome.objects.all()
    serializer_class = InvestmentHomeSerializer


class InvestmentHomeViewRandomSet(viewsets.ReadOnlyModelViewSet):
    list_index = []
    for i in range(5):
        list_index.append(random.randint(0, 3))
    queryset = InvestmentHome.objects.filter(pk__in=[1,2,3])
    serializer_class = InvestmentHomeSerializer

