from modeltranslation.translator import register, TranslationOptions
from blog.models import Post


@register(Post)
class PostTranslation(TranslationOptions):
    fields = ('title', 'author', 'body')
    required_languages = ('he',)
