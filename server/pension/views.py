from rest_framework import viewsets

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
