from django.db import models
from django.core.exceptions import ValidationError
from django.utils.translation import ugettext_lazy as _

from pension.choices import YEARS, MONTHS, MANAGING_BODIES, GEOGRAPHICAL_LOCATION


# managing_body = models.CharField('Managing Body', max_length=255, choices=MANAGING_BODIES)
# geographical_location = models.CharField('Geographical Location', max_length=255, choices=GEOGRAPHICAL_LOCATION)


def validate_percentage(value):
    if 0 > value > 1:
        raise ValidationError(
            _('%(value)s is not a percentage (less then 0 or more then 1)'),
            params={'value': value},
        )


class Quarter(models.Model):
    quarter_id = models.AutoField(primary_key=True)
    year = models.PositiveIntegerField(_('Year'), choices=YEARS)
    month = models.PositiveIntegerField(_('Month'), choices=MONTHS)


class Instrument(models.Model):
    instrument_id = models.AutoField(_('Instrument Id'), primary_key=True)
    rating = models.CharField(_('Rating'), max_length=255)
    rating_agency = models.CharField(_('Rating Agency'), max_length=255)
    currency = models.CharField(_('Currency'), max_length=255)
    rate_of_fund = models.DecimalField(_('Rate of Fund'), help_text="This is a percentage value.", validators=[validate_percentage], max_digits=50, decimal_places=3)


class Cash(Instrument):
    issuer_id = models.PositiveIntegerField(_('Issuer Id'))
    interest_rate = models.DecimalField(_('Interest rate'), help_text="This is a percentage value.", validators=[validate_percentage], max_digits=50, decimal_places=3)
    yield_to_maturity = models.DecimalField(_('Yield To Maturity'), help_text="This is a percentage value.", validators=[validate_percentage], max_digits=50, decimal_places=3)
    market_value = models.DecimalField(_('Market Value'), help_text="Value is in thousands.", max_digits=50, decimal_places=3)
    investment_assets_rate = models.DecimalField(_('Investment Assets Rate'), help_text="This is a percentage value.", validators=[validate_percentage], max_digits=50, decimal_places=3)

    def save(self):
        self.market_value = self.market_value * 1000
        super(Cash, self).save()


class GovernmentDebtCertificates(Instrument):
    market_place = models.CharField(_('Market Place'), max_length=255)
    purchase_date = models.DateField(_('Purchase Date'))
    average_life_span = models.DecimalField(_('Average Life Span'), max_digits=50, decimal_places=3)
    interest_rate = models.DecimalField(_('Interest rate'), help_text="This is a percentage value.", validators=[validate_percentage], max_digits=50, decimal_places=3)
    yield_to_maturity = models.DecimalField(_('Yield To Maturity'), help_text="This is a percentage value.", validators=[validate_percentage], max_digits=50, decimal_places=3)
    nominal_value = models.DecimalField(_('Nominal Value'), max_digits=50, decimal_places=3)
    rate = models.DecimalField(_('Rate'), max_length=255)
    market_value = models.DecimalField(_('Market Value'), help_text="Value is in thousands.", max_digits=50, decimal_places=3)
    total_percentage_from_total_issued = models.DecimalField(_('Total Percentage From Total Issued'), help_text="This is a percentage value.", validators=[validate_percentage], max_digits=50, decimal_places=3)
    assets_rate_from_investment_channel = models.DecimalField(_('Assets Rate From Investment Channel'), help_text="This is a percentage value.", validators=[validate_percentage], max_digits=50, decimal_places=3)

    def save(self):
        self.market_value = self.market_value * 1000
        super(GovernmentDebtCertificates, self).save()


class CommercialDebtCertificates(Instrument):
    market_place = models.CharField(_('Market Place'), max_length=255)
    provide_information = models.CharField(_('Provide Information'), max_length=255)
    issuer_id = models.PositiveIntegerField(_('Issuer Id'))
    trading_sector = models.CharField(_('Trading Sector'), max_length=255)
    purchase_date = models.DateField(_('Purchase Date'))
    average_life_span = models.DecimalField(_('Average Life Span'), max_digits=50, decimal_places=3)
    interest_rate = models.DecimalField(_('Interest rate'), help_text="This is a percentage value.", validators=[validate_percentage], max_digits=50, decimal_places=3)
    yield_to_maturity = models.DecimalField(_('Yield To Maturity'), help_text="This is a percentage value.", validators=[validate_percentage], max_digits=50, decimal_places=3)
    nominal_value = models.DecimalField(_('Nominal Value'), max_digits=50, decimal_places=3)
    rate = models.DecimalField(_('Rate'), max_length=255)
    market_value = models.DecimalField(_('Market Value'), help_text="Value is in thousands.", max_digits=50, decimal_places=3)
    total_percentage_from_total_issued = models.DecimalField(_('Total Percentage From Total Issued'), help_text="This is a percentage value.", validators=[validate_percentage], max_digits=50, decimal_places=3)
    assets_rate_from_investment_channel = models.DecimalField(_('Assets Rate From Investment Channel'), help_text="This is a percentage value.", validators=[validate_percentage], max_digits=50, decimal_places=3)

    def save(self):
        self.market_value = self.market_value * 1000
        super(CommercialDebtCertificates, self).save()


