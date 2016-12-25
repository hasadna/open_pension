import uuid

from django.db import models
from ckeditor.fields import RichTextField
from django.utils.translation import ugettext_lazy as _

class ManagingBody(models.Model):
    name = models.CharField(_('name'), max_length=255, blank=False, unique=True)

    # amitim, clal, menora, migdal, psagot, harel, other

    class Meta:
        verbose_name = _('ManagingBody')
        verbose_name_plural = _('ManagingBody')

class Quarter(models.Model):
    year = models.IntegerField(_('year'), max_length=4, blank=False)
    year_quarter = models.IntegerField(_('year_quarter'), blank=False)

    class Meta:
        verbose_name = _('Quarter')
        verbose_name_plural = _('Quarter')

class AssetType():
    # see sheet for values
    pass

class ActivityIndustry():
    # see sheet for values
    pass

class Currency():
    # see sheet for values
    pass

class Rating():
    # prime, high, upper_medium, lower_medium, speculative, highly_speculative, risk
    pass

class Security(models.Model):
    """
    Model representing a Security, but not the holding of a Security by a ManagingBody
    """
    name = models.CharField(_('name'), max_length=255, null=True)
    security_number = models.IntegerField('security_number')
    asset_type = models.CharField('asset_type', max_length=255, null=True)
    rating = models.CharField('rating', max_length=255, null=True)
    rater = models.CharField('rater', max_length=255)
    currency = models.CharField('currency', max_length=255, choices=[])
    activity_industry = models.IntegerField('activity_industry', choices=[])
    life_span = models.IntegerField('average_life_span_years')
    interest_rate = models.IntegerField('interest_rate')
    rate_of_ipo = models.IntegerField('rate_of_ipo')
    fair_value = models.IntegerField('fair_value')

    liquidity = models.BooleanField('liquidity')
    geographical_location = models.CharField('geographical_location', max_length=255)
    reference_type = models.CharField('reference_type', max_length=255)
    # local_context?

    def __str__(self):
        """
        String for representing the Model object.
        """
        return self.name

    class Meta:
        verbose_name = _('Security')
        verbose_name_plural = _('Security')
        ordering = ["name"]

class Holding(models.Model):
    managing_body = models.ManyToManyField(ManagingBody, _('name'), max_length=255, blank=True)
    quarter = models.ManyToManyField(Quarter, _('quarter'))
    security_name = models.ManyToManyField(Security, _('name'), max_length=255, blank=True)

    acquisition_date = models.IntegerField(_('acquisition_date'))
    market_cap = models.IntegerField(_('market_cap'))       # thousand nis
    par_value = models.IntegerField(_('par_value'))         # percentage of the security of total investment of fund
    linkage_type = models.IntegerField(_('linkage_type'))   # percentage of the security held by fund out of total issues amount
    part_of_total_investment = models.IntegerField(_('part_of_total_investment'))

    exchange_rate_agorot = models.IntegerField(_('exchange_rate_agorot'))

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
