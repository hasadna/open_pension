# -*- coding: utf-8 -*-
# Generated by Django 1.9.5 on 2016-05-07 13:10
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pension', '0005_holding_fair_value'),
    ]

    operations = [
        migrations.AlterField(
            model_name='instrument',
            name='instrument_type',
            field=models.CharField(max_length=200),
        ),
    ]