class CorporateBonds(Instrument):
    market_place = models.CharField(_('Market Place'), max_length=255)
    provide_information = models.CharField(_('Provide Information'), max_length=255)
    issuer_id = models.PositiveIntegerField(_('Issuer Id'))
    trading_sector = models.CharField(_('Trading Sector'), max_length=255)
    purchase_date = models.DateField(_('Purchase Date'))
    average_life_span = models.DecimalField(_('Average Life Span'), max_digits=50, decimal_places=3)
    interest_rate = models.DecimalField(_('Interest rate'), help_text="This is a percentage value.", validators=[validate_percentage], max_digits=50, decimal_places=3)
    yield_to_maturity = models.DecimalField(_('Yield To Maturity'), help_text="This is a percentage value.", validators=[validate_percentage], max_digits=50, decimal_places=3)
    nominal_value = models.DecimalField(_('Nominal Value'), max_digits=50, decimal_places=3)
    rate = models.DecimalField(_('Rate'), max_length=255)
    market_value = models.DecimalField(_('Market Value'), help_text="Value is in thousands.", max_digits=50, decimal_places=3)
    total_percentage_from_total_issued = models.DecimalField(_('Total Percentage From Total Issued'), help_text="This is a percentage value.", validators=[validate_percentage], max_digits=50, decimal_places=3)
    assets_rate_from_investment_channel = models.DecimalField(_('Assets Rate From Investment Channel'), help_text="This is a percentage value.", validators=[validate_percentage], max_digits=50, decimal_places=3)

    def save(self):
        self.market_value = self.market_value * 1000
        super(CorporateBonds, self).save()


class Stock():
    security_id = models.AutoField(_('Security Id'), primary_key=True)
    market_place = models.CharField(_('Market Place'), max_length=255)
    provide_information = models.CharField(_('Provide Information'), max_length=255)
    issuer_id = models.PositiveIntegerField(_('Issuer Id'))
    trading_sector = models.CharField(_('Trading Sector'), max_length=255)
    currency_type = models.CharField(_('Currency Type'), max_length=255)
    nominal_value = models.DecimalField(_('Nominal Value'), max_digits=50, decimal_places=3)
    rate = models.DecimalField(_('Rate'), max_length=255)
    market_value = models.DecimalField(_('Market Value'), help_text="Value is in thousands.", max_digits=50, decimal_places=3)
    total_percentage_from_total_issued = models.DecimalField(_('Total Percentage From Total Issued'), help_text="This is a percentage value.", validators=[validate_percentage], max_digits=50, decimal_places=3)
    assets_rate_from_investment_channel = models.DecimalField(_('Assets Rate From Investment Channel'), help_text="This is a percentage value.", validators=[validate_percentage], max_digits=50, decimal_places=3)
    total_percentage_from_investment_assets = models.DecimalField(_('Total Percentage From Investment Assets'), help_text="This is a percentage value.", validators=[validate_percentage], max_digits=50, decimal_places=3)

    def save(self):
        self.market_value = self.market_value * 1000
        super(Stock, self).save()


class ETF():
    security_id = models.AutoField(_('Security Id'), primary_key=True)
    market_place = models.CharField(_('Market Place'), max_length=255)
    issuer_id = models.PositiveIntegerField(_('Issuer Id'))
    trading_sector = models.CharField(_('Trading Sector'), max_length=255)
    currency_type = models.CharField(_('Currency Type'), max_length=255)
    nominal_value = models.DecimalField(_('Nominal Value'), max_digits=50, decimal_places=3)
    rate = models.DecimalField(_('Rate'), max_length=255)
    market_value = models.DecimalField(_('Market Value'), help_text="Value is in thousands.", max_digits=50, decimal_places=3)
    total_percentage_from_total_issued = models.DecimalField(_('Total Percentage From Total Issued'), help_text="This is a percentage value.", validators=[validate_percentage], max_digits=50, decimal_places=3)
    assets_rate_from_investment_channel = models.DecimalField(_('Assets Rate From Investment Channel'), help_text="This is a percentage value.", validators=[validate_percentage], max_digits=50, decimal_places=3)
    total_percentage_from_investment_assets = models.DecimalField(_('Total Percentage From Investment Assets'), help_text="This is a percentage value.", validators=[validate_percentage], max_digits=50, decimal_places=3)

    def save(self):
        self.market_value = self.market_value * 1000
        super(ETF, self).save()


class MutualFunds(Instrument):
    market_place = models.CharField(_('Market Place'), max_length=255)
    issuer_id = models.PositiveIntegerField(_('Issuer Id'))
    trading_sector = models.CharField(_('Trading Sector'), max_length=255)
    nominal_value = models.DecimalField(_('Nominal Value'), max_digits=50, decimal_places=3)
    rate = models.DecimalField(_('Rate'), max_length=255)
    market_value = models.DecimalField(_('Market Value'), help_text="Value is in thousands.", max_digits=50, decimal_places=3)
    total_percentage_from_total_issued = models.DecimalField(_('Total Percentage From Total Issued'), help_text="This is a percentage value.", validators=[validate_percentage], max_digits=50, decimal_places=3)
    assets_rate_from_investment_channel = models.DecimalField(_('Assets Rate From Investment Channel'), help_text="This is a percentage value.", validators=[validate_percentage], max_digits=50, decimal_places=3)

    def save(self):
        self.market_value = self.market_value * 1000
        super(MutualFunds, self).save()


class Warrants():
    security_id = models.AutoField(_('Security Id'), primary_key=True)
    market_place = models.CharField(_('Market Place'), max_length=255)
    issuer_id = models.PositiveIntegerField(_('Issuer Id'))
    trading_sector = models.CharField(_('Trading Sector'), max_length=255)
    currency_type = models.CharField(_('Currency Type'), max_length=255)
    nominal_value = models.DecimalField(_('Nominal Value'), max_digits=50, decimal_places=3)
    rate = models.DecimalField(_('Rate'), max_length=255)
    market_value = models.DecimalField(_('Market Value'), help_text="Value is in thousands.", max_digits=50, decimal_places=3)
    total_percentage_from_total_issued = models.DecimalField(_('Total Percentage From Total Issued'), help_text="This is a percentage value.", validators=[validate_percentage], max_digits=50, decimal_places=3)
    assets_rate_from_investment_channel = models.DecimalField(_('Assets Rate From Investment Channel'), help_text="This is a percentage value.", validators=[validate_percentage], max_digits=50, decimal_places=3)
    total_percentage_from_investment_assets = models.DecimalField(_('Total Percentage From Investment Assets'), help_text="This is a percentage value.", validators=[validate_percentage], max_digits=50, decimal_places=3)

    def save(self):
        self.market_value = self.market_value * 1000
        super(Warrants, self).save()


class Options():
    security_id = models.AutoField(_('Security Id'), primary_key=True)
    market_place = models.CharField(_('Market Place'), max_length=255)
    trading_sector = models.CharField(_('Trading Sector'), max_length=255)
    currency_type = models.CharField(_('Currency Type'), max_length=255)
    nominal_value = models.DecimalField(_('Nominal Value'), max_digits=50, decimal_places=3)
    rate = models.DecimalField(_('Rate'), max_length=255)
    market_value = models.DecimalField(_('Market Value'), help_text="Value is in thousands.", max_digits=50, decimal_places=3)
    total_percentage_from_total_issued = models.DecimalField(_('Total Percentage From Total Issued'), help_text="This is a percentage value.", validators=[validate_percentage], max_digits=50, decimal_places=3)
    assets_rate_from_investment_channel = models.DecimalField(_('Assets Rate From Investment Channel'), help_text="This is a percentage value.", validators=[validate_percentage], max_digits=50, decimal_places=3)
    total_percentage_from_investment_assets = models.DecimalField(_('Total Percentage From Investment Assets'), help_text="This is a percentage value.", validators=[validate_percentage], max_digits=50, decimal_places=3)

    def save(self):
        self.market_value = self.market_value * 1000
        super(Options, self).save()


class FutureContracts():
    security_id = models.AutoField(_('Security Id'), primary_key=True)
    market_place = models.CharField(_('Market Place'), max_length=255)
    trading_sector = models.CharField(_('Trading Sector'), max_length=255)
    currency_type = models.CharField(_('Currency Type'), max_length=255)
    nominal_value = models.DecimalField(_('Nominal Value'), max_digits=50, decimal_places=3)
    rate = models.DecimalField(_('Rate'), max_length=255)
    market_value = models.DecimalField(_('Market Value'), help_text="Value is in thousands.", max_digits=50, decimal_places=3)
    assets_rate_from_investment_channel = models.DecimalField(_('Assets Rate From Investment Channel'), help_text="This is a percentage value.", validators=[validate_percentage], max_digits=50, decimal_places=3)
    total_percentage_from_investment_assets = models.DecimalField(_('Total Percentage From Investment Assets'), help_text="This is a percentage value.", validators=[validate_percentage], max_digits=50, decimal_places=3)

    def save(self):
        self.market_value = self.market_value * 1000
        super(FutureContracts, self).save()


