from django.db import models
from colorful.fields import RGBColorField
from django.core.exceptions import ValidationError
from django.utils.translation import ugettext_lazy as _

from pension.choices import (
    YEARS,
    MONTHS,
    RATING,
    MANAGING_BODIES,
    INSTRUMENT_TYPES,
    INSTRUMENT_FIELDS,
    INSTRUMENT_SUB_TYPES
)


def validate_percentage(value):
    if 0 > value > 1:
        raise ValidationError(
            _('%(value)s is not a percentage (less then 0 or more then 1)'),
            params={'value': value},
        )


class Quarter(models.Model):
    quarter_id = models.AutoField(primary_key=True)
    year = models.CharField(_('Year'), max_length=225, choices=YEARS)
    month = models.CharField(_('Month'), max_length=225, choices=MONTHS)

    def __str__(self):
        return '{year} - {month}'.format(year=self.year, month=self.month)

    class Meta:
        verbose_name = _('Quarter')
        verbose_name_plural = _('Quarters')


class Fund(models.Model):
    managing_body = models.CharField(_('Managing Body'), max_length=255, choices=MANAGING_BODIES)
    fund = models.IntegerField(_('Fund'), null=True, blank=True)
    fund_name = models.CharField(_('Fund Name'), max_length=255, null=True, blank=True)
    quarter = models.ForeignKey(Quarter, related_name='instrument_quarter')
    instrument_type = models.CharField(_('Instrument Type'), max_length=255, choices=INSTRUMENT_TYPES)
    instrument_sub_type = models.CharField(_('Instrument Sub Type'), max_length=255, choices=INSTRUMENT_SUB_TYPES)
    instrument_id = models.CharField(_('Instrument Id'), max_length=255, blank=True, null=True)
    orig_instrument_id = models.CharField(_('Original Instrument Id'), max_length=255, blank=True, null=True)
    instrument_name = models.CharField(_('Instrument Name'), max_length=255, null=True, blank=True)
    issuer = models.CharField(_('Issuer'), max_length=255, null=True, blank=True)
    activity_industry = models.CharField(_('Activity Industry'), max_length=255, null=True, blank=True)
    currency = models.CharField(_('Currency'), max_length=255, blank=True, null=True)
    fair_value = models.DecimalField(_('Fair Value'), help_text="Value is in thousands.", max_digits=50,
                                     decimal_places=10, null=True)
    market_cap = models.DecimalField(_('Market Cap'), help_text="Value is in thousands.", max_digits=50,
                                     decimal_places=10, null=True)
    rate_of_fund = models.DecimalField(_('Rate Of Fund'), help_text="This is a percentage value.", max_digits=50,
                                       decimal_places=10, null=True, validators=[validate_percentage])
    rating_agency = models.CharField(_('Rating Agency'), max_length=255, blank=True, null=True)
    reference_index = models.CharField(_('Reference Index'), max_length=255, blank=True, null=True)
    intrest_rate = models.DecimalField(_('Intrest Rate'), help_text="Value is in thousands.", max_digits=50,
                                       decimal_places=10, null=True)
    date_of_purchase = models.CharField(_('Date Of Purchase'), max_length=255, blank=True, null=True)
    average_of_duration = models.DecimalField(_('Average Of Duration'), help_text="Value is in thousands.",
                                              max_digits=50, decimal_places=10, null=True)
    date_of_revaluation = models.DateTimeField(_('Date Of Revaluation'), null=True, blank=True)
    rate = models.DecimalField(_('Rate'), max_digits=50, decimal_places=10, null=True)
    yield_to_maturity = models.DecimalField(_('Yield To Maturity'), help_text="This is a percentage value.", null=True,
                                            max_digits=50, validators=[validate_percentage], decimal_places=10)
    rating = models.CharField(_('Rating'), max_length=255, blank=True, choices=RATING)
    par_value = models.DecimalField(_('Par Value'), help_text="Value is in thousands.", max_digits=50, null=True,
                                    decimal_places=3)
    underlying_asset = models.CharField(_('Underlying Asset'), max_length=255, blank=True, null=True)
    type_of_asset = models.CharField(_('Type Of Asset'), max_length=255, blank=True, null=True)
    rate_of_ipo = models.DecimalField(_('Rate Of IPO'), help_text="This is a percentage value.", decimal_places=10,
                                      validators=[validate_percentage], max_digits=50, null=True)
    liquidity = models.CharField(_('Liquidity'), max_length=255, blank=True, null=True)
    asset_type = models.CharField(_('Asset Type'), max_length=255, blank=True, null=True)
    row_cleansing_time = models.DateTimeField(_('Row Cleansing Time'), null=True, blank=True)
    issuer_number = models.IntegerField(_('Issuer Number'), null=True, blank=True)
    owner_option = models.CharField(_('Owner Option'), max_length=255, blank=True, null=True)
    original_issuer_number = models.IntegerField(_('Original Issuer Number'), null=True, blank=True)
    isin = models.CharField(_('ISIN'), max_length=255, blank=True, null=True)
    instrument_symbol = models.CharField(_('Instrument Symbol'), max_length=255, blank=True, null=True)
    movil = models.CharField(_('Movil'), max_length=255, blank=True, null=True)
    sector = models.CharField(_('Sector'), max_length=255, blank=True, null=True)
    dual_trade = models.NullBooleanField(_('Dual Trade'))
    cleansing_action = models.IntegerField(_('Cleansing Action'), null=True, blank=True)

    class Meta:
        verbose_name = _('Fund')
        verbose_name_plural = _('Funds')


class FilterFields(models.Model):
    fields_to_show = models.CharField(_('Fields To Show'), max_length=255, choices=INSTRUMENT_FIELDS)
    color = RGBColorField()

    class Meta:
        verbose_name = _('Filter Field')
        verbose_name_plural = _('Filters Fields')
