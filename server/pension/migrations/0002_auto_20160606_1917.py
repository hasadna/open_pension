# -*- coding: utf-8 -*-
# Generated by Django 1.9.5 on 2016-06-06 16:17
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pension', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='quarter',
            name='quarter',
            field=models.PositiveIntegerField(choices=[(1, 'First Quarter'), (2, 'Second Quarter'), (3, 'Third Quarter'), (4, 'Fourth Quarter')]),
        ),
        migrations.AlterField(
            model_name='quarter',
            name='year',
            field=models.PositiveIntegerField(default=None),
        ),
    ]
