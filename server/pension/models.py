import uuid

from django.db import models
from ckeditor.fields import RichTextField
from django.core.exceptions import ValidationError
from django.utils.translation import ugettext_lazy as _

from pension.choices import CURRENCIES, ASSET_TYPES, RATING, ACTIVITY_INDUSTRY, QUARTER, \
    MANAGING_BODIES, GEOGRAPHICAL_LOCATION


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
    # percentage of the security of total investment of fund
    par_value = models.IntegerField('par_value', null=True)
    # percentage of the security held by fund out of total issues amount
    linkage_type = models.IntegerField('linkage_type', null=True)
    part_of_total_investment = models.IntegerField('part_of_total_investment', null=True)

    class Meta:
        verbose_name = _('Holding')
        verbose_name_plural = _('Holding')


# ==========================================

def validate_percentage(value):
    if 0 > value > 100:
        raise ValidationError(
            _('%(value)s is not a percentage (less then 0 or more then 100)'),
            params={'value': value},
        )


class Bonds(models.Model):
    pass


class CashAndDeposit(models.Model):
    pass

    class Meta:
        verbose_name = _('Cash And Deposit')
        verbose_name_plural = _('Cash And Deposit')


class GovernmentBonds(Bonds):
    name = models.CharField(_('Name'), max_length=255)
    id = models.PositiveIntegerField(_('Id'))
    currency = models.CharField(_('Currency'), max_length=255)
    nominal_value = models.DecimalField(_('Nominal Value'), max_digits=50, decimal_places=3)
    exchange_rate = models.DecimalField(_('Exchange Rate'), max_digits=50, decimal_places=3)
    rate = models.CharField(_('Rate'), max_length=255)
    rating_name = models.CharField(_('Rating Name'), max_length=255)
    average_life_span = models.DecimalField(_('Average Life Span'), max_digits=50, decimal_places=3)
    interest_rate = models.DecimalField(_('Interest Rate'), help_text="This is a percentage value.", validators=[validate_percentage], max_digits=50, decimal_places=3)
    yield_to_maturity = models.DecimalField(_('Yield To Maturity'), help_text="This is a percentage value.", validators=[validate_percentage], max_digits=50, decimal_places=3)
    market_value = models.DecimalField(_('Market Value'), help_text="Value is in thousands.", max_digits=50, decimal_places=3)
    issued_par_rate = models.DecimalField(_('Issued Par Rate'), help_text="This is a percentage value.", validators=[validate_percentage], max_digits=50, decimal_places=3)
    investment_assets_rate = models.DecimalField(_('Investment Assets Rate'), help_text="This is a percentage value.", validators=[validate_percentage], max_digits=50, decimal_places=3)

    class Meta:
        verbose_name = _('Government Bonds')
        verbose_name_plural = _('GovernmentBonds')


class CommercialBonds(Bonds):
    name = models.CharField(_('Name'), max_length=255)
    id = models.PositiveIntegerField(_('Id'))
    currency = models.CharField(_('Currency'), max_length=255)
    nominal_value = models.DecimalField(_('Nominal Value'), max_digits=50, decimal_places=3)
    exchange_rate = models.DecimalField(_('Exchange Rate'), max_digits=50, decimal_places=3)
    rate = models.CharField(_('Rate'), max_length=255)
    rating_name = models.CharField(_('Rating Name'), max_length=255)
    average_life_span = models.DecimalField(_('Average Life Span'), max_digits=50, decimal_places=3)
    interest_rate = models.DecimalField(_('Interest Rate'), help_text="This is a percentage value.", validators=[validate_percentage], max_digits=50, decimal_places=3)
    yield_to_maturity = models.DecimalField(_('Yield To Maturity'), help_text="This is a percentage value.", validators=[validate_percentage], max_digits=50, decimal_places=3)
    activity_industry = models.CharField(_('Activity Industry'), max_length=255)
    market_value = models.DecimalField(_('Market Value'), help_text="Value is in thousands.", max_digits=50, decimal_places=3)
    issued_par_rate = models.DecimalField(_('Issued Par Rate'), help_text="This is a percentage value.", validators=[validate_percentage], max_digits=50, decimal_places=3)
    investment_assets_rate = models.DecimalField(_('Investment Assets Rate'), help_text="This is a percentage value.", validators=[validate_percentage], max_digits=50, decimal_places=3)

    class Meta:
        verbose_name = _('Commercial Bonds')
        verbose_name_plural = _('Commercial Bonds')


class CorporateBonds(Bonds):
    name = models.CharField(_('Name'), max_length=255)
    id = models.PositiveIntegerField(_('Id'))
    currency = models.CharField(_('Currency'), max_length=255)
    nominal_value = models.DecimalField(_('Nominal Value'), max_digits=50, decimal_places=3)
    exchange_rate = models.DecimalField(_('Exchange Rate'), max_digits=50, decimal_places=3)
    rate = models.CharField(_('Rate'), max_length=255)
    rating_name = models.CharField(_('Rating Name'), max_length=255)
    average_life_span = models.DecimalField(_('Average Life Span'), max_digits=50, decimal_places=3)
    interest_rate = models.DecimalField(_('Interest Rate'), help_text="This is a percentage value.", validators=[validate_percentage], max_digits=50, decimal_places=3)
    yield_to_maturity = models.DecimalField(_('Yield To Maturity'), help_text="This is a percentage value.", validators=[validate_percentage], max_digits=50, decimal_places=3)
    activity_industry = models.CharField(_('Activity Industry'), max_length=255)
    market_value = models.DecimalField(_('Market Value'), help_text="Value is in thousands.", max_digits=50, decimal_places=3)
    issued_par_rate = models.DecimalField(_('Issued Par Rate'), help_text="This is a percentage value.", validators=[validate_percentage], max_digits=50, decimal_places=3)
    investment_assets_rate = models.DecimalField(_('Investment Assets Rate'), help_text="This is a percentage value.", validators=[validate_percentage], max_digits=50, decimal_places=3)

    class Meta:
        verbose_name = _('Corporate Bonds')
        verbose_name_plural = _('CorporateBonds')


class Shares(Bonds):
    name = models.CharField(_('Name'), max_length=255)
    id = models.PositiveIntegerField(_('Id'))
    currency = models.CharField(_('Currency'), max_length=255)
    nominal_value = models.DecimalField(_('Nominal Value'), max_digits=50, decimal_places=3)
    exchange_rate = models.DecimalField(_('Exchange Rate'), max_digits=50, decimal_places=3)
    activity_industry = models.CharField(_('Activity Industry'), max_length=255)
    market_value = models.DecimalField(_('Market Value'), help_text="Value is in thousands.", max_digits=50, decimal_places=3)
    issued_par_rate = models.DecimalField(_('Issued Par Rate'), help_text="This is a percentage value.", validators=[validate_percentage], max_digits=50, decimal_places=3)
    investment_assets_rate = models.DecimalField(_('Investment Assets Rate'), help_text="This is a percentage value.", validators=[validate_percentage], max_digits=50, decimal_places=3)

    class Meta:
        verbose_name = _('Shares')
        verbose_name_plural = _('Shares')


class ETF(Bonds):
    name = models.CharField(_('Name'), max_length=255)
    id = models.PositiveIntegerField(_('Id'))
    currency = models.CharField(_('Currency'), max_length=255)
    nominal_value = models.DecimalField(_('Nominal Value'), max_digits=50, decimal_places=3)
    exchange_rate = models.DecimalField(_('Exchange Rate'), max_digits=50, decimal_places=3)
    market_value = models.DecimalField(_('Market Value'), help_text="Value is in thousands.", max_digits=50, decimal_places=3)
    issued_par_rate = models.DecimalField(_('Issued Par Rate'), help_text="This is a percentage value.", validators=[validate_percentage], max_digits=50, decimal_places=3)
    investment_assets_rate = models.DecimalField(_('Investment Assets Rate'), help_text="This is a percentage value.", validators=[validate_percentage], max_digits=50, decimal_places=3)

    class Meta:
        verbose_name = _('ETF')
        verbose_name_plural = _('ETF')


class TrustFunds(Bonds):
    name = models.CharField(_('Name'), max_length=255)
    id = models.PositiveIntegerField(_('Id'))
    currency = models.CharField(_('Currency'), max_length=255)
    nominal_value = models.DecimalField(_('Nominal Value'), max_digits=50, decimal_places=3)
    exchange_rate = models.DecimalField(_('Exchange Rate'), max_digits=50, decimal_places=3)
    rate = models.CharField(_('Rate'), max_length=255)
    rating_name = models.CharField(_('Rating Name'), max_length=255)
    activity_industry = models.CharField(_('Activity Industry'), max_length=255)
    market_value = models.DecimalField(_('Market Value'), help_text="Value is in thousands.", max_digits=50, decimal_places=3)
    issued_par_rate = models.DecimalField(_('Issued Par Rate'), help_text="This is a percentage value.", validators=[validate_percentage], max_digits=50, decimal_places=3)
    investment_assets_rate = models.DecimalField(_('Investment Assets Rate'), help_text="This is a percentage value.", validators=[validate_percentage], max_digits=50, decimal_places=3)

    class Meta:
        verbose_name = _('Trust Funds')
        verbose_name_plural = _('Trust Funds')