class StructuredProducts(Instrument):
    base_asset = models.CharField(_('Base Asset'), max_length=255)
    purchase_date = models.DateField(_('Purchase Date'))
    average_life_span = models.DecimalField(_('Average Life Span'), max_digits=50, decimal_places=3)
    interest_rate = models.DecimalField(_('Interest rate'), help_text="This is a percentage value.", validators=[validate_percentage], max_digits=50, decimal_places=3)
    yield_to_maturity = models.DecimalField(_('Yield To Maturity'), help_text="This is a percentage value.", validators=[validate_percentage], max_digits=50, decimal_places=3)
    nominal_value = models.DecimalField(_('Nominal Value'), max_digits=50, decimal_places=3)
    rate = models.DecimalField(_('Rate'), max_length=255)
    market_value = models.DecimalField(_('Market Value'), help_text="Value is in thousands.", max_digits=50, decimal_places=3)
    total_percentage_from_total_issued = models.DecimalField(_('Total Percentage From Total Issued'), help_text="This is a percentage value.", validators=[validate_percentage], max_digits=50, decimal_places=3)
    assets_rate_from_investment_channel = models.DecimalField(_('Assets Rate From Investment Channel'), help_text="This is a percentage value.", validators=[validate_percentage], max_digits=50, decimal_places=3)

    def save(self):
        self.market_value = self.market_value * 1000
        super(StructuredProducts, self).save()


class NotNegotiableGovernmentCommitmentsCertificates(Instrument):
    purchase_date = models.DateField(_('Purchase Date'))
    average_life_span = models.DecimalField(_('Average Life Span'), max_digits=50, decimal_places=3)
    interest_rate = models.DecimalField(_('Interest rate'), help_text="This is a percentage value.", validators=[validate_percentage], max_digits=50, decimal_places=3)
    yield_to_maturity = models.DecimalField(_('Yield To Maturity'), help_text="This is a percentage value.", validators=[validate_percentage], max_digits=50, decimal_places=3)
    nominal_value = models.DecimalField(_('Nominal Value'), max_digits=50, decimal_places=3)
    rate = models.DecimalField(_('Rate'), max_length=255)
    fair_value = models.DecimalField(_('Fair Value'), help_text="Value is in thousands.", max_digits=50, decimal_places=3)
    total_percentage_from_total_issued = models.DecimalField(_('Total Percentage From Total Issued'), help_text="This is a percentage value.", validators=[validate_percentage], max_digits=50, decimal_places=3)
    assets_rate_from_investment_channel = models.DecimalField(_('Assets Rate From Investment Channel'), help_text="This is a percentage value.", validators=[validate_percentage], max_digits=50, decimal_places=3)

    def save(self):
        self.fair_value = self.market_value * 1000
        super(NotNegotiableGovernmentCommitmentsCertificates, self).save()


class NotNegotiableCommercialDebtCertificates(Instrument):
    provide_information = models.CharField(_('Provide Information'), max_length=255)
    issuer_id = models.PositiveIntegerField(_('Issuer Id'))
    trading_sector = models.CharField(_('Trading Sector'), max_length=255)
    average_life_span = models.DecimalField(_('Average Life Span'), max_digits=50, decimal_places=3)
    interest_rate = models.DecimalField(_('Interest rate'), help_text="This is a percentage value.", validators=[validate_percentage], max_digits=50, decimal_places=3)
    yield_to_maturity = models.DecimalField(_('Yield To Maturity'), help_text="This is a percentage value.", validators=[validate_percentage], max_digits=50, decimal_places=3)
    nominal_value = models.DecimalField(_('Nominal Value'), max_digits=50, decimal_places=3)
    rate = models.DecimalField(_('Rate'), max_length=255)
    fair_value = models.DecimalField(_('Fair Value'), help_text="Value is in thousands.", max_digits=50, decimal_places=3)
    total_percentage_from_total_issued = models.DecimalField(_('Total Percentage From Total Issued'), help_text="This is a percentage value.", validators=[validate_percentage], max_digits=50, decimal_places=3)
    assets_rate_from_investment_channel = models.DecimalField(_('Assets Rate From Investment Channel'), help_text="This is a percentage value.", validators=[validate_percentage], max_digits=50, decimal_places=3)

    def save(self):
        self.fair_value = self.market_value * 1000
        super(NotNegotiableCommercialDebtCertificates, self).save()


