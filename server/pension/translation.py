from modeltranslation.translator import TranslationOptions, register

from pension.models import FilterFields


@register(FilterFields)
class FilterFieldsTranslation(TranslationOptions):
    fields = ('fields_to_show',)
    required_languages = ('he',)
