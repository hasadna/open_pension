from pension.models import CashAndDeposit
from graphene import AbstractType, Node
from graphene_django.filter import DjangoFilterConnectionField
from graphene_django.types import DjangoObjectType


# Graphene will automatically map the Blog model's fields onto the BlogNode.
# This is configured in the CategoryNode's Meta class (as you can see below)
class CashAndDepositNode(DjangoObjectType):

    class Meta:
        model = CashAndDeposit
        interfaces = (Node, )
        filter_fields = ['title']


class Query(AbstractType):
    cash_and_deposit = Node.Field(CashAndDepositNode)
    all_cash_and_deposit = DjangoFilterConnectionField(CashAndDepositNode)