class NotNegotiableCorporateBonds(Instrument):
    provide_information = models.CharField(_('Provide Information'), max_length=255)
    issuer_id = models.PositiveIntegerField(_('Issuer Id'))
    trading_sector = models.CharField(_('Trading Sector'), max_length=255)
    purchase_date = models.DateField(_('Purchase Date'))
    average_life_span = models.DecimalField(_('Average Life Span'), max_digits=50, decimal_places=3)
    interest_rate = models.DecimalField(_('Interest rate'), help_text="This is a percentage value.", validators=[validate_percentage], max_digits=50, decimal_places=3)
    yield_to_maturity = models.DecimalField(_('Yield To Maturity'), help_text="This is a percentage value.", validators=[validate_percentage], max_digits=50, decimal_places=3)
    nominal_value = models.DecimalField(_('Nominal Value'), max_digits=50, decimal_places=3)
    rate = models.DecimalField(_('Rate'), max_length=255)
    fair_value = models.DecimalField(_('Fair Value'), help_text="Value is in thousands.", max_digits=50, decimal_places=3)
    total_percentage_from_total_issued = models.DecimalField(_('Total Percentage From Total Issued'), help_text="This is a percentage value.", validators=[validate_percentage], max_digits=50, decimal_places=3)
    assets_rate_from_investment_channel = models.DecimalField(_('Assets Rate From Investment Channel'), help_text="This is a percentage value.", validators=[validate_percentage], max_digits=50, decimal_places=3)

    def save(self):
        self.fair_value = self.market_value * 1000
        super(NotNegotiableCorporateBonds, self).save()


class NotNegotiableStock():
    security_id = models.AutoField(_('Security Id'), primary_key=True)
    provide_information = models.CharField(_('Provide Information'), max_length=255)
    issuer_id = models.PositiveIntegerField(_('Issuer Id'))
    trading_sector = models.CharField(_('Trading Sector'), max_length=255)
    currency_type = models.CharField(_('Currency Type'), max_length=255)
    nominal_value = models.DecimalField(_('Nominal Value'), max_digits=50, decimal_places=3)
    rate = models.DecimalField(_('Rate'), max_length=255)
    fair_value = models.DecimalField(_('Fair Value'), help_text="Value is in thousands.", max_digits=50, decimal_places=3)
    total_percentage_from_total_issued = models.DecimalField(_('Total Percentage From Total Issued'), help_text="This is a percentage value.", validators=[validate_percentage], max_digits=50, decimal_places=3)
    assets_rate_from_investment_channel = models.DecimalField(_('Assets Rate From Investment Channel'), help_text="This is a percentage value.", validators=[validate_percentage], max_digits=50, decimal_places=3)
    total_percentage_from_investment_assets = models.DecimalField(_('Total Percentage From Investment Assets'), help_text="This is a percentage value.", validators=[validate_percentage], max_digits=50, decimal_places=3)

    def save(self):
        self.fair_value = self.market_value * 1000
        super(NotNegotiableStock, self).save()


class NotNegotiableInvestmentFunds(Instrument):
    purchase_date = models.DateField(_('Purchase Date'))
    nominal_value = models.DecimalField(_('Nominal Value'), max_digits=50, decimal_places=3)
    rate = models.DecimalField(_('Rate'), max_length=255)
    fair_value = models.DecimalField(_('Fair Value'), help_text="Value is in thousands.", max_digits=50, decimal_places=3)
    total_percentage_from_total_issued = models.DecimalField(_('Total Percentage From Total Issued'), help_text="This is a percentage value.", validators=[validate_percentage], max_digits=50, decimal_places=3)
    assets_rate_from_investment_channel = models.DecimalField(_('Assets Rate From Investment Channel'), help_text="This is a percentage value.", validators=[validate_percentage], max_digits=50, decimal_places=3)

    def save(self):
        self.fair_value = self.market_value * 1000
        super(NotNegotiableInvestmentFunds, self).save()


class NotNegotiableWarrants():
    security_id = models.AutoField(_('Security Id'), primary_key=True)
    trading_sector = models.CharField(_('Trading Sector'), max_length=255)
    currency_type = models.CharField(_('Currency Type'), max_length=255)
    purchase_date = models.DateField(_('Purchase Date'))
    nominal_value = models.DecimalField(_('Nominal Value'), max_digits=50, decimal_places=3)
    rate = models.DecimalField(_('Rate'), max_length=255)
    fair_value = models.DecimalField(_('Fair Value'), help_text="Value is in thousands.", max_digits=50, decimal_places=3)
    total_percentage_from_total_issued = models.DecimalField(_('Total Percentage From Total Issued'), help_text="This is a percentage value.", validators=[validate_percentage], max_digits=50, decimal_places=3)
    assets_rate_from_investment_channel = models.DecimalField(_('Assets Rate From Investment Channel'), help_text="This is a percentage value.", validators=[validate_percentage], max_digits=50, decimal_places=3)
    total_percentage_from_investment_assets = models.DecimalField(_('Total Percentage From Investment Assets'), help_text="This is a percentage value.", validators=[validate_percentage], max_digits=50, decimal_places=3)

    def save(self):
        self.fair_value = self.market_value * 1000
        super(NotNegotiableWarrants, self).save()


