from django.db import models
from django.core.exceptions import ValidationError
from django.utils.translation import ugettext_lazy as _

from pension.choices import YEARS, MONTHS, MANAGING_BODIES, GEOGRAPHICAL_LOCATION


# managing_body = models.CharField('Managing Body', max_length=255, choices=MANAGING_BODIES)
# geographical_location = models.CharField('Geographical Location', max_length=255, choices=GEOGRAPHICAL_LOCATION)


def validate_percentage(value):
    if 0 > value > 100:
        raise ValidationError(
            _('%(value)s is not a percentage (less then 0 or more then 100)'),
            params={'value': value},
        )


class Quarter(models.Model):
    year = models.PositiveIntegerField(_('Year'), choices=YEARS)
    month = models.PositiveIntegerField(_('Month'), choices=MONTHS)


class Bonds(models.Model):
    name = models.CharField(_('Name'), max_length=255)
    id = models.PositiveIntegerField(_('Id'))
    currency = models.CharField(_('Currency'), max_length=255)
    nominal_value = models.DecimalField(_('Nominal Value'), max_digits=50, decimal_places=3)
    exchange_rate = models.DecimalField(_('Exchange Rate'), max_digits=50, decimal_places=3)


class MarketableBonds(Bonds):
    market_value = models.DecimalField(_('Market Value'), help_text="Value is in thousands.",
                                       max_digits=50, decimal_places=3)
    issued_par_rate = models.DecimalField(_('Issued Par Rate'), help_text="This is a percentage value.",
                                          validators=[validate_percentage], max_digits=50, decimal_places=3)
    investment_assets_rate = models.DecimalField(_('Investment Assets Rate'), help_text="This is a percentage value.",
                                                 validators=[validate_percentage], max_digits=50, decimal_places=3)


class RatedMarketableBonds(models.Model):
    rate = models.CharField(_('Rate'), max_length=255)
    rating_name = models.CharField(_('Rating Name'), max_length=255)


class ExtendedMarketableBonds(models.Model):
    average_life_span = models.DecimalField(_('Average Life Span'), max_digits=50, decimal_places=3)
    interest_rate = models.DecimalField(_('Interest Rate'), help_text="This is a percentage value.",
                                        validators=[validate_percentage], max_digits=50, decimal_places=3)
    yield_to_maturity = models.DecimalField(_('Yield To Maturity'), help_text="This is a percentage value.",
                                            validators=[validate_percentage], max_digits=50, decimal_places=3)


class PurchasableDateBonds(models.Model):
    purchase_date = models.DateField(_('Purchase Date'))


class ActivityIndustryBonds(models.Model):
    activity_industry = models.CharField(_('Activity Industry'), max_length=255)


class CashAndDeposit(Quarter, RatedMarketableBonds):
    name = models.CharField(_('Name'), max_length=255)
    id = models.PositiveIntegerField(_('Id'))
    currency = models.CharField(_('Currency'), max_length=255)
    interest_rate = models.DecimalField(_('Interest Rate'), help_text="This is a percentage value.",
                                        validators=[validate_percentage], max_digits=50, decimal_places=3)
    yield_to_maturity = models.DecimalField(_('Yield To Maturity'), help_text="This is a percentage value.",
                                            validators=[validate_percentage], max_digits=50, decimal_places=3)
    market_value = models.DecimalField(_('Market Value'), help_text="Value is in thousands.",
                                       max_digits=50, decimal_places=3)
    investment_assets_rate = models.DecimalField(_('Investment Assets Rate'), help_text="This is a percentage value.",
                                                 validators=[validate_percentage], max_digits=50, decimal_places=3)

    class Meta:
        verbose_name = _('Cash And Deposit')
        verbose_name_plural = _('Cash And Deposit')


class GovernmentBonds(Quarter, ExtendedMarketableBonds, MarketableBonds, RatedMarketableBonds):
    class Meta:
        verbose_name = _('Government Bonds')
        verbose_name_plural = _('GovernmentBonds')


class CommercialBonds(Quarter, ExtendedMarketableBonds, MarketableBonds, RatedMarketableBonds, ActivityIndustryBonds):
    class Meta:
        verbose_name = _('Commercial Bonds')
        verbose_name_plural = _('Commercial Bonds')


class CorporateBonds(Quarter, ExtendedMarketableBonds, MarketableBonds, RatedMarketableBonds, ActivityIndustryBonds):
    class Meta:
        verbose_name = _('Corporate Bonds')
        verbose_name_plural = _('Corporate Bonds')


class Shares(Quarter, MarketableBonds, ActivityIndustryBonds):
    class Meta:
        verbose_name = _('Shares')
        verbose_name_plural = _('Shares')


class ETF(Quarter, MarketableBonds):
    class Meta:
        verbose_name = _('ETF')
        verbose_name_plural = _('ETF')


class TrustFunds(Quarter, MarketableBonds, RatedMarketableBonds, ActivityIndustryBonds):
    class Meta:
        verbose_name = _('Trust Funds')
        verbose_name_plural = _('Trust Funds')


class OptionWarrants(Quarter, MarketableBonds, ActivityIndustryBonds):
    class Meta:
        verbose_name = _('Option Warrants')
        verbose_name_plural = _('Option Warrants')


class Options(Quarter, MarketableBonds, ActivityIndustryBonds):
    class Meta:
        verbose_name = _('Options')
        verbose_name_plural = _('Options')


class Futures(Quarter, Bonds, ActivityIndustryBonds):
    class Meta:
        verbose_name = _('Futures')
        verbose_name_plural = _('Futures')


class StructuredProducts(Quarter, ExtendedMarketableBonds, MarketableBonds, RatedMarketableBonds, PurchasableDateBonds):
    base_asset = models.CharField(_('Base Asset'), max_length=255)

    class Meta:
        verbose_name = _('Structured Products')
        verbose_name_plural = _('Structured Products')


class NotNegotiableGovernmentBonds(Quarter, ExtendedMarketableBonds, MarketableBonds, RatedMarketableBonds,
                                   PurchasableDateBonds):
    class Meta:
        verbose_name = _('Not Negotiable Government Bonds')
        verbose_name_plural = _('Not Negotiable GovernmentBonds')


class NotNegotiableCommercialBonds(Quarter, ExtendedMarketableBonds, MarketableBonds, RatedMarketableBonds,
                                   PurchasableDateBonds, ActivityIndustryBonds):
    class Meta:
        verbose_name = _('Not Negotiable Commercial Bonds')
        verbose_name_plural = _('Not Negotiable Commercial Bonds')


class NotNegotiableCorporateBonds(Quarter, ExtendedMarketableBonds, MarketableBonds, RatedMarketableBonds,
                                  PurchasableDateBonds, ActivityIndustryBonds):
    class Meta:
        verbose_name = _('Not Negotiable Corporate Bonds')
        verbose_name_plural = _('Not Negotiable Corporate Bonds')


class NotNegotiableShares(Quarter, MarketableBonds, ActivityIndustryBonds):
    class Meta:
        verbose_name = _('Not Negotiable Shares')
        verbose_name_plural = _('Not Negotiable Shares')


class NotNegotiableInvestmentFunds(Quarter, MarketableBonds, PurchasableDateBonds, ActivityIndustryBonds):
    class Meta:
        verbose_name = _('Not Negotiable Investment Funds')
        verbose_name_plural = _('Not Negotiable Investment Funds')


class NotNegotiableOptionWarrants(Quarter, MarketableBonds, PurchasableDateBonds, ActivityIndustryBonds):
    class Meta:
        verbose_name = _('Not Negotiable Option Warrants')
        verbose_name_plural = _('Not Negotiable Option Warrants')


class NotNegotiableOptions(Quarter, MarketableBonds, PurchasableDateBonds, ActivityIndustryBonds):
    class Meta:
        verbose_name = _('Not Negotiable Options')
        verbose_name_plural = _('Not Negotiable Options')


class NotNegotiableFutures(Quarter, Bonds, PurchasableDateBonds, ActivityIndustryBonds):
    market_value = models.DecimalField(_('Market Value'), help_text="Value is in thousands.",
                                       max_digits=50, decimal_places=3)
    investment_assets_rate = models.DecimalField(_('Investment Assets Rate'), help_text="This is a percentage value.",
                                                 validators=[validate_percentage], max_digits=50, decimal_places=3)

    class Meta:
        verbose_name = _('Not Negotiable Futures')
        verbose_name_plural = _('Not Negotiable Futures')


class NotNegotiableStructuredProducts(Quarter, ExtendedMarketableBonds, MarketableBonds, RatedMarketableBonds,
                                      PurchasableDateBonds):
    base_asset = models.CharField(_('Base Asset'), max_length=255)

    class Meta:
        verbose_name = _('Not Negotiable Structured Products')
        verbose_name_plural = _('Not Negotiable Structured Products')


class Loans(Quarter, Bonds, ExtendedMarketableBonds, RatedMarketableBonds):
    market_value = models.DecimalField(_('Market Value'), help_text="Value is in thousands.",
                                       max_digits=50, decimal_places=3)
    investment_assets_rate = models.DecimalField(_('Investment Assets Rate'), help_text="This is a percentage value.",
                                                 validators=[validate_percentage], max_digits=50, decimal_places=3)

    class Meta:
        verbose_name = _('Loans')
        verbose_name_plural = _('Loans')


class DepositsOverThreeMonths(Quarter, models.Model):
    pass

    class Meta:
        verbose_name = _('Deposits Over Three Months')
        verbose_name_plural = _('Deposits Over Three Months')


class LandRights(Quarter, models.Model):
    pass

    class Meta:
        verbose_name = _('Land Rights')
        verbose_name_plural = _('Land Rights')


class OtherInvestments(Quarter, models.Model):
    pass

    class Meta:
        verbose_name = _('Other Investments')
        verbose_name_plural = _('Other Investments')


class InvestmentsBalance(Quarter, models.Model):
    pass

    class Meta:
        verbose_name = _('Investments Balance')
        verbose_name_plural = _('Investments Balance')


class CostCoordinatedCorporateBonds(Quarter, MarketableBonds, RatedMarketableBonds, PurchasableDateBonds,
                                    ActivityIndustryBonds):
    average_life_span = models.DecimalField(_('Average Life Span'), max_digits=50, decimal_places=3)
    effective_interest_rate = models.DecimalField(_('Effective Interest Rate'), max_digits=50, decimal_places=3)

    class Meta:
        verbose_name = _('Corporate Bonds')
        verbose_name_plural = _('Corporate Bonds')


class NotNegotiableCostCoordinatedCorporateBonds(Quarter, MarketableBonds, RatedMarketableBonds, PurchasableDateBonds,
                                                 ActivityIndustryBonds):
    average_life_span = models.DecimalField(_('Average Life Span'), max_digits=50, decimal_places=3)
    effective_interest_rate = models.DecimalField(_('Effective Interest Rate'), max_digits=50, decimal_places=3)

    class Meta:
        verbose_name = _('Not Negotiable Corporate Bonds')
        verbose_name_plural = _('Not Negotiable Corporate Bonds')


class UnusedFramesBorrowers(Quarter, models.Model):
    pass

    class Meta:
        verbose_name = _('Unused Frames Borrowers')
        verbose_name_plural = _('Unused Frames Borrowers')
