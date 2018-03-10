import uuid

from django.db import models
from ckeditor.fields import RichTextField
from django.utils.translation import ugettext_lazy as _


class Tags(models.Model):
    name = models.CharField(_('tag'), max_length=255, unique=True)

    def __str__(self):
        return "{0}".format(self.name)

    class Meta:
        verbose_name = _('Tag')
        verbose_name_plural = _('Tags')


class Post(models.Model):
    """
    A blog post entity.
    """
    unique_id = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    title = models.CharField(_('Title'), max_length=255, blank=True)
    body = RichTextField(_('Body'), blank=True)
    share_image = models.CharField(_('Share Image'), max_length=255, blank=True)
    author = models.CharField(_('Author'), max_length=255, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    publish = models.DateTimeField(_('Publish'), null=True)
    tags = models.ManyToManyField(Tags, _('Tags'), blank=True)
    REQUIRED_FIELDS = ['title', 'body', 'publish']

    class Meta:
        verbose_name = _('Post')
        verbose_name_plural = _('Posts')
