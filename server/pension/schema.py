from pension.models import Instrument, Quarter
from graphene_django import DjangoObjectType
from graphene_django.filter import DjangoFilterConnectionField
import graphene


class InstrumentNode(DjangoObjectType):
    class Meta:
        model = Instrument
        interfaces = (graphene.Node,)
        filter_fields = [
            'instrument_id', 'issuer_id', 'rating', 'rating_agency', 'currency', 'interest_rate', 'yield_to_maturity',
            'market_cap', 'rate_of_investment_channel', 'rate_of_fund', 'trading_floor', 'date_of_purchase',
            'average_of_duration', 'rate', 'rate_of_ipo', 'informer', 'fair_value', 'activity_industry',
            'date_of_revaluation', 'type_of_asset', 'return_on_equity', 'liabilities', 'expiry_date_of_liabilities',
            'effective_rate', 'coordinated_cost', 'underlying_asset', 'consortium', 'average_rate', 'par_value',
            'managing_body', 'geographical_location', 'instrument_sub_type'
        ]


class QuarterInterface(graphene.Interface):
    quarter_id = graphene.Int()
    year = graphene.String()
    month = graphene.String()


# class QuarterNode(DjangoObjectType):
#     class Meta:
#         model = Quarter
#         # interfaces = (graphene.Node,)
#         interfaces = (QuarterInterface,)
#         filter_fields = ['year', 'month']

class QuarterType(DjangoObjectType):
    class Meta:
        model = Quarter


class Query(graphene.ObjectType):
    instrument = graphene.Node.Field(InstrumentNode)
    all_instruments = DjangoFilterConnectionField(InstrumentNode)

    # quarter = graphene.Node.Field(QuarterNode)
    all_quarters = graphene.List(QuarterType)
    # all_quarters = DjangoFilterConnectionField(QuarterNode)

    @graphene.resolve_only_args
    def resolve_all_quarters(self):
        return Quarter.objects.all()

    @graphene.resolve_only_args
    def resolve_users(self):
        return Instrument.objects.all()
