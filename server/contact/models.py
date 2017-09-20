from django.db import models


class ContactRequest(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField('name', max_length=255, unique=False)
    email = models.EmailField('email', max_length=255, unique=False)
    content = models.TextField('content', blank=True)
    timestamp = models.DateTimeField(auto_now=True)

    def __str__(self):
        return "{0}-{1}".format(self.timestamp, self.name)

    class Meta:
        verbose_name = 'Contact Request'
        verbose_name_plural = 'Contact Requests'
