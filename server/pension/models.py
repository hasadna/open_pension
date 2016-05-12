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
        (TYPE1, _('?????? ??? ??????')),
        (TYPE2, _('aaaa')),
    )

    def get_choice(self, choice_str):
        i=0
        for i in range(len(self.choices)):
            if InstrumentType.choices[i][1] == choice_str:
                return self.choices[i][0]
            i = i+1

class Quarter(models.Model):
    year = models.IntegerField(default=2000)
    quarter = models.IntegerField(choices=Quarters.choices)


class ManagingBody(models.Model):
    label = models.CharField(max_length=200)


class Fund(models.Model):
    label = models.CharField(max_length=200)
    managing_body = models.ForeignKey(ManagingBody)


class Instrument(models.Model):
    label = models.CharField(max_length=200)
    # instrument_type = models.IntegerField(choices=InstrumentType.choices)
    instrument_type = models.CharField(max_length=200)
    instrument_id = models.IntegerField(default=0)


class Holding(models.Model):
    """
    Represents a combination of: managing_body, fund, instrument (id).
    """
    instrument = models.ForeignKey(Instrument)
    fund = models.ForeignKey(Fund)
    quarter = models.ForeignKey(Quarter)
    fair_value = models.DecimalField(default=0, decimal_places=2, max_digits=16)