class OptionWarrants(Bonds):
    name = models.CharField(_('Name'), max_length=255)
    id = models.PositiveIntegerField(_('Id'))
    currency = models.CharField(_('Currency'), max_length=255)
    nominal_value = models.DecimalField(_('Nominal Value'), max_digits=50, decimal_places=3)
    exchange_rate = models.DecimalField(_('Exchange Rate'), max_digits=50, decimal_places=3)
    activity_industry = models.CharField(_('Activity Industry'), max_length=255)
    market_value = models.DecimalField(_('Market Value'), help_text="Value is in thousands.", max_digits=50, decimal_places=3)
    issued_par_rate = models.DecimalField(_('Issued Par Rate'), help_text="This is a percentage value.", validators=[validate_percentage], max_digits=50, decimal_places=3)
    investment_assets_rate = models.DecimalField(_('Investment Assets Rate'), help_text="This is a percentage value.", validators=[validate_percentage], max_digits=50, decimal_places=3)

    class Meta:
        verbose_name = _('Option Warrants')
        verbose_name_plural = _('Option Warrants')


class Options(Bonds):
    name = models.CharField(_('Name'), max_length=255)
    id = models.PositiveIntegerField(_('Id'))
    currency = models.CharField(_('Currency'), max_length=255)
    nominal_value = models.DecimalField(_('Nominal Value'), max_digits=50, decimal_places=3)
    exchange_rate = models.DecimalField(_('Exchange Rate'), max_digits=50, decimal_places=3)
    activity_industry = models.CharField(_('Activity Industry'), max_length=255)
    market_value = models.DecimalField(_('Market Value'), help_text="Value is in thousands.", max_digits=50, decimal_places=3)
    issued_par_rate = models.DecimalField(_('Issued Par Rate'), help_text="This is a percentage value.", validators=[validate_percentage], max_digits=50, decimal_places=3)
    investment_assets_rate = models.DecimalField(_('Investment Assets Rate'), help_text="This is a percentage value.", validators=[validate_percentage], max_digits=50, decimal_places=3)

    class Meta:
        verbose_name = _('Options')
        verbose_name_plural = _('Options')


class Futures(Bonds):
    name = models.CharField(_('Name'), max_length=255)
    id = models.PositiveIntegerField(_('Id'))
    activity_industry = models.CharField(_('Activity Industry'), max_length=255)
    currency = models.CharField(_('Currency'), max_length=255)
    nominal_value = models.DecimalField(_('Nominal Value'), max_digits=50, decimal_places=3)
    exchange_rate = models.DecimalField(_('Exchange Rate'), max_digits=50, decimal_places=3)

    class Meta:
        verbose_name = _('Futures')
        verbose_name_plural = _('Futures')


class StructuredProducts(Bonds):
    name = models.CharField(_('Name'), max_length=255)
    id = models.PositiveIntegerField(_('Id'))
    base_asset = models.CharField(_('Base Asset'), max_length=255)
    rate = models.CharField(_('Rate'), max_length=255)
    rating_name = models.CharField(_('Rating Name'), max_length=255)
    purchase_date = models.DateField(_('Purchase Date'))
    average_life_span = models.DecimalField(_('Average Life Span'), max_digits=50, decimal_places=3)
    currency = models.CharField(_('Currency'), max_length=255)
    interest_rate = models.DecimalField(_('Interest Rate'), max_digits=50, decimal_places=3)
    yield_to_maturity = models.DecimalField(_('Yield To Maturity'), help_text="This is a percentage value.", validators=[validate_percentage], max_digits=50, decimal_places=3)
    nominal_value = models.DecimalField(_('Nominal Value'), max_digits=50, decimal_places=3)
    exchange_rate = models.DecimalField(_('Exchange Rate'), max_digits=50, decimal_places=3)
    market_value = models.DecimalField(_('Market Value'), help_text="Value is in thousands.", max_digits=50, decimal_places=3)
    issued_par_rate = models.DecimalField(_('Issued Par Rate'), help_text="This is a percentage value.", validators=[validate_percentage], max_digits=50, decimal_places=3)
    investment_assets_rate = models.DecimalField(_('Investment Assets Rate'), help_text="This is a percentage value.", validators=[validate_percentage], max_digits=50, decimal_places=3)

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
