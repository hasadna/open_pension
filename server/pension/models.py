import uuid

from django.db import models
from ckeditor.fields import RichTextField
from django.utils.translation import ugettext_lazy as _


class CashAndDeposit(models.Model):
    title = models.CharField(_('title'), max_length=255)

    class Meta:
        verbose_name = _('Cash And Deposit')
        verbose_name_plural = _('Cash And Deposit')


class GovernmentBonds(models.Model):
    pass


class CommercialBonds(models.Model):
    pass


class CorporateBonds(models.Model):
    pass


class Shares(models.Model):
    pass


class ETF(models.Model):
    pass


class TrustFunds(models.Model):
    pass


class OptionWarrants(models.Model):
    pass


class Options(models.Model):
    pass


class Futures(models.Model):
    pass


class StructuredProducts(models.Model):
    pass


class LandRights(models.Model):
    pass


class CompaniesInvestments(models.Model):
    pass


class OtherInvestments(models.Model):
    pass


class InvestmentsBalance(models.Model):
    pass


class Others(models.Model):
    pass
