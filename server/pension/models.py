from django.db import models
from django.utils.translation import ugettext_lazy as _


class Quarters(object):
    Q1 = 1
    Q2 = 2
    Q3 = 3
    Q4 = 4

    choices = (
        (Q1, _('First Quarter')),
        (Q2, _('Second Quarter')),
        (Q3, _('Third Quarter')),
        (Q4, _('Fourth Quarter')),
    )


class InstrumentType(object):
    NEGOTIABLE_SECURITY = 1
    NON_NEGOTIABLE_SECURITY = 2

    choices = (
        (NEGOTIABLE_SECURITY, _('Negotiable Security')),
        (NON_NEGOTIABLE_SECURITY, _('Non-Negotiable Security')),
    )

class Industry(object):
    UNDEFINED = 0
    PHARMA = 1
    HI_TECH = 2

    choices = (
        (UNDEFINED, _('Undefined')),
        (PHARMA, _('Pharma')),
        (HI_TECH, _('Hi-Tech')),
    )

class Currency(object):
    ISR = 1
    EUR = 2
    USD = 3
    CHF = 4
    GBP = 5

    choices = (
        (ISR, _('Israeli Shekel')),
        (EUR, _('European Euro')),
        (USD, _('USD')),
        (CHF, _('Swiss Frank')),
        (GBP, _('British Pound')),
    )
    
class Rating(object):
    """
    The different types of ratings that exist for instruments
    """
    UNDEFINED = 0
    D = 1
    C = 2
    CC = 3
    CCC_MINUS = 4
    CCC = 5
    CCC_PLUS = 6
    B_MINUS = 7
    B = 8
    B_PLUS = 9
    BB_MINUS = 10
    BB = 11
    BB_PLUS = 12
    BBB_MINUS = 13
    BBB = 14
    BBB_PLUS = 15
    A_MINUS = 16
    A = 17
    A_PLUS = 18
    AA_MINUS = 19
    AA = 20
    AA_PLUS = 21
    AAA = 22

    choices = (
        (UNDEFINED, _('UNDEFINED')),
        (D, _('D')),
        (C, _('C')),
        (CC, _('CC')),
        (CCC_MINUS, _('CCC-')),
        (CCC, _('CCC')),
        (CCC_PLUS, _('CCC+')),
        (B_MINUS, _('B-')),
        (B, _('B')),
        (B_PLUS, _('B+')),
        (BB_MINUS, _('BB-')),
        (BB, _('BB')),
        (BB_PLUS, _('BB+')),
        (BBB_MINUS, _('BBB-')),
        (BBB, _('BBB')),
        (BBB_PLUS, _('BBB+')),
        (A_MINUS, _('A-')),
        (A, _('A')),
        (A_PLUS, _('A+')),
        (AA_MINUS, _('AA-')),
        (AA, _('AA')),
        (AA_PLUS, _('AA+')),
        (AAA, _('AAA')),


            )

class Quarter(models.Model):
    year = models.IntegerField(default=None)
    quarter = models.IntegerField(choices=Quarters.choices)

    def __str__(self):
        return '{} / {}'.format(self.quarter, self.year)


class Fund(models.Model):
    label = models.CharField(max_length=200)

    def __str__(self):
        return self.label

class Issuer(models.Model):
    """
    Company (or other body) that issues a security.
    """
    label = models.CharField(max_length=200)

    def __str__(self):
        return self.label

class FundManagingBody(models.Model):
    """
    A fund can move from one ManagingBody to another, this model documents the
    moves.
    """
    fund = models.ForeignKey(Fund)
    managing_body = models.ForeignKey(Issuer)
    start = models.ForeignKey(Quarter, related_name='quarter_start')
    end = models.ForeignKey(Quarter, null=True, related_name='quarter_end')

    def __str__(self):
        return '{} / {} / {}'.format(
            self.managing_body,
            self.fund,
            '{} - {}'.format(self.start, self.end)
        )

class Instrument(models.Model):
    """
    Instrument is either a tradable issue (common stock, preferred stock, bond, etc.),
    or some sort of index (e.g. Tel-Aviv 25). Indices are indicated by is_tradable=False
    """
    label = models.CharField(max_length=200)
    issuer = models.ForeignKey(Issuer, null=True)
    instrument_type = models.IntegerField(choices=InstrumentType.choices)
    instrument_id = models.IntegerField(default=None)
    industry = models.IntegerField(choices=Industry.choices)
    currency = models.IntegerField(choices=Currency.choices)
    rating = models.IntegerField(choices=Rating.choices)
    is_tradable = models.BooleanField(default=True)

    def __str__(self):
        return '{} / {} / {} / {}'.format(
            self.instrument_type,
            self.instrument_id,
            self.issuer,
            self.label,
        )

class DerivativeCategory(object):
    PUT = 1
    CALL = 2

    choices = (
            (PUT, _('Put Option')),
            (CALL, _('Call Option')),
    )

class Derivative(models.Model):
    """
    A derivative is an instrument derived from a base asset
    (e.g. option, ETF, structured product, etc.)
    """
    instrument = models.OneToOneField(Instrument, related_name="Derivative_Extension") # Pointing to the derivative instrument itself
    base_asset = models.ForeignKey(Instrument)
    category = models.IntegerField(choices=DerivativeCategory.choices)

class Holding(models.Model):
    """
    The amount of an instrument held by a fund at a certain point in time.
    """
    instrument = models.ForeignKey(Instrument)
    fund = models.ForeignKey(FundManagingBody)
    quarter = models.ForeignKey(Quarter)
    fair_value = models.DecimalField(default=None, decimal_places=2, max_digits=16)

    def __str__(self):
        return '{} / {} / {} / {}'.format(
            self.instrument,
            self.fund,
            self.quarter,
            self.fair_value,
        )

