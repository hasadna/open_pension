from modeltranslation.translator import register, TranslationOptions
from .models import Fund, Instrument, Issuer


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
