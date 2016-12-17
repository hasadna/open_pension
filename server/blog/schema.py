from .models import Blog
from graphene import AbstractType, Node
from graphene_django.filter import DjangoFilterConnectionField
from graphene_django.types import DjangoObjectType


# Graphene will automatically map the Blog model's fields onto the BlogNode.
# This is configured in the CategoryNode's Meta class (as you can see below)
class BlogNode(DjangoObjectType):

    class Meta:
        model = Blog
        interfaces = (Node, )
        filter_fields = ['unique_id', 'title', 'created_at']


class Query(AbstractType):
    blog = Node.Field(BlogNode)
    all_blogs = DjangoFilterConnectionField(BlogNode)
