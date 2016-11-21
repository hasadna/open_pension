# from .models import Blog
# from graphene import AbstractType, Node
# from graphene_django.filter import DjangoFilterConnectionField
# from graphene_django.types import DjangoObjectType
#
#
# class BlogNode(DjangoObjectType):
#
#     class Meta:
#         model = Blog
#         interfaces = (Node, )
#         filter_fields = ['unique_id', 'title', 'body', 'author', 'created_at', 'publish']
#         filter_order_by = ['unique_id']
#
#
# class Query(AbstractType):
#     blog = Node.Field(BlogNode)
#     all_blogs = DjangoFilterConnectionField(BlogNode)

import graphene

from .models import Blog

class BlogType(graphene.ObjectType):
    unique_id = graphene.String()
    title = graphene.String(description='The title of the blog')
    body = graphene.String(description='The body of the blog')
    author = graphene.String(description='The author of the blog')
    created_at = graphene.String(description='The date the post created')
    publish = graphene.String(description='The post is published or not')
    # products = graphene.List(ProductType, description='A list of this category's products')

    # def resolve_blogs(self, args, info):
    #     return self.products.all()
    #
    # def resolve_blog_count(self, args, info):
    #     return self.products.all().count()


class QueryType(graphene.ObjectType):
    all_categories = graphene.List(BlogType, description='Returns all blog posts')
    Category = graphene.Field(
        BlogType,
        id=graphene.ID(),
        description='Just one category belonging to an ID',
    )

    def resolve_all_blogs(self, args, info):
        return Blog.objects.all()

    def resolve_blogs(self, args, info):
        id = args.get('id')
        return Blog.objects.get(pk=id)

schema = graphene.Schema(query=QueryType)