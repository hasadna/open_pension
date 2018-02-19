# -*- coding: utf-8 -*-
<<<<<<< HEAD
# Generated by Django 1.11.3 on 2018-01-16 14:13
=======
# Generated by Django 1.11.4 on 2017-09-20 08:05
>>>>>>> master
from __future__ import unicode_literals

import colorful.fields
from django.db import migrations, models
import django.db.models.deletion
import pension.models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Instrument',
            fields=[
                ('auto_id', models.AutoField(primary_key=True, serialize=False, verbose_name='Auto Id')),
                ('instrument_type', models.CharField(max_length=255, verbose_name='Instrument Type')),
                ('instrument_id', models.CharField(blank=True, max_length=255, verbose_name='Instrument Id')),
                ('fund_name', models.CharField(blank=True, max_length=255, verbose_name='Fund Name')),
                ('fund_id', models.CharField(blank=True, max_length=255, verbose_name='Fund Id')),
                ('issuer_id', models.CharField(blank=True, max_length=255, verbose_name='Issuer Id')),
                ('issuer_name', models.CharField(blank=True, max_length=255, verbose_name='Issuer Name')),
                ('rating', models.CharField(blank=True, max_length=255, verbose_name='Rating')),
                ('rating_agency', models.CharField(blank=True, max_length=255, verbose_name='Rating Agency')),
                ('currency', models.CharField(blank=True, max_length=255, verbose_name='Currency')),
                ('interest_rate', models.DecimalField(decimal_places=3, help_text='This is a percentage value.', max_digits=50, null=True, validators=[pension.models.validate_percentage], verbose_name='Interest Rate')),
                ('yield_to_maturity', models.DecimalField(decimal_places=3, help_text='This is a percentage value.', max_digits=50, null=True, validators=[pension.models.validate_percentage], verbose_name='Yield To Maturity')),
                ('par_value', models.DecimalField(decimal_places=3, help_text='Value is in thousands.', max_digits=50, null=True, verbose_name='Par Value')),
                ('market_cap', models.DecimalField(decimal_places=3, help_text='Value is in thousands.', max_digits=50, null=True, verbose_name='Market Cap')),
                ('rate_of_investment_channel', models.DecimalField(decimal_places=3, help_text='This is a percentage value.', max_digits=50, null=True, validators=[pension.models.validate_percentage], verbose_name='Rate Of Investment Channel')),
                ('rate_of_fund', models.DecimalField(decimal_places=3, help_text='This is a percentage value.', max_digits=50, null=True, validators=[pension.models.validate_percentage], verbose_name='Rate Of Fund')),
                ('trading_floor', models.CharField(blank=True, max_length=255, verbose_name='Trading Floor')),
                ('date_of_purchase', models.CharField(blank=True, max_length=255, verbose_name='Date Of Purchase')),
                ('average_of_duration', models.DecimalField(decimal_places=3, max_digits=50, null=True, verbose_name='Average Of Duration')),
                ('rate', models.DecimalField(decimal_places=3, max_digits=50, null=True, verbose_name='Rate')),
                ('rate_of_ipo', models.DecimalField(decimal_places=3, help_text='This is a percentage value.', max_digits=50, null=True, validators=[pension.models.validate_percentage], verbose_name='Rate Of IPO')),
                ('informer', models.CharField(blank=True, max_length=255, verbose_name='Informer')),
                ('fair_value', models.DecimalField(decimal_places=3, help_text='Value is in thousands.', max_digits=50, null=True, verbose_name='Fair Value')),
                ('activity_industry', models.CharField(blank=True, max_length=255, verbose_name='Activity Industry')),
                ('date_of_revaluation', models.DateField(verbose_name='Date Of Revaluation')),
                ('type_of_asset', models.CharField(blank=True, max_length=255, verbose_name='Type Of Asset')),
                ('rate_of_return_during_period', models.DecimalField(decimal_places=3, max_digits=50, null=True, verbose_name='Rate of Return During Period')),
                ('return_on_equity', models.DecimalField(decimal_places=3, help_text='This is a percentage value.', max_digits=50, null=True, validators=[pension.models.validate_percentage], verbose_name='Return On Equity')),
                ('liabilities', models.DecimalField(decimal_places=3, help_text='Value is in thousands.', max_digits=50, null=True, verbose_name='Liabilities')),
                ('expiry_date_of_liabilities', models.DateField(null=True, verbose_name='Expiry Date Of Liabilities')),
                ('effective_rate', models.DecimalField(decimal_places=3, help_text='This is a percentage value.', max_digits=50, null=True, validators=[pension.models.validate_percentage], verbose_name='Effective Rate')),
                ('coordinated_cost', models.DecimalField(decimal_places=3, help_text='Value is in thousands.', max_digits=50, null=True, verbose_name='Coordinated Cost')),
                ('underlying_asset', models.CharField(blank=True, max_length=255, verbose_name='Underlying Asset')),
                ('consortium', models.NullBooleanField(verbose_name='Consortium')),
                ('average_rate', models.DecimalField(decimal_places=3, help_text='This is a percentage value.', max_digits=50, null=True, validators=[pension.models.validate_percentage], verbose_name='Average Rate')),
                ('estimated_value', models.DecimalField(decimal_places=3, help_text='Value is in thousands.', max_digits=50, null=True, verbose_name='Estimated Value')),
                ('managing_body', models.CharField(choices=[('AS', 'Altshuler Shaham'), ('YL', 'Yelin Lapidot'), ('CLL', 'Clal Insurance'), ('AMT', 'Amitim'), ('MTD', 'Meitav Dash'), ('FNX', 'Phoenix'), ('HRL', 'Harel'), ('MNR', 'Menora Mivtachim'), ('MGD', 'Migdal'), ('PSG', 'Psagot'), ('XNS', 'Excellence')], max_length=255, verbose_name='Managing Body')),
                ('geographical_location', models.CharField(choices=[('IL', 'Israel'), ('ABR', 'Abroad')], max_length=255, null=True, verbose_name='Geographical Location')),
                ('instrument_sub_type', models.CharField(choices=[('CASH', 'Cash'), ('GDC', 'Government Debt Certificates'), ('CDC', 'Commercial Debt Certificates'), ('CB', 'Corporate Bonds'), ('STOCK', 'Stock'), ('IF', 'Investment Funds'), ('ETF', 'ETF'), ('MF', 'Mutual Funds'), ('WARRANTS', 'Warrants'), ('OPTIONS', 'Options'), ('FC', 'Future Contracts'), ('SP', 'Structured Products'), ('LOANS', 'Loans'), ('DOTM', 'Deposits Over Three Months'), ('LR', 'Land Rights'), ('OI', 'Other Investments'), ('IC', 'Investee Companies'), ('ICB', 'Investment Commitments Balance'), ('CBAC', 'Corporate Bonds Adjusted Cost'), ('BCAC', 'Borrowers Credit Adjusted Cost')], max_length=255, verbose_name='Instrument Sub Type')),
                ('negotiable', models.NullBooleanField(verbose_name='Negotiable')),
            ],
            options={
                'verbose_name': 'Instrument',
                'verbose_name_plural': 'Instruments',
            },
        ),
        migrations.CreateModel(
            name='InstrumentFields',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('fields_to_show', models.CharField(choices=[('base', 'Base'), ('currency', 'Currency'), ('informer', 'Informer'), ('activity_industry', 'Activity Industry'), ('type_of_asset', 'Type Of Asset'), ('consortium', 'Consortium'), ('managing_body', 'Managing Body'), ('geographical_location', 'Geographical Location'), ('instrument_sub_type', 'Instrument Sub Type')], max_length=255, verbose_name='Fields To Show')),
                ('color', colorful.fields.RGBColorField()),
            ],
            options={
<<<<<<< HEAD
                'verbose_name': 'Instrument Fields',
                'verbose_name_plural': 'Instrument Fields',
=======
                'verbose_name': 'Instrument Field',
                'verbose_name_plural': 'Instruments Fields',
>>>>>>> master
            },
        ),
        migrations.CreateModel(
            name='Quarter',
            fields=[
                ('quarter_id', models.AutoField(primary_key=True, serialize=False)),
                ('year', models.CharField(choices=[('2018', '2018'), ('2017', '2017'), ('2016', '2016'), ('2015', '2015'), ('2014', '2014'), ('2013', '2013'), ('2012', '2012')], max_length=225, verbose_name='Year')),
                ('month', models.CharField(choices=[('1', '01'), ('2', '02'), ('3', '03'), ('4', '04')], max_length=225, verbose_name='Month')),
            ],
            options={
                'verbose_name': 'Quarter',
                'verbose_name_plural': 'Quarters',
            },
        ),
        migrations.AddField(
            model_name='instrument',
            name='quarter',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='instrument_quarter', to='pension.Quarter'),
        ),
    ]