class NotNegotiableOptions():
    security_id = models.AutoField(_('Security Id'), primary_key=True)
    trading_sector = models.CharField(_('Trading Sector'), max_length=255)
    currency_type = models.CharField(_('Currency Type'), max_length=255)
    purchase_date = models.DateField(_('Purchase Date'))
    nominal_value = models.DecimalField(_('Nominal Value'), max_digits=50, decimal_places=3)
    rate = models.DecimalField(_('Rate'), max_length=255)
    fair_value = models.DecimalField(_('Fair Value'), help_text="Value is in thousands.", max_digits=50, decimal_places=3)
    total_percentage_from_total_issued = models.DecimalField(_('Total Percentage From Total Issued'), help_text="This is a percentage value.", validators=[validate_percentage], max_digits=50, decimal_places=3)
    assets_rate_from_investment_channel = models.DecimalField(_('Assets Rate From Investment Channel'), help_text="This is a percentage value.", validators=[validate_percentage], max_digits=50, decimal_places=3)
    total_percentage_from_investment_assets = models.DecimalField(_('Total Percentage From Investment Assets'), help_text="This is a percentage value.", validators=[validate_percentage], max_digits=50, decimal_places=3)

    def save(self):
        self.fair_value = self.market_value * 1000
        super(NotNegotiableOptions, self).save()


class NotNegotiableFutureContracts():
    security_id = models.AutoField(_('Security Id'), primary_key=True)
    trading_sector = models.CharField(_('Trading Sector'), max_length=255)
    currency_type = models.CharField(_('Currency Type'), max_length=255)
    purchase_date = models.DateField(_('Purchase Date'))
    nominal_value = models.DecimalField(_('Nominal Value'), max_digits=50, decimal_places=3)
    rate = models.DecimalField(_('Rate'), max_length=255)
    fair_value = models.DecimalField(_('Fair Value'), help_text="Value is in thousands.", max_digits=50, decimal_places=3)
    assets_rate_from_investment_channel = models.DecimalField(_('Assets Rate From Investment Channel'), help_text="This is a percentage value.", validators=[validate_percentage], max_digits=50, decimal_places=3)
    total_percentage_from_investment_assets = models.DecimalField(_('Total Percentage From Investment Assets'), help_text="This is a percentage value.", validators=[validate_percentage], max_digits=50, decimal_places=3)

    def save(self):
        self.fair_value = self.market_value * 1000
        super(NotNegotiableFutureContracts, self).save()


class NotNegotiableStructuredProducts(Instrument):
    base_asset = models.CharField(_('Base Asset'), max_length=255)
    purchase_date = models.DateField(_('Purchase Date'))
    average_life_span = models.DecimalField(_('Average Life Span'), max_digits=50, decimal_places=3)
    interest_rate = models.DecimalField(_('Interest rate'), help_text="This is a percentage value.", validators=[validate_percentage], max_digits=50, decimal_places=3)
    yield_to_maturity = models.DecimalField(_('Yield To Maturity'), help_text="This is a percentage value.", validators=[validate_percentage], max_digits=50, decimal_places=3)
    nominal_value = models.DecimalField(_('Nominal Value'), max_digits=50, decimal_places=3)
    rate = models.DecimalField(_('Rate'), max_length=255)
    fair_value = models.DecimalField(_('Fair Value'), help_text="Value is in thousands.", max_digits=50, decimal_places=3)
    total_percentage_from_total_issued = models.DecimalField(_('Total Percentage From Total Issued'), help_text="This is a percentage value.", validators=[validate_percentage], max_digits=50, decimal_places=3)
    assets_rate_from_investment_channel = models.DecimalField(_('Assets Rate From Investment Channel'), help_text="This is a percentage value.", validators=[validate_percentage], max_digits=50, decimal_places=3)

    def save(self):
        self.fair_value = self.market_value * 1000
        super(NotNegotiableStructuredProducts, self).save()


