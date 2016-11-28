from .models import Blog
from graphene_django import DjangoObjectType
import graphene


class Blog(DjangoObjectType):
    class Meta:
        model = Blog

class Query(graphene.ObjectType):
    blogs = graphene.List(Blog)

    @graphene.resolve_only_args
    def resolve_blogs(self):
        return Blog.objects.all()

schema = graphene.Schema(query=Query)
