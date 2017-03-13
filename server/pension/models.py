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


# class OldBonds(models.Model):
#     bonds_id = models.AutoField(primary_key=True)
#     name = models.CharField(_('Name'), max_length=255)
#     bond_id = models.PositiveIntegerField(_('Bond Id'))
#     currency = models.CharField(_('Currency'), max_length=255)
#     nominal_value = models.DecimalField(_('Nominal Value'), max_digits=50, decimal_places=3)
#     exchange_rate = models.DecimalField(_('Exchange Rate'), max_digits=50, decimal_places=3)
#     marketable_bonds_id = models.AutoField(primary_key=True)
#     issued_par_rate = models.DecimalField(_('Issued Par Rate'), help_text="This is a percentage value.",
#                                           validators=[validate_percentage], max_digits=50, decimal_places=3)
#     investment_assets_rate = models.DecimalField(_('Investment Assets Rate'), help_text="This is a percentage value.",
#                                                  validators=[validate_percentage], max_digits=50, decimal_places=3)
#     rated_marketable_bonds_id = models.AutoField(primary_key=True)
#     rate = models.CharField(_('Rate'), max_length=255)
#     rating_name = models.CharField(_('Rating Name'), max_length=255)
#     extended_marketable_bonds_id = models.AutoField(primary_key=True)
#     average_life_span = models.DecimalField(_('Average Life Span'), max_digits=50, decimal_places=3)
#     interest_rate = models.DecimalField(_('Interest Rate'), help_text="This is a percentage value.",
#                                          validators=[validate_percentage], max_digits=50, decimal_places=3)
#     yield_to_maturity = models.DecimalField(_('Yield To Maturity'), help_text="This is a percentage value.",
#                                              validators=[validate_percentage], max_digits=50, decimal_places=3)
#     purchasable_date_bonds_id = models.AutoField(primary_key=True)
#     purchase_date = models.DateField(_('Purchase Date'))
#     activity_industry_bonds_id = models.AutoField(primary_key=True)
#     activity_industry = models.CharField(_('Activity Industry'), max_length=255)


class Cash(models.Model):
    security_id = models.AutoField(_('Security Id'), primary_key=True)
    issuer_id = models.PositiveIntegerField(_('Issuer Id'))
    rating = models.CharField(_('Rating'), max_length=255)
    rating_company = models.CharField(_('Rating'), max_length=255)
    currency_type = models.CharField(_('Currency Type'), max_length=255)
    interest_rate = models.DecimalField(_('Interest rate'), help_text="This is a percentage value.", validators=[validate_percentage], max_digits=50, decimal_places=3)
    yield_to_maturity = models.DecimalField(_('Yield To Maturity'), help_text="This is a percentage value.", validators=[validate_percentage], max_digits=50, decimal_places=3)
    market_value = models.DecimalField(_('Market Value'), help_text="Value is in thousands.", max_digits=50, decimal_places=3)
    investment_assets_rate = models.DecimalField(_('Investment Assets Rate'), help_text="This is a percentage value.", validators=[validate_percentage], max_digits=50, decimal_places=3)
    total_percentage_from_investment_assets = models.DecimalField(_('Total Percentage From Investment Assets'), help_text="This is a percentage value.", validators=[validate_percentage], max_digits=50, decimal_places=3)

    def save(self):
        self.market_value = self.market_value * 1000
        super(Cash, self).save()


class GovernmentDebtCertificates(models.Model):
    security_id = models.AutoField(_('Security Id'), primary_key=True)
    market_place = models.CharField(_('Market Place'), max_length=255)
    rating = models.CharField(_('Rating'), max_length=255)
    rating_company = models.CharField(_('Rating'), max_length=255)
    purchase_date = models.DateField(_('Purchase Date'))
    average_life_span = models.DecimalField(_('Average Life Span'), max_digits=50, decimal_places=3)
    currency_type = models.CharField(_('Currency Type'), max_length=255)
    interest_rate = models.DecimalField(_('Interest rate'), help_text="This is a percentage value.", validators=[validate_percentage], max_digits=50, decimal_places=3)
    yield_to_maturity = models.DecimalField(_('Yield To Maturity'), help_text="This is a percentage value.", validators=[validate_percentage], max_digits=50, decimal_places=3)
    nominal_value = models.DecimalField(_('Nominal Value'), max_digits=50, decimal_places=3)
    rate = models.DecimalField(_('Rate'), max_length=255)
    market_value = models.DecimalField(_('Market Value'), help_text="Value is in thousands.", max_digits=50, decimal_places=3)
    total_percentage_from_total_issued = models.DecimalField(_('Total Percentage From Total Issued'), help_text="This is a percentage value.", validators=[validate_percentage], max_digits=50, decimal_places=3)
    assets_rate_from_investment_channel = models.DecimalField(_('Assets Rate From Investment Channel'), help_text="This is a percentage value.", validators=[validate_percentage], max_digits=50, decimal_places=3)
    total_percentage_from_investment_assets = models.DecimalField(_('Total Percentage From Investment Assets'), help_text="This is a percentage value.", validators=[validate_percentage], max_digits=50, decimal_places=3)

    def save(self):
        self.market_value = self.market_value * 1000
        super(GovernmentDebtCertificates, self).save()

class CommercialDebtCertificates(models.Model):
    security_id = models.AutoField(_('Security Id'), primary_key=True)
    market_place = models.CharField(_('Market Place'), max_length=255)
    provide_information = models.CharField(_('Provide Information'), max_length=255)
    issuer_id = models.PositiveIntegerField(_('Issuer Id'))
    trading_sector = models.CharField(_('Trading Sector'), max_length=255)
    rating = models.CharField(_('Rating'), max_length=255)
    rating_company = models.CharField(_('Rating'), max_length=255)
    purchase_date = models.DateField(_('Purchase Date'))
    average_life_span = models.DecimalField(_('Average Life Span'), max_digits=50, decimal_places=3)
    currency_type = models.CharField(_('Currency Type'), max_length=255)
    interest_rate = models.DecimalField(_('Interest rate'), help_text="This is a percentage value.", validators=[validate_percentage], max_digits=50, decimal_places=3)
    yield_to_maturity = models.DecimalField(_('Yield To Maturity'), help_text="This is a percentage value.", validators=[validate_percentage], max_digits=50, decimal_places=3)
    market_value = models.DecimalField(_('Market Value'), help_text="Value is in thousands.", max_digits=50, decimal_places=3)
    rate = models.DecimalField(_('Rate'), max_length=255)
    market_value = models.DecimalField(_('Market Value'), help_text="Value is in thousands.", max_digits=50, decimal_places=3)
    total_percentage_from_total_issued = models.DecimalField(_('Total Percentage From Total Issued'), help_text="This is a percentage value.", validators=[validate_percentage], max_digits=50, decimal_places=3)
    assets_rate_from_investment_channel = models.DecimalField(_('Assets Rate From Investment Channel'), help_text="This is a percentage value.", validators=[validate_percentage], max_digits=50, decimal_places=3)
    total_percentage_from_investment_assets = models.DecimalField(_('Total Percentage From Investment Assets'), help_text="This is a percentage value.", validators=[validate_percentage], max_digits=50, decimal_places=3)

class CorporateBonds(models.Model):
    security_id = models.AutoField(_('Security Id'), primary_key=True)
    market_place = models.CharField(_('Market Place'), max_length=255)
    provide_information = models.CharField(_('Provide Information'), max_length=255)
    issuer_id = models.PositiveIntegerField(_('Issuer Id'))
    trading_sector = models.CharField(_('Trading Sector'), max_length=255)
    rating = models.CharField(_('Rating'), max_length=255)
    rating_company = models.CharField(_('Rating'), max_length=255)
    purchase_date = models.DateField(_('Purchase Date'))
    average_life_span = models.DecimalField(_('Average Life Span'), max_digits=50, decimal_places=3)
    currency_type = models.CharField(_('Currency Type'), max_length=255)
    interest_rate = models.DecimalField(_('Interest rate'), help_text="This is a percentage value.", validators=[validate_percentage], max_digits=50, decimal_places=3)
    yield_to_maturity = models.DecimalField(_('Yield To Maturity'), help_text="This is a percentage value.", validators=[validate_percentage], max_digits=50, decimal_places=3)
    market_value = models.DecimalField(_('Market Value'), help_text="Value is in thousands.", max_digits=50, decimal_places=3)
    rate = models.DecimalField(_('Rate'), max_length=255)
    market_value = models.DecimalField(_('Market Value'), help_text="Value is in thousands.", max_digits=50, decimal_places=3)
    total_percentage_from_total_issued = models.DecimalField(_('Total Percentage From Total Issued'), help_text="This is a percentage value.", validators=[validate_percentage], max_digits=50, decimal_places=3)
    assets_rate_from_investment_channel = models.DecimalField(_('Assets Rate From Investment Channel'), help_text="This is a percentage value.", validators=[validate_percentage], max_digits=50, decimal_places=3)
    total_percentage_from_investment_assets = models.DecimalField(_('Total Percentage From Investment Assets'), help_text="This is a percentage value.", validators=[validate_percentage], max_digits=50, decimal_places=3)

class Stock(models.Model):
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

class ETF(models.Model):
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

class MutualFunds(models.Model):
    security_id = models.AutoField(_('Security Id'), primary_key=True)
    market_place = models.CharField(_('Market Place'), max_length=255)
    issuer_id = models.PositiveIntegerField(_('Issuer Id'))
    trading_sector = models.CharField(_('Trading Sector'), max_length=255)
    rating = models.CharField(_('Rating'), max_length=255)
    rating_company = models.CharField(_('Rating'), max_length=255)
    currency_type = models.CharField(_('Currency Type'), max_length=255)
    nominal_value = models.DecimalField(_('Nominal Value'), max_digits=50, decimal_places=3)
    rate = models.DecimalField(_('Rate'), max_length=255)
    market_value = models.DecimalField(_('Market Value'), help_text="Value is in thousands.", max_digits=50, decimal_places=3)
    total_percentage_from_total_issued = models.DecimalField(_('Total Percentage From Total Issued'), help_text="This is a percentage value.", validators=[validate_percentage], max_digits=50, decimal_places=3)
    assets_rate_from_investment_channel = models.DecimalField(_('Assets Rate From Investment Channel'), help_text="This is a percentage value.", validators=[validate_percentage], max_digits=50, decimal_places=3)
    total_percentage_from_investment_assets = models.DecimalField(_('Total Percentage From Investment Assets'), help_text="This is a percentage value.", validators=[validate_percentage], max_digits=50, decimal_places=3)

class Warrants(models.Model):
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

class Options(models.Model):
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

class FutureContracts(models.Model):
    security_id = models.AutoField(_('Security Id'), primary_key=True)
    market_place = models.CharField(_('Market Place'), max_length=255)
    trading_sector = models.CharField(_('Trading Sector'), max_length=255)
    currency_type = models.CharField(_('Currency Type'), max_length=255)
    nominal_value = models.DecimalField(_('Nominal Value'), max_digits=50, decimal_places=3)
    rate = models.DecimalField(_('Rate'), max_length=255)
    market_value = models.DecimalField(_('Market Value'), help_text="Value is in thousands.", max_digits=50, decimal_places=3)
    assets_rate_from_investment_channel = models.DecimalField(_('Assets Rate From Investment Channel'), help_text="This is a percentage value.", validators=[validate_percentage], max_digits=50, decimal_places=3)
    total_percentage_from_investment_assets = models.DecimalField(_('Total Percentage From Investment Assets'), help_text="This is a percentage value.", validators=[validate_percentage], max_digits=50, decimal_places=3)

class StructuredProducts(models.Model):
    security_id = models.AutoField(_('Security Id'), primary_key=True)
    base_asset = models.CharField(_('Base Asset'), max_length=255)
    rating = models.CharField(_('Rating'), max_length=255)
    rating_company = models.CharField(_('Rating'), max_length=255)
    purchase_date = models.DateField(_('Purchase Date'))
    average_life_span = models.DecimalField(_('Average Life Span'), max_digits=50, decimal_places=3)
    currency_type = models.CharField(_('Currency Type'), max_length=255)
    interest_rate = models.DecimalField(_('Interest rate'), help_text="This is a percentage value.", validators=[validate_percentage], max_digits=50, decimal_places=3)
    yield_to_maturity = models.DecimalField(_('Yield To Maturity'), help_text="This is a percentage value.", validators=[validate_percentage], max_digits=50, decimal_places=3)
    nominal_value = models.DecimalField(_('Nominal Value'), max_digits=50, decimal_places=3)
    rate = models.DecimalField(_('Rate'), max_length=255)
    market_value = models.DecimalField(_('Market Value'), help_text="Value is in thousands.", max_digits=50, decimal_places=3)
    total_percentage_from_total_issued = models.DecimalField(_('Total Percentage From Total Issued'), help_text="This is a percentage value.", validators=[validate_percentage], max_digits=50, decimal_places=3)
    assets_rate_from_investment_channel = models.DecimalField(_('Assets Rate From Investment Channel'), help_text="This is a percentage value.", validators=[validate_percentage], max_digits=50, decimal_places=3)
    total_percentage_from_investment_assets = models.DecimalField(_('Total Percentage From Investment Assets'), help_text="This is a percentage value.", validators=[validate_percentage], max_digits=50, decimal_places=3)

class NotNegotiableGovernmentCommitmentsCertificates(models.Model):
    security_id = models.AutoField(_('Security Id'), primary_key=True)
    rating = models.CharField(_('Rating'), max_length=255)
    rating_company = models.CharField(_('Rating'), max_length=255)
    purchase_date = models.DateField(_('Purchase Date'))
    average_life_span = models.DecimalField(_('Average Life Span'), max_digits=50, decimal_places=3)
    currency_type = models.CharField(_('Currency Type'), max_length=255)
    interest_rate = models.DecimalField(_('Interest rate'), help_text="This is a percentage value.", validators=[validate_percentage], max_digits=50, decimal_places=3)
    yield_to_maturity = models.DecimalField(_('Yield To Maturity'), help_text="This is a percentage value.", validators=[validate_percentage], max_digits=50, decimal_places=3)
    nominal_value = models.DecimalField(_('Nominal Value'), max_digits=50, decimal_places=3)
    rate = models.DecimalField(_('Rate'), max_length=255)
    market_value = models.DecimalField(_('Market Value'), help_text="Value is in thousands.", max_digits=50, decimal_places=3)
    total_percentage_from_total_issued = models.DecimalField(_('Total Percentage From Total Issued'), help_text="This is a percentage value.", validators=[validate_percentage], max_digits=50, decimal_places=3)
    assets_rate_from_investment_channel = models.DecimalField(_('Assets Rate From Investment Channel'), help_text="This is a percentage value.", validators=[validate_percentage], max_digits=50, decimal_places=3)
    total_percentage_from_investment_assets = models.DecimalField(_('Total Percentage From Investment Assets'), help_text="This is a percentage value.", validators=[validate_percentage], max_digits=50, decimal_places=3)

class NotNegotiableCommercialDebtCertificates(models.Model):
    security_id = models.AutoField(_('Security Id'), primary_key=True)
    provide_information = models.CharField(_('Provide Information'), max_length=255)
    issuer_id = models.PositiveIntegerField(_('Issuer Id'))
    trading_sector = models.CharField(_('Trading Sector'), max_length=255)
    rating = models.CharField(_('Rating'), max_length=255)
    rating_company = models.CharField(_('Rating'), max_length=255)
    average_life_span = models.DecimalField(_('Average Life Span'), max_digits=50, decimal_places=3)
    currency_type = models.CharField(_('Currency Type'), max_length=255)
    interest_rate = models.DecimalField(_('Interest rate'), help_text="This is a percentage value.", validators=[validate_percentage], max_digits=50, decimal_places=3)
    yield_to_maturity = models.DecimalField(_('Yield To Maturity'), help_text="This is a percentage value.", validators=[validate_percentage], max_digits=50, decimal_places=3)
    nominal_value = models.DecimalField(_('Nominal Value'), max_digits=50, decimal_places=3)
    rate = models.DecimalField(_('Rate'), max_length=255)
    market_value = models.DecimalField(_('Market Value'), help_text="Value is in thousands.", max_digits=50, decimal_places=3)
    total_percentage_from_total_issued = models.DecimalField(_('Total Percentage From Total Issued'), help_text="This is a percentage value.", validators=[validate_percentage], max_digits=50, decimal_places=3)
    assets_rate_from_investment_channel = models.DecimalField(_('Assets Rate From Investment Channel'), help_text="This is a percentage value.", validators=[validate_percentage], max_digits=50, decimal_places=3)
    total_percentage_from_investment_assets = models.DecimalField(_('Total Percentage From Investment Assets'), help_text="This is a percentage value.", validators=[validate_percentage], max_digits=50, decimal_places=3)

class NotNegotiableCorporateBonds(models.Model):
    security_id = models.AutoField(_('Security Id'), primary_key=True)
    provide_information = models.CharField(_('Provide Information'), max_length=255)
    issuer_id = models.PositiveIntegerField(_('Issuer Id'))
    trading_sector = models.CharField(_('Trading Sector'), max_length=255)
    rating = models.CharField(_('Rating'), max_length=255)
    rating_company = models.CharField(_('Rating'), max_length=255)
    purchase_date = models.DateField(_('Purchase Date'))
    average_life_span = models.DecimalField(_('Average Life Span'), max_digits=50, decimal_places=3)
    currency_type = models.CharField(_('Currency Type'), max_length=255)
    interest_rate = models.DecimalField(_('Interest rate'), help_text="This is a percentage value.", validators=[validate_percentage], max_digits=50, decimal_places=3)
    yield_to_maturity = models.DecimalField(_('Yield To Maturity'), help_text="This is a percentage value.", validators=[validate_percentage], max_digits=50, decimal_places=3)
    nominal_value = models.DecimalField(_('Nominal Value'), max_digits=50, decimal_places=3)
    rate = models.DecimalField(_('Rate'), max_length=255)
    market_value = models.DecimalField(_('Market Value'), help_text="Value is in thousands.", max_digits=50, decimal_places=3)
    total_percentage_from_total_issued = models.DecimalField(_('Total Percentage From Total Issued'), help_text="This is a percentage value.", validators=[validate_percentage], max_digits=50, decimal_places=3)
    assets_rate_from_investment_channel = models.DecimalField(_('Assets Rate From Investment Channel'), help_text="This is a percentage value.", validators=[validate_percentage], max_digits=50, decimal_places=3)
    total_percentage_from_investment_assets = models.DecimalField(_('Total Percentage From Investment Assets'), help_text="This is a percentage value.", validators=[validate_percentage], max_digits=50, decimal_places=3)

class NotNegotiableStock(models.Model):
    security_id = models.AutoField(_('Security Id'), primary_key=True)
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

class NotNegotiableInvestmentFunds(models.Model):
    security_id = models.AutoField(_('Security Id'), primary_key=True)
    currency_type = models.CharField(_('Currency Type'), max_length=255)
    purchase_date = models.DateField(_('Purchase Date'))
    nominal_value = models.DecimalField(_('Nominal Value'), max_digits=50, decimal_places=3)
    rate = models.DecimalField(_('Rate'), max_length=255)
    market_value = models.DecimalField(_('Market Value'), help_text="Value is in thousands.", max_digits=50, decimal_places=3)
    total_percentage_from_total_issued = models.DecimalField(_('Total Percentage From Total Issued'), help_text="This is a percentage value.", validators=[validate_percentage], max_digits=50, decimal_places=3)
    assets_rate_from_investment_channel = models.DecimalField(_('Assets Rate From Investment Channel'), help_text="This is a percentage value.", validators=[validate_percentage], max_digits=50, decimal_places=3)
    total_percentage_from_investment_assets = models.DecimalField(_('Total Percentage From Investment Assets'), help_text="This is a percentage value.", validators=[validate_percentage], max_digits=50, decimal_places=3)