class Loans(Instrument):
    consortium = models.NullBooleanField(_('Consortium'))
    average_life_span = models.DecimalField(_('Average Life Span'), max_digits=50, decimal_places=3)
    average_interest_rate = models.DecimalField(_('Average Interest rate'), help_text="This is a percentage value.", validators=[validate_percentage], max_digits=50, decimal_places=3)
    yield_to_maturity = models.DecimalField(_('Yield To Maturity'), help_text="This is a percentage value.", validators=[validate_percentage], max_digits=50, decimal_places=3)
    nominal_value = models.DecimalField(_('Nominal Value'), max_digits=50, decimal_places=3)
    rate = models.DecimalField(_('Rate'), max_length=255)
    fair_value = models.DecimalField(_('Fair Value'), help_text="Value is in thousands.", max_digits=50, decimal_places=3)
    assets_rate_from_investment_channel = models.DecimalField(_('Assets Rate From Investment Channel'), help_text="This is a percentage value.", validators=[validate_percentage], max_digits=50, decimal_places=3)

    def save(self):
        self.fair_value = self.market_value * 1000
        super(Loans, self).save()


class DepositsOverThreeMonths(Instrument):
    issuer_id = models.PositiveIntegerField(_('Issuer Id'))
    average_life_span = models.DecimalField(_('Average Life Span'), max_digits=50, decimal_places=3)
    interest_rate = models.DecimalField(_('Interest rate'), help_text="This is a percentage value.", validators=[validate_percentage], max_digits=50, decimal_places=3)
    yield_to_maturity = models.DecimalField(_('Yield To Maturity'), help_text="This is a percentage value.", validators=[validate_percentage], max_digits=50, decimal_places=3)
    nominal_value = models.DecimalField(_('Nominal Value'), max_digits=50, decimal_places=3)
    rate = models.DecimalField(_('Rate'), max_length=255)
    fair_value = models.DecimalField(_('Fair Value'), help_text="Value is in thousands.", max_digits=50, decimal_places=3)
    assets_rate_from_investment_channel = models.DecimalField(_('Assets Rate From Investment Channel'), help_text="This is a percentage value.", validators=[validate_percentage], max_digits=50, decimal_places=3)

    def save(self):
        self.fair_value = self.market_value * 1000
        super(DepositsOverThreeMonths, self).save()


class LandRights(models.Model):
    last_valuation_date = models.DateField(_('Last Valuation Date'))
    property_type = models.CharField(_('Property Type'), max_length=255)
    yield_during_period = models.DecimalField(_('Yield During Period'), help_text="This is a percentage value.", validators=[validate_percentage], max_digits=50, decimal_places=3)
    estimated_value = models.DecimalField(_('Estimated Value'), help_text="Value is in thousands.", max_digits=50, decimal_places=3)
    assets_rate_from_investment_channel = models.DecimalField(_('Assets Rate From Investment Channel'), help_text="This is a percentage value.", validators=[validate_percentage], max_digits=50, decimal_places=3)
    total_percentage_from_investment_assets = models.DecimalField(_('Total Percentage From Investment Assets'), help_text="This is a percentage value.", validators=[validate_percentage], max_digits=50, decimal_places=3)

    def save(self):
        self.estimated_value = self.market_value * 1000
        super(LandRights, self).save()


class OtherInvestments(Instrument):
    interest_rate = models.DecimalField(_('Interest rate'), help_text="This is a percentage value.", validators=[validate_percentage], max_digits=50, decimal_places=3)
    yield_to_maturity = models.DecimalField(_('Yield To Maturity'), help_text="This is a percentage value.", validators=[validate_percentage], max_digits=50, decimal_places=3)
    fair_value = models.DecimalField(_('Fair Value'), help_text="Value is in thousands.", max_digits=50, decimal_places=3)
    assets_rate_from_investment_channel = models.DecimalField(_('Assets Rate From Investment Channel'), help_text="This is a percentage value.", validators=[validate_percentage], max_digits=50, decimal_places=3)
    total_percentage_from_investment_assets = models.DecimalField(_('Total Percentage From Investment Assets'), help_text="This is a percentage value.", validators=[validate_percentage], max_digits=50, decimal_places=3)

    def save(self):
        self.fair_value = self.market_value * 1000
        super(OtherInvestments, self).save()


class InvesteeCompanies(Instrument):
    interest_rate = models.DecimalField(_('Interest rate'), help_text="This is a percentage value.", validators=[validate_percentage], max_digits=50, decimal_places=3)
    yield_to_maturity = models.DecimalField(_('Yield To Maturity'), help_text="This is a percentage value.", validators=[validate_percentage], max_digits=50, decimal_places=3)
    fair_value = models.DecimalField(_('Fair Value'), help_text="Value is in thousands.", max_digits=50, decimal_places=3)
    assets_rate_from_investment_channel = models.DecimalField(_('Assets Rate From Investment Channel'), help_text="This is a percentage value.", validators=[validate_percentage], max_digits=50, decimal_places=3)

    def save(self):
        self.fair_value = self.market_value * 1000
        super(InvesteeCompanies, self).save()


