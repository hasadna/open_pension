from modeltranslation.translator import register, TranslationOptions

from pension.models import CashAndDeposit


@register(CashAndDeposit)
class CashAndDepositTranslation(TranslationOptions):
    fields = ('title',)
    required_languages = ('he',)
