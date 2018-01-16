# -*- coding: utf-8 -*-
# Generated by Django 1.11.3 on 2018-01-16 14:31
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pension', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='instrument',
            name='rating',
            field=models.CharField(blank=True, choices=[('aaa_plus', 'AAA+'), ('aaa', 'AAA'), ('aaa_minus', 'AAA-'), ('aa_plus', 'AA+'), ('aa', 'AA'), ('aa_minus', 'AA-'), ('a_plus', 'A+'), ('a', 'A'), ('a_minus', 'A-'), ('bbb_plus', 'BBB+'), ('bbb', 'BBB'), ('bbb_minus', 'BBB-'), ('bb_plus', 'BB+'), ('bb', 'BB'), ('bb_minus', 'BB-'), ('b_plus', 'B+'), ('b', 'B'), ('b_minus', 'B-'), ('ccc_plus', 'CCC+'), ('ccc', 'CCC'), ('ccc_minus', 'CCC-'), ('cc_plus', 'CC+'), ('cc', 'CC'), ('cc_minus', 'CC-'), ('c_plus', 'C+'), ('c', 'C'), ('c_minus', 'C-'), ('ddd_plus', 'DDD+'), ('ddd', 'DDD'), ('ddd_minus', 'DDD-'), ('dd_plus', 'DD+'), ('dd', 'DD'), ('dd_minus', 'DD-'), ('d_plus', 'D+'), ('d', 'D'), ('d_minus', 'D-'), ('s_and_p', 'S&P'), ('cost', 'From Cost'), ('internal', 'Internal'), ('no_report', 'No report')], max_length=255, verbose_name='Rating'),
        ),
    ]