class InvestmentCommitmentsBalance(models.Model):
    commitment_amount = models.DecimalField(_('Commitment Amount'), help_text="Value is in thousands.", max_digits=50, decimal_places=3)
    commitment_completion_date = models.DateField(_('Commitment Completion Date'))

    def save(self):
        self.commitment_amount = self.market_value * 1000
        super(InvestmentCommitmentsBalance, self).save()


class CorporateBondsAdjustedCost(Instrument):
    trading_sector = models.CharField(_('Trading Sector'), max_length=255)
    purchase_date = models.DateField(_('Purchase Date'))
    average_life_span = models.DecimalField(_('Average Life Span'), max_digits=50, decimal_places=3)
    interest_rate = models.DecimalField(_('Interest rate'), help_text="This is a percentage value.", validators=[validate_percentage], max_digits=50, decimal_places=3)
    effective_interest = models.DecimalField(_('Effective Interest'), help_text="This is a percentage value.", validators=[validate_percentage], max_digits=50, decimal_places=3)
    nominal_value = models.DecimalField(_('Nominal Value'), max_digits=50, decimal_places=3)
    adjusted_cost = models.DecimalField(_('Adjusted Cost'), help_text="Value is in thousands.", max_digits=50, decimal_places=3)
    total_percentage_from_total_issued = models.DecimalField(_('Total Percentage From Total Issued'), help_text="This is a percentage value.", validators=[validate_percentage], max_digits=50, decimal_places=3)
    assets_rate_from_investment_channel = models.DecimalField(_('Assets Rate From Investment Channel'), help_text="This is a percentage value.", validators=[validate_percentage], max_digits=50, decimal_places=3)

    def save(self):
        self.adjusted_cost = self.market_value * 1000
        super(TradableCorporateBondsAdjustedCost, self).save()


class NotNegotiableCorporateBondsAdjustedCost(Instrument):
    trading_sector = models.CharField(_('Trading Sector'), max_length=255)
    purchase_date = models.DateField(_('Purchase Date'))
    average_life_span = models.DecimalField(_('Average Life Span'), max_digits=50, decimal_places=3)
    interest_rate = models.DecimalField(_('Interest rate'), help_text="This is a percentage value.", validators=[validate_percentage], max_digits=50, decimal_places=3)
    effective_interest = models.DecimalField(_('Effective Interest'), help_text="This is a percentage value.", validators=[validate_percentage], max_digits=50, decimal_places=3)
    nominal_value = models.DecimalField(_('Nominal Value'), max_digits=50, decimal_places=3)
    adjusted_cost = models.DecimalField(_('Adjusted Cost'), help_text="Value is in thousands.", max_digits=50, decimal_places=3)
    total_percentage_from_total_issued = models.DecimalField(_('Total Percentage From Total Issued'), help_text="This is a percentage value.", validators=[validate_percentage], max_digits=50, decimal_places=3)
    assets_rate_from_investment_channel = models.DecimalField(_('Assets Rate From Investment Channel'), help_text="This is a percentage value.", validators=[validate_percentage], max_digits=50, decimal_places=3)

    def save(self):
        self.adjusted_cost = self.market_value * 1000
        super(NotNegotiableCorporateBondsAdjustedCost, self).save()


class BorrowersCreditAdjustedCost(Instrument):
    trading_sector = models.CharField(_('Trading Sector'), max_length=255)
    purchase_date = models.DateField(_('Purchase Date'))
    average_life_span = models.DecimalField(_('Average Life Span'), max_digits=50, decimal_places=3)
    interest_rate = models.DecimalField(_('Interest rate'), help_text="This is a percentage value.", validators=[validate_percentage], max_digits=50, decimal_places=3)
    effective_interest = models.DecimalField(_('Effective Interest'), help_text="This is a percentage value.", validators=[validate_percentage], max_digits=50, decimal_places=3)
    nominal_value = models.DecimalField(_('Nominal Value'), max_digits=50, decimal_places=3)
    adjusted_cost = models.DecimalField(_('Adjusted Cost'), help_text="Value is in thousands.", max_digits=50, decimal_places=3)
    total_percentage_from_total_issued = models.DecimalField(_('Total Percentage From Total Issued'), help_text="This is a percentage value.", validators=[validate_percentage], max_digits=50, decimal_places=3)
    assets_rate_from_investment_channel = models.DecimalField(_('Assets Rate From Investment Channel'), help_text="This is a percentage value.", validators=[validate_percentage], max_digits=50, decimal_places=3)

    def save(self):
        self.adjusted_cost = self.market_value * 1000
        super(BorrowersCreditAdjustedCost, self).save()
