from django.db.models import Sum, F
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.views import APIView

from pension.serializers import QuartersSerializer, InstrumentsSerializer, InstrumentFieldsSerializer
from pension.models import Quarter, Instrument, InstrumentFields


class QuarterViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API endpoint to expose all pension quarter.
    """
    queryset = Quarter.objects.all()
    serializer_class = QuartersSerializer
    pagination_class = None
    lookup_field = 'quarter_id'

    def filter_queryset(self, queryset):
        queryset = super(QuarterViewSet, self).filter_queryset(queryset)
        return queryset.order_by('month').order_by('year')


class InstrumentViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API endpoint to expose all pension instrument.
    """
    queryset = Instrument.objects.all()
    serializer_class = InstrumentsSerializer
    pagination_class = None
    lookup_field = 'instrument_id'


class InstrumentFieldsViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API endpoint to expose all pension instrument fields.
    """
    queryset = InstrumentFields.objects.all()
    serializer_class = InstrumentFieldsSerializer
    pagination_class = None


class GetPaiDataByFilters(APIView):
    """
    A custom endpoint for GET Trend Game request.
    """
    def get(self, request, format=None):
        queryset1 = Instrument.objects.values('currency').annotate(Sum('market_cap'))
        queryset2 = Instrument.objects.values('activity_industry').annotate(Sum('market_cap'))

        base = Instrument.objects.all().aggregate(Sum('market_cap'))
        pai = {
            'name': 'base',
            'children': [],
        }

        first_filter_name = self.request.query_params.get('one', None)
        print('first_filter_name', first_filter_name)
        second_filter_name = self.request.query_params.get('two', None)
        print('second_filter_name', second_filter_name)

        for filter in queryset1:
            print('filter', filter[first_filter_name])
            # .extra(select={'renamed_value': 'cryptic_value_name'}).values('renamed_value')
            queryset = Instrument.objects.filter(**{first_filter_name: filter[first_filter_name]}) \
                                                .values(second_filter_name).annotate(Sum('market_cap')) \
                                                .annotate(name=F(second_filter_name)) \
                                                .annotate(size=F('market_cap__sum')) \
                                                .values('name', 'size')
            # queryset = Instrument.objects.filter(**{first_filter_name: filter[first_filter_name]}) \
                                                    # .values(second_filter_name).annotate(Sum('market_cap'))
            print('queryset', queryset)
            pai['children'].append({
                'name': filter[first_filter_name],
                'children': queryset,
            })


        return Response(pai)
