import uuid

from django.db import models
from ckeditor.fields import RichTextField
from django.utils.translation import ugettext_lazy as _

from pension.choices import CURRENCIES, ASSET_TYPES, RATING, ACTIVITY_INDUSTRY, QUARTER, MANAGING_BODIES, GEOGRAPHICAL_LOCATION

class Security(models.Model):
    """
    Model representing a Security, regardless of time and its holding by a specific ManagingBody
    """
    security_name = models.CharField(_('security_name'), max_length=255)
    security_number = models.IntegerField('security_number')
    asset_type = models.CharField('asset_type', max_length=255, choices=ASSET_TYPES, default='d')
    currency = models.CharField('currency', max_length=255, choices=CURRENCIES, default='d')
    activity_industry = models.IntegerField('activity_industry', choices=ACTIVITY_INDUSTRY, default='d')

    # 'subcategories' - noted in sheets as row listings, not in columns
    is_liquid = models.BooleanField('is_liquid', default=True)
    geographical_location = models.CharField('geographical_location', max_length=255, null=True)
    reference_type = models.CharField('reference_type', max_length=255, null=True)
    local_context = models.CharField('local_context', max_length=255, null=True)

    def __str__(self):
        """
        String for representing the Model object.
        """
        return self.name

    class Meta:
        verbose_name = _('Security')
        verbose_name_plural = _('Security')
        ordering = ["security_name"]

# rating	rater	life_span	interest_rate	rate_of_ipo	exchange_rate
class SecurityQuarter(models.Model):
    """
    Model representing the Security in a specific quarter
    """
    security = models.ForeignKey(Security, null=True)
    quarter = models.CharField('quarter', max_length=255, null=True, choices=QUARTER, default='d')
    rating = models.CharField('rating', max_length=255, null=True, choices=RATING, default='d')
    rater = models.CharField('rater', max_length=255, null=True)
    life_span = models.IntegerField('average_life_span_years', null=True)
    interest_rate = models.IntegerField('interest_rate', null=True)
    rate_of_ipo = models.IntegerField('rate_of_ipo', null=True)
    exchange_rate_agorot = models.IntegerField('exchange_rate_agorot', null=True)

    def __str__(self):
        """
        String for representing the Model object.
        """
        return self.name

    class Meta:
        verbose_name = _('SecurityQuarter')
        verbose_name_plural = _('SecurityQuarter')
        ordering = ["rating"]

class Holding(models.Model):
    managing_body = models.CharField('managing_body', max_length=255, choices=MANAGING_BODIES, null=True)
    security_quarter = models.ForeignKey(SecurityQuarter, max_length=255, null=True)

    fair_value = models.IntegerField('fair_value', null=True)
    acquisition_date = models.IntegerField('acquisition_date', null=True)
    market_cap = models.IntegerField('market_cap', null=True)       # thousand nis
    par_value = models.IntegerField('par_value', null=True)         # percentage of the security of total investment of fund
    linkage_type = models.IntegerField('linkage_type', null=True)   # percentage of the security held by fund out of total issues amount
    part_of_total_investment = models.IntegerField('part_of_total_investment', null=True)

    class Meta:
        verbose_name = _('Holding')
        verbose_name_plural = _('Holding')


# ==========================================

class CashAndDeposit(models.Model):
    pass

    class Meta:
        verbose_name = _('Cash And Deposit')
        verbose_name_plural = _('Cash And Deposit')


class GovernmentBonds(models.Model):
    pass

    class Meta:
        verbose_name = _('Government Bonds')
        verbose_name_plural = _('GovernmentBonds')


class CommercialBonds(models.Model):
    pass

    class Meta:
        verbose_name = _('Commercial Bonds')
        verbose_name_plural = _('Commercial Bonds')


class CorporateBonds(models.Model):
    pass

    class Meta:
        verbose_name = _('Corporate Bonds')
        verbose_name_plural = _('CorporateBonds')


class Shares(models.Model):
    pass

    class Meta:
        verbose_name = _('Shares')
        verbose_name_plural = _('Shares')


class ETF(models.Model):
    pass

    class Meta:
        verbose_name = _('ETF')
        verbose_name_plural = _('ETF')


class TrustFunds(models.Model):
    pass

    class Meta:
        verbose_name = _('Trust Funds')
        verbose_name_plural = _('Trust Funds')


class OptionWarrants(models.Model):
    pass

    class Meta:
        verbose_name = _('Option Warrants')
        verbose_name_plural = _('Option Warrants')


class Options(models.Model):
    pass

    class Meta:
        verbose_name = _('Options')
        verbose_name_plural = _('Options')


class Futures(models.Model):
    pass

    class Meta:
        verbose_name = _('Futures')
        verbose_name_plural = _('Futures')


class StructuredProducts(models.Model):
    pass

    class Meta:
        verbose_name = _('Structured Products')
        verbose_name_plural = _('Structured Products')


class LandRights(models.Model):
    pass

    class Meta:
        verbose_name = _('Land Rights')
        verbose_name_plural = _('LandRights')


class CompaniesInvestments(models.Model):
    pass

    class Meta:
        verbose_name = _('Companies Investments')
        verbose_name_plural = _('Companies Investments')


class OtherInvestments(models.Model):
    pass

    class Meta:
        verbose_name = _('Other Investments')
        verbose_name_plural = _('Other Investments')


class InvestmentsBalance(models.Model):
    pass

    class Meta:
        verbose_name = _('Investments Balance')
        verbose_name_plural = _('Investments Balance')


class Others(models.Model):
    pass

    class Meta:
        verbose_name = _('Others')
        verbose_name_plural = _('Others')
