from django.db import models
from django.utils.translation import ugettext_lazy as _


class NumberType(object):
    choices = (
        ('int', _('Integer')),
        ('float', _('Float')),
    )


class Example(models.Model):
    """
    Example entity.
    """
    title = models.CharField(_('title'), max_length=255, blank=True)
    number = models.CharField(_('number'), max_length=25, choices=NumberType.choices, default='int')
    REQUIRED_FIELDS = ['title', ]

    class Meta:
        verbose_name = _('Example')
        verbose_name_plural = _('Examples')
