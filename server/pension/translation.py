from modeltranslation.translator import register, TranslationOptions
from pension.models import Security


@register(Security)
class SecurityTranslation(TranslationOptions):
    fields = ('security_name',)
    required_languages = ('he',)
