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
        # Get the base market cap.
        base = Instrument.objects.all().aggregate(Sum('market_cap'))
        pai = {
            'name': 'base',
            'children': [],
        }

        # Get all filters queries.
        first_filter_name = self.request.query_params.get('one', None)
        second_filter_name = self.request.query_params.get('two', None)
        three_filter_name = self.request.query_params.get('three', None)
        four_filter_name = self.request.query_params.get('four', None)

        # If not filter selected.
        if not first_filter_name and not second_filter_name and not three_filter_name and not four_filter_name:
            pai['children'] = {'name': 'all', 'size': base['market_cap__sum']}
            return Response(pai)

        if first_filter_name:
            queryset1 = Instrument.objects.values(str(first_filter_name)).annotate(Sum('market_cap'))

        if second_filter_name:
            queryset2 = Instrument.objects.values(str(second_filter_name)).annotate(Sum('market_cap'))

        if three_filter_name:
            queryset3 = Instrument.objects.values(str(three_filter_name)).annotate(Sum('market_cap'))

        if four_filter_name:
            queryset4 = Instrument.objects.values(str(four_filter_name)).annotate(Sum('market_cap'))


        if first_filter_name and second_filter_name and three_filter_name and four_filter_name:
            new_pai = build_four_layers(pai, first_filter_name, second_filter_name, three_filter_name, four_filter_name)
            return Response(new_pai)
        elif first_filter_name and second_filter_name and three_filter_name:
            new_pai = build_three_layers(pai, first_filter_name, second_filter_name, three_filter_name)
            return Response(new_pai)
        elif first_filter_name and second_filter_name:
            new_pai = build_two_layers(pai, first_filter_name, second_filter_name, queryset1)
            return Response(new_pai)
        elif first_filter_name:
            new_pai = build_one_layer(pai, first_filter_name, queryset1)
            print('new_pai', new_pai)
            return Response(new_pai)


def build_one_layer(pai, filter_one, o_queryset):
    queryset = Instrument.objects.all().values(filter_one) \
                .annotate(Sum('market_cap')) \
                .annotate(name=F(filter_one)) \
                .annotate(size=F('market_cap__sum')) \
                .values('name', 'size')
    pai['children'] = queryset

    return pai


def build_two_layers(pai, filter_one, filter_two, o_queryset):
    for filter in o_queryset:
        queryset = Instrument.objects.filter(**{filter_one: filter[filter_one]}) \
                    .values(filter_two).annotate(Sum('market_cap')) \
                    .annotate(name=F(filter_two)) \
                    .annotate(size=F('market_cap__sum')) \
                    .values('name', 'size')
        pai['children'].append({
            'name': filter[filter_one],
            'children': queryset,
        })

    return pai


def build_three_layers(pai, filter_one, filter_two, filter_three, o_queryset):
    pass


def build_four_layers(pai, filter_one, filter_two, filter_three, filter_four, o_queryset):
    pass
