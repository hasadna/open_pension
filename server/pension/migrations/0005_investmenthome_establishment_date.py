# -*- coding: utf-8 -*-
# Generated by Django 1.9.5 on 2016-09-12 18:19
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pension', '0004_auto_20160910_1436'),
    ]

    operations = [
        migrations.AddField(
            model_name='investmenthome',
            name='establishment_date',
            field=models.DateField(default=1),
            preserve_default=False,
        ),
    ]
