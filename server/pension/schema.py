from .models import Example
from graphene import AbstractType, Node
from graphene_django.filter import DjangoFilterConnectionField
from graphene_django.types import DjangoObjectType


class ExampleNode(DjangoObjectType):

    class Meta:
        model = Example
        interfaces = (Node, )
        filter_fields = ['title', 'number', 'body']
        filter_order_by = ['title']


class Query(AbstractType):
    recipe = Node.Field(ExampleNode)
    all_recipes = DjangoFilterConnectionField(ExampleNode)
