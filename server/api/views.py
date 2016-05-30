from rest_framework import viewsets
from pension.models import ManagingBody, Fund, FundManagingBody, Instrument, Holding, Quarter
from api.serializers import ManagingBodySerializer, FundSerializer, InstrumentSerializer, \
    HoldingSerializer, QuarterSerializer, ManagingBodyDataSerializer, FundManagingBodySerializer
from django.db.models import Sum
from decimal import *
import datetime as dt
import math


class ManagingBodyViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = ManagingBody.objects.all()
    serializer_class = ManagingBodySerializer


class FundViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Fund.objects.all()
    serializer_class = FundSerializer


class FundManagingBodyViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = FundManagingBody.objects.all()
    serializer_class = FundManagingBodySerializer


class InstrumentViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Instrument.objects.all()
    serializer_class = InstrumentSerializer


class HoldingViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Holding.objects.all()
    serializer_class = HoldingSerializer


class QuarterViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Quarter.objects.all()
    serializer_class = QuarterSerializer


class ManagingBodyDataViewSet(viewsets.ReadOnlyModelViewSet):

    def get_holding_sum(self, managing_body, quarter):
        fair_value_sum = Decimal(0)

        funds = FundManagingBody.objects.filter(managing_body=managing_body)
        for fund in funds:
            fair_val = Holding.objects.filter(fund=fund, quarter=quarter).aggregate(Sum('fair_value')).get('fair_value__sum')
            if fair_val != None:
                fair_value_sum = fair_value_sum + fair_val

        return fair_value_sum


    def get_quarter(self):
        date_time = dt.date.today()
        year = date_time.year
        q = math.ceil(date_time.month/3.)
        print(q)
        quarters = None
        quarters = Quarter.objects.filter(year=year, quarter=q)
        while len(quarters) == 0:
            if q == 1:
                q = 4
                year = year - 1
            else:
                q = q - 1
            quarters = Quarter.objects.filter(year=year, quarter=q)

        return quarters[0]



    def get_queryset(self):
        quarter = self.get_quarter()

        fair_value_total = Holding.objects.filter(quarter=quarter).aggregate(Sum('fair_value')).get('fair_value__sum')

        mb = ManagingBody.objects.all()
        managing_body_data_set = list()
        for managing_body in mb:
            fair_value_sum = self.get_holding_sum(managing_body, quarter)
            relative_value = Decimal(100.0) * fair_value_sum/fair_value_total
            managing_body_data = {'managing_body': managing_body.label, 'fair_value' : fair_value_sum, 'relative_value': relative_value}
            print(managing_body_data)
            managing_body_data_set.append(managing_body_data)

        return managing_body_data_set

    serializer_class = ManagingBodyDataSerializer