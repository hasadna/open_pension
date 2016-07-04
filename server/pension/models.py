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


class Quarter(models.Model):
    year = models.IntegerField(default=None)
    quarter = models.IntegerField(choices=Quarters.choices)

    def __str__(self):
        return '{} / {}'.format(self.quarter, self.year)


class ManagingBody(models.Model):
    """
    The body that owns the funds.
    """
    label = models.CharField(max_length=200)

    def __str__(self):
        return self.label


class Fund(models.Model):
    label = models.CharField(max_length=200)

    def __str__(self):
        return self.label


class FundManagingBody(models.Model):
    """
    A fund can move from one ManagingBody to another, this model documents the
    moves.
    """
    fund = models.ForeignKey(Fund)
    managing_body = models.ForeignKey(ManagingBody)
    start = models.ForeignKey(Quarter, related_name='quarter_start')
    end = models.ForeignKey(Quarter, null=True, related_name='quarter_end')

    def __str__(self):
        return '{} / {} / {}'.format(
            self.managing_body,
            self.fund,
            '{} - {}'.format(self.start, self.end)
        )


class Issuer(models.Model):
    """
    Company (or other body) that issues a security.
    """
    label = models.CharField(max_length=200)

    def __str__(self):
        return self.label


class Instrument(models.Model):
    """
    E.g. common stock, preferred stock, bond, etc.
    """
    label = models.CharField(max_length=200)
    issuer = models.ForeignKey(Issuer, null=True)
    instrument_type = models.IntegerField(choices=InstrumentType.choices)
    instrument_id = models.IntegerField(default=None)

    def __str__(self):
        return '{} / {} / {} / {}'.format(
            self.instrument_type,
            self.instrument_id,
            self.issuer,
            self.label,
        )


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


class ManagingBodyData(object):
    managing_body = models.ForeignKey(ManagingBody)
    fair_value_sum = 0
    relative_value = 0
