class Cash(Instrument):
    """
    Cash entity.
    """
    fair_value_percentage = models.IntegerField(_('fair_value_percentage'))

    class Meta:
        verbose_name = _('Cash')
        verbose_name_plural = _('Cash')

class Bond(Instrument):
    """
    Bond entity.
    """

    class Meta:
        verbose_name = _('Bond')
        verbose_name_plural = _('Bond')

class GovernmentBond(Instrument):
    """
    GovernmentBond entity.
    """

    # == Security ==
    # security_name
    # security_number
    # rating=
    # rating_cause
    # currency
    # interest_rate_percentage
    # yield_to_maturity_percentage
    # rate_of_investment_assets_percentages

    # average_life_span_years = ''
    # denominated_value = ''
    # exchange_rate_agurot = ''
    # market_value_thousands_shekels = ''
    # denomination_rate_percentage = ''
    # exchange_rate_agurot = ''

    class Meta:
        verbose_name = _('GovernmentBond')
        verbose_name_plural = _('GovernmentBond')

class CommercialBond(Instrument):
    """
    CommercialBond entity.
    """
    # == Security ==
    # security_name
    # security_number
    # rating=
    # rating_cause
    # currency
    # interest_rate_percentage
    # yield_to_maturity_percentage
    # exchange_rate_agurot
    # market_value_thousands_shekels

    # average_life_span_years
    # denominated_value
    # exchange_rate_agurot
    # market_value_thousands_shekels
    # denomination_rate_percentage
    # investment_assets_rate

    class Meta:
        verbose_name = _('CommercialBond')
        verbose_name_plural = _('CommercialBond')

class CorporateBond(Instrument):
    """
    CorporateBond entity.
    """
    # == Security ==
    # security_name
    # security_number
    # rating=
    # rating_cause
    # currency
    # interest_rate_percentage
    # yield_to_maturity_percentage
    # exchange_rate_agurot
    # market_value_thousands_shekels

    # average_life_span_years
    # denominated_value
    # exchange_rate_agurot
    # market_value_thousands_shekels
    # denomination_rate_percentage
    # investment_assets_rate

    class Meta:
        verbose_name = _('CorporateBond')
        verbose_name_plural = _('CorporateBond')

class Share(Instrument):
    """
    CorporateBond entity.
    """

    # == Security ==
    # security_name
    # security_number
    # currency
    # interest_rate_percentage
    # yield_to_maturity_percentage
    # exchange_rate_agurot
    # market_value_thousands_shekels

    # NOT
    # rating
    # rating_cause

    class Meta:
        verbose_name = _('Share')
        verbose_name_plural = _('Share')