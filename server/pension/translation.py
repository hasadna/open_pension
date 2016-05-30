from modeltranslation.translator import register, TranslationOptions
from .models import ManagingBody, Fund, Instrument, Issuer


@register(ManagingBody)
class ManagingBodyTranslation(TranslationOptions):
    fields = ('label',)
    required_languages = ('he',)


@register(Fund)
class FundTranslation(TranslationOptions):
    fields = ('label',)
    required_languages = ('he',)


@register(Instrument)
class FundTranslation(TranslationOptions):
    fields = ('label',)
    required_languages = ('he',)


@register(Issuer)
class FundTranslation(TranslationOptions):
    fields = ('label',)
    required_languages = ('he',)
