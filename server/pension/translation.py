from modeltranslation.translator import register, TranslationOptions
from pension.models import Blog, Tags, Security


@register(Security)
class SecurityTranslation(TranslationOptions):
    fields = ('name',)
    required_languages = ('he',)

@register(Tags)
class TagsTranslation(TranslationOptions):
    fields = ('name',)
    required_languages = ('he',)

@register(Blog)
class BlogTranslation(TranslationOptions):
    fields = ('title', 'author', 'body')
    required_languages = ('he',)
