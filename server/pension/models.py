import uuid

from django.db import models
from ckeditor.fields import RichTextField
from django.utils.translation import ugettext_lazy as _


class Security(models.Model):
    """
    Security entity.
    """
    security_name = models.CharField(_('security_name'), max_length=255, blank=True)
    security_number = models.IntegerField(_('security_number'))
    rating = models.CharField(_('rating'), max_length=255)
    rating_cause = models.CharField(_('rating_cause'), max_length=255)
    currency = models.CharField(_('currency'), max_length=255)
    interest_rate_percentage = models.IntegerField(_('interest_rate_percentage'))
    yield_to_maturity_percentage = models.IntegerField(_('yield_to_maturity_percentage'))
    rate_of_investment_assets_percentages = models.IntegerField(_('rate_of_investment_assets_percentages'))

    class Meta:
        verbose_name = _('Security')
        verbose_name_plural = _('Security')

class Bond(Security):
    """
    Bond entity.
    """

    average_life_span_years = models.IntegerField(_('average_life_span_years'))
    denominated_value = models.IntegerField(_('denominated_value'))
    exchange_rate_agurot = models.IntegerField(_('exchange_rate_agurot'))
    market_value_thousands_shekels = models.IntegerField(_('market_value_thousands_shekels'))
    denomination_rate_percentage = models.IntegerField(_('denomination_rate_percentage'))
    exchange_rate_agurot = models.IntegerField(_('exchange_rate_agurot'))

    class Meta:
        verbose_name = _('Bond')
        verbose_name_plural = _('Bond')



# ======================================================================================


class Tags(models.Model):
    name = models.CharField(_('tag'), max_length=255, unique=True)

    def __str__(self):
        return "{0}".format(self.name)

    class Meta:
        verbose_name = _('Tag')
        verbose_name_plural = _('Tags')


class Blog(models.Model):
    """
    A blog post entity.
    """
    unique_id = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    title = models.CharField(_('title'), max_length=255, blank=True)
    body = RichTextField(_('body'), blank=True)
    author = models.CharField(_('author'), max_length=255, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    publish = models.DateTimeField(_('publish'), null=True)
    tags = models.ManyToManyField(Tags, _('tags'), blank=True)
    REQUIRED_FIELDS = ['title', 'body', 'publish']
