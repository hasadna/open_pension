from modeltranslation.translator import register, TranslationOptions
from pension.models import Example


@register(Example)
class ExampleTranslation(TranslationOptions):
    fields = ('title',)
    required_languages = ('he',)
