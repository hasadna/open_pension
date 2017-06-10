from blog.models import Post
from graphene_django import DjangoObjectType
from graphene_django.filter import DjangoFilterConnectionField
import graphene

class PostType(DjangoObjectType):
    class Meta:
        model = Post


class Query(graphene.AbstractType):

    post = graphene.Field(PostType, postId=graphene.Int())
    all_posts = graphene.List(PostType)

    def resolve_all_tags(self, args, context, info):
        return Post.objects.all()

    def resolve_all_posts(self, args, context, info):
        return Post.objects.all()

    def resolve_post(self, args, context, info):
        postId = args.get('postId')

        if postId is not None:
            return Post.objects.get(pk=postId)

        return None
