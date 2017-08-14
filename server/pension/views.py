from rest_framework import viewsets

from pension.serializers import QuartersSerializer, InstrumentsSerializer, ManagingBodySerializer
from pension.models import Quarter, Instrument


class QuarterViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API endpoint to expose all pension quarter.
    """
    queryset = Quarter.objects.all()
    serializer_class = QuartersSerializer
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
    lookup_field = 'instrument_id'


class ManagingBodyViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API endpoint to expose managing body.
    """
    queryset = Instrument.objects.all().distinct('managing_body')
    serializer_class = ManagingBodySerializer
