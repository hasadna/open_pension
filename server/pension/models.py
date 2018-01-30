from django.db import models
from django.core.exceptions import ValidationError
from django.utils.translation import ugettext_lazy as _

from pension.choices import YEARS, MONTHS, MANAGING_BODIES, GEOGRAPHICAL_LOCATION, INSTRUMENT_TYPES, \
    INSTRUMENT_FIELDS, INSTRUMENT_SUB_TYPES, RATING


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
        verbose_name = 'Quarter'
        verbose_name_plural = 'Quarters'


class Instrument(models.Model):
    auto_id = models.AutoField(_('Auto Id'), primary_key=True)
    instrument_type = models.CharField('Instrument Type', max_length=255, choices=INSTRUMENT_TYPES)
    instrument_sub_type = models.CharField('Instrument Sub Type', max_length=255, choices=INSTRUMENT_SUB_TYPES)
    instrument_id = models.CharField(_('Instrument Id'), max_length=255, blank=True)
    fund_name = models.CharField(_('Fund Name'), max_length=255, blank=True)
    fund_id = models.CharField(_('Fund Id'), max_length=255, blank=True)
    issuer_id = models.CharField(_('Issuer Id'), max_length=255, blank=True)
    issuer_name = models.CharField(_('Issuer Name'), max_length=255, blank=True)
    rating = models.CharField(_('Rating'), max_length=255, blank=True, choices=RATING)
    rating_agency = models.CharField(_('Rating Agency'), max_length=255, blank=True)
    currency = models.CharField(_('Currency'), max_length=255, blank=True)
    interest_rate = models.DecimalField(_('Interest Rate'), help_text="This is a percentage value.",
                                        validators=[validate_percentage], max_digits=50, decimal_places=3, null=True)
    yield_to_maturity = models.DecimalField(_('Yield To Maturity'), help_text="This is a percentage value.",
                                            validators=[validate_percentage], max_digits=50, decimal_places=3,
                                            null=True)
    par_value = models.DecimalField(_('Par Value'), help_text="Value is in thousands.", max_digits=50,
                                    decimal_places=3, null=True)
    market_cap = models.DecimalField(_('Market Cap'), help_text="Value is in thousands.", max_digits=50,
                                     decimal_places=3, null=True)
    rate_of_investment_channel = models.DecimalField(_('Rate Of Investment Channel'),
                                                     help_text="This is a percentage value.",
                                                     validators=[validate_percentage],
                                                     max_digits=50, decimal_places=3, null=True)
    rate_of_fund = models.DecimalField(_('Rate Of Fund'), help_text="This is a percentage value.",
                                       validators=[validate_percentage], max_digits=50, decimal_places=3, null=True)
    trading_floor = models.CharField(_('Trading Floor'), max_length=255, null=True, blank=True)
    date_of_purchase = models.CharField(_('Date Of Purchase'), max_length=255, null=True, blank=True)
    average_of_duration = models.DecimalField(_('Average Of Duration'), max_digits=50, decimal_places=3, null=True)
    rate = models.DecimalField(_('Rate'), max_digits=50, decimal_places=3, null=True)
    rate_of_ipo = models.DecimalField(_('Rate Of IPO'), help_text="This is a percentage value.",
                                      validators=[validate_percentage], max_digits=50, decimal_places=3, null=True)
    informer = models.CharField(_('Informer'), max_length=255, null=True, blank=True)
    fair_value = models.DecimalField(_('Fair Value'), help_text="Value is in thousands.", max_digits=50,
                                     decimal_places=3, null=True)
    activity_industry = models.CharField(_('Activity Industry'), max_length=255, null=True, blank=True)
    date_of_revaluation = models.DateField(_('Date Of Revaluation'), null=True, blank=True)
    type_of_asset = models.CharField(_('Type Of Asset'), max_length=255, null=True, blank=True)
    rate_of_return_during_period = models.DecimalField(_('Rate of Return During Period'), max_digits=50,
                                                       decimal_places=3, null=True)
    return_on_equity = models.DecimalField(_('Return On Equity'), help_text="This is a percentage value.",
                                           validators=[validate_percentage], max_digits=50, decimal_places=3,
                                           null=True)
    liabilities = models.DecimalField(_('Liabilities'), help_text="Value is in thousands.", max_digits=50,
                                      decimal_places=3, null=True)
    expiry_date_of_liabilities = models.DateField(_('Expiry Date Of Liabilities'), null=True, blank=True)
    effective_rate = models.DecimalField(_('Effective Rate'), help_text="This is a percentage value.",
                                         validators=[validate_percentage], max_digits=50, decimal_places=3, null=True)
    coordinated_cost = models.DecimalField(_('Coordinated Cost'), help_text="Value is in thousands.",
                                           max_digits=50, decimal_places=3, null=True)
    underlying_asset = models.CharField(_('Underlying Asset'), max_length=255, null=True, blank=True)
    consortium = models.NullBooleanField(_('Consortium'))
    average_rate = models.DecimalField(_('Average Rate'), help_text="This is a percentage value.",
                                       validators=[validate_percentage], max_digits=50, decimal_places=3, null=True)
    estimated_value = models.DecimalField(_('Estimated Value'), help_text="Value is in thousands.", max_digits=50,
                                          decimal_places=3, null=True)
    managing_body = models.CharField('Managing Body', max_length=255, choices=MANAGING_BODIES)
    geographical_location = models.CharField('Geographical Location', max_length=255,
                                             choices=GEOGRAPHICAL_LOCATION, null=True)
    negotiable = models.NullBooleanField(_('Negotiable'))
    quarter = models.ForeignKey(Quarter, related_name='instrument_quarter')

    class Meta:
        verbose_name = 'Instrument'
        verbose_name_plural = 'Instruments'


class InstrumentFields(models.Model):
    fields_to_show = models.CharField(_('Fields To Show'), max_length=255, choices=INSTRUMENT_FIELDS)
    color = models.CharField(_('Color'), max_length=255)

    class Meta:
        verbose_name = 'Instrument Fields'
        verbose_name_plural = 'Instrument Fields'
