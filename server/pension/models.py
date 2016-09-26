from django.db import models
from django.utils.translation import ugettext_lazy as _


class NumberType(object):
    choices = (
        ('int', _('Integer')),
        ('float', _('Float')),
    )


class Example(models.Model):
    """
    Example enttiy.
    """
    title = models.CharField(max_length=255, blank=True)
    number = models.CharField(max_length=25, choices=NumberType.choices, default='int')
    REQUIRED_FIELDS = ['title',]
