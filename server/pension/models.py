import uuid

from django.db import models
from ckeditor.fields import RichTextField
from django.utils.translation import ugettext_lazy as _

class Security(models.Model):
    name = models.CharField(_('name'), max_length=255, blank=True)
    security_number = models.IntegerField('security_number')
    asset_type = models.CharField('asset_type', max_length=255, blank=True)  # type like cash, government-bond, commercial-bond, etc
    rating = models.CharField(_('rating'), max_length=255)                      # not for Share
    rater = models.CharField(_('rater'), max_length=255)                        # not for Share
    currency = models.CharField(_('currency'), max_length=255)
    interest_rate_percentage = models.IntegerField(_('interest_rate_percentage'))
    yield_to_maturity_percentage = models.IntegerField(_('yield_to_maturity_percentage'))

    # values below not for Cash
    activity_industry = models.IntegerField(_('activity_industry'))
    average_life_span_years = models.IntegerField(_('average_life_span_years'))
    exchange_rate_agorot = models.IntegerField(_('exchange_rate_agorot'))
    fair_value = models.IntegerField(_('fair_value'))

    class Meta:
        verbose_name = _('Instrument')
        verbose_name_plural = _('Instrument')

class ManagingBody(models.Model):
    name = models.CharField(_('name'), max_length=255, blank=False, unique=True)

    class Meta:
        verbose_name = _('ManagingBody')
        verbose_name_plural = _('ManagingBody')

class Quarter(models.Model):
    year = models.IntegerField(_('year'), max_length=4, blank=False)
    year_quarter = models.IntegerField(_('year_quarter'), max_length=1, blank=False)

    class Meta:
        verbose_name = _('Quarter')
        verbose_name_plural = _('Quarter')

class Holding(models.Model):
    managing_body_name = models.ManyToManyField(ManagingBody, _('name'), max_length=255, blank=True)   # FK
    quarter = models.ManyToManyField(Quarter, _('quarter'), max_length=255, blank=True)            # FK
    security_name = models.ManyToManyField(Security, _('name'), max_length=255, blank=True)        # FK

    par_value = models.IntegerField(_('par_value'))   # how much the company holds of the security
    par_value_percentage = models.IntegerField(_('par_value_percentage'))    # percentage of the security amount of the total of all securities the managingbody holds
    market_cap_thousands_nis = models.IntegerField(_('market_cap_thousands_nis'))
    investment_assets_rate = models.IntegerField(_('investment_assets_rate'))


    class Meta:
        verbose_name = _('Holding')
        verbose_name_plural = _('Holding')



# ==========================================

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
