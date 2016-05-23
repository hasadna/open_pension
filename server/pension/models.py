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
    TYPE1 = 1
    TYPE2 = 2

    choices = (
        (TYPE1, _('')),
        (TYPE2, _('')),
    )


class Quarter(models.Model):
    year = models.IntegerField
    quarter = models.IntegerField(choices=Quarters.choices)


class ManagingBody(models.Model):
    ''' The body that owns the funds '''
    label = models.CharField(max_length=200)

    def __str__(self):
        return self.label


class Fund(models.Model):
    label = models.CharField(max_length=200)

class FundManagingBody(models.Model):
    ''' A fund can move from one ManagingBody to another. This model documents the moves '''
    fund = models.ForeignKey(Fund)
    managing_body = models.ForeignKey(ManagingBody)
    start = models.ForeignKey(Quarter)
    end = models.ForeignKey(Quarter, null=True)

class Issuer(models.Model):
    ''' Company (or other body) that issues a security '''
    label = models.CharField(max_length=200)

class Instrument(models.Model):
    ''' E.g. common stock, preferred stock, bond, etc. '''
    label = models.CharField(max_length=200)
    instrument_type = models.IntegerField(choices=InstrumentType.choices)
    instrument_id = models.IntegerField


class Holding(models.Model):
    """
    The amount of an instrument held by a fund at a certain point in time
    """
    instrument = models.ForeignKey(Instrument)
    fund = models.ForeignKey(FundManagingBody)
    quarter = models.ForeignKey(Quarter)
    fair_value = models.DecimalField

