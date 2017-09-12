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
    def get(self, request):
        pai = {'name': 'base', 'children': []}

        # Get all filters queries.
        requested_quarter = self.request.query_params.get('quarter', None)
        first_filter_name = self.request.query_params.get('one', None)
        second_filter_name = self.request.query_params.get('two', None)
        three_filter_name = self.request.query_params.get('three', None)
        four_filter_name = self.request.query_params.get('four', None)
        five_filter_name = self.request.query_params.get('five', None)

        # If not filter selected.
        if (not first_filter_name and not second_filter_name and not three_filter_name and
                not four_filter_name and not five_filter_name):
            return Response(pai)

        if requested_quarter:
            requested_quarter = Quarter.objects.filter(quarter_id=requested_quarter)

        if first_filter_name:
            queryset1 = Instrument.objects.filter(quarter=requested_quarter).aggregate(Sum('market_cap'))

        if second_filter_name:
            queryset2 = Instrument.objects.values(str(second_filter_name)).annotate(Sum('market_cap'))

        if three_filter_name:
            queryset3 = Instrument.objects.values(str(three_filter_name)).annotate(Sum('market_cap'))

        if four_filter_name:
            queryset4 = Instrument.objects.values(str(four_filter_name)).annotate(Sum('market_cap'))

        # Build the pai by the number of layers.
        if second_filter_name and three_filter_name and four_filter_name and five_filter_name:
            new_pai = build_five_layers(pai, second_filter_name, three_filter_name, four_filter_name,
                                        five_filter_name, queryset2, queryset3, queryset4, requested_quarter)
            return Response(new_pai)
        elif second_filter_name and three_filter_name and four_filter_name:
            new_pai = build_four_layers(pai, second_filter_name, three_filter_name, four_filter_name,
                                        queryset2, queryset3, requested_quarter)
            return Response(new_pai)
        elif second_filter_name and three_filter_name:
            new_pai = build_three_layers(pai, second_filter_name, three_filter_name, queryset2,
                                         requested_quarter)
            return Response(new_pai)
        elif second_filter_name:
            new_pai = build_two_layer(pai, second_filter_name, requested_quarter)
            return Response(new_pai)
        elif first_filter_name:
            if queryset1['market_cap__sum']:
                pai['children'] = [{'name': 'base', 'size': queryset1['market_cap__sum']}]
            return Response(pai)


def build_two_layer(pai, filter_one, requested_quarter):
    queryset = Instrument.objects.filter(quarter=requested_quarter).values(filter_one) \
                .annotate(Sum('market_cap')) \
                .annotate(name=F(filter_one)) \
                .annotate(size=F('market_cap__sum')) \
                .values('name', 'size')
    pai['children'] = queryset

    return pai


def build_three_layers(pai, filter_one, filter_two, queryset1, requested_quarter):
    for query_filter in queryset1:
        queryset = Instrument.objects.filter(quarter=requested_quarter, **{
                filter_one: query_filter[filter_one],
            }) \
            .values(filter_two).annotate(Sum('market_cap')) \
            .annotate(name=F(filter_two)) \
            .annotate(size=F('market_cap__sum')) \
            .values('name', 'size')
        if queryset:
            pai['children'].append({
                'name': query_filter[filter_one],
                'children': queryset,
            })

    return pai


def build_four_layers(pai, filter_one, filter_two, filter_three, queryset1, queryset2, requested_quarter):
    for outter_filter in queryset1:
        inner_pai = []
        for inner_filter in queryset2:
            queryset = Instrument.objects.filter(quarter=requested_quarter, **{
                            filter_one: outter_filter[filter_one],
                            filter_two: inner_filter[filter_two],
                        }) \
                        .values(filter_three).annotate(Sum('market_cap')) \
                        .annotate(name=F(filter_three)) \
                        .annotate(size=F('market_cap__sum')) \
                        .values('name', 'size')
            if queryset:
                inner_pai.append({
                    'name': inner_filter[filter_two],
                    'children': queryset,
                })
        if inner_pai:
            pai['children'].append({
                'name': outter_filter[filter_one],
                'children': inner_pai,
            })

    return pai


def build_five_layers(pai, filter_one, filter_two, filter_three, filter_four, queryset1,
                      queryset2, queryset3, requested_quarter):
    for outter_filter in queryset1:
        middle_pai = []
        for middle_filter in queryset2:
            inner_pai = []
            for inner_filter in queryset3:
                queryset = Instrument.objects.filter(quarter=requested_quarter, **{
                                filter_one: outter_filter[filter_one],
                                filter_two: middle_filter[filter_two],
                                filter_three: inner_filter[filter_three],
                            }) \
                            .values(filter_four).annotate(Sum('market_cap')) \
                            .annotate(name=F(filter_four)) \
                            .annotate(size=F('market_cap__sum')) \
                            .values('name', 'size')
                if queryset:
                    inner_pai.append({
                        'name': inner_filter[filter_three],
                        'children': queryset,
                    })
            if inner_pai:
                middle_pai.append({
                    'name': middle_filter[filter_two],
                    'children': inner_pai,
                })
        if middle_pai:
            pai['children'].append({
                'name': outter_filter[filter_one],
                'children': middle_pai,
            })

    return pai
