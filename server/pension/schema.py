from pension.models import Instrument, Quarter
from graphene_django import DjangoObjectType
from graphene_django.filter import DjangoFilterConnectionField
import graphene


class QuarterType(DjangoObjectType):
    class Meta:
        model = Quarter


class InstrumentType(DjangoObjectType):
    class Meta:
        model = Instrument


class Query(graphene.AbstractType):
    quarter = graphene.Field(QuarterType, quarterId=graphene.Int())
    all_quarters = graphene.List(QuarterType)

    instrument = graphene.Field(InstrumentType, instrumentId=graphene.Int())
    all_instruments = graphene.List(InstrumentType)

    def resolve_all_quarters(self, args, context, info):
        return Quarter.objects.all()

    def resolve_quarter(self, args, context, info):
        quarterId = args.get('quarterId')

        if quarterId is not None:
            return Quarter.objects.get(pk=quarterId)

        return None

    def resolve_all_instruments(self, args, context, info):
        return Instrument.objects.all()

    def resolve_instrument(self, args, context, info):
        instrumentId = args.get('instrumentId')

        if instrumentId is not None:
            return Instrument.objects.get(pk=instrumentId)

        return None
