from pension.models import Instrument
from graphene import AbstractType, Node
from graphene_django.filter import DjangoFilterConnectionField
from graphene_django.types import DjangoObjectType


# Graphene will automatically map the Blog model's fields onto the BlogNode.
# This is configured in the CategoryNode's Meta class (as you can see below)
class InstrumentNode(DjangoObjectType):

    class Meta:
        model = Instrument
        interfaces = (Node, )
        filter_fields = ['instrument_id', 'issuer_id']


class Query(AbstractType):
    instrument = Node.Field(InstrumentNode)
    all_instrument = DjangoFilterConnectionField(InstrumentNode)
