import os
import glob
import pandas as pd
from django.utils import timezone

from django.core.management import BaseCommand, CommandError
from pension.models import Quarter, Instrument

managing_body_dict = {
    'amitim': 'AMT',
    'as': 'AS',
    'clal': 'CLL',
    'ds': 'MTD',
    'yl': 'YL',
    'fnx': 'FNX',
    'fenix': 'FNX',
    'harel': 'HRL',
    'menoramivt': 'MNR',
    'menora': 'MNR',
    'migdal': 'MGD',
    'psagot': 'PSG',
    'xnes': 'XNS',
}

instrument_dict = {
    'מזומנים': 'CASH',
    'פקדונות': 'CASH',
    'תעודות התחייבות ממשלתיות': 'GDC',
    'תעודות חוב מסחריות': 'CDC',
    'אג"ח קונצרני': 'CB',
    'מניות': 'STOCK',
    'תעודות סל': 'ETF',
    'קרנות נאמנות': 'MF',
    'תעודות השתתפות בקרנות נאמנות': 'MF',
    'קרנות השקעה': 'MF',
    'כתבי אופציה': 'WARRANTS',
    'אופציות': 'OPTIONS',
    'חוזים עתידיים': 'FC',
    'מוצרים מובנים': 'SP',
    'לא סחיר - תעודות התחייבות ממשלתי': 'GDC',
    'לא סחיר - תעודות חוב מסחריות': 'CDC',
    'לא סחיר - אג״ח קונצרני': 'CB',
    'לא סחיר - מניות': 'STOCK',
    'לא סחיר - קרנות השקעה': 'IF',
    'לא סחיר - כתבי אופציה': 'WARRANTS',
    'לא סחיר - אופציות': 'OPTIONS',
    'לא סחיר - חוזים עתידיים': 'FC',
    'לא סחיר - מוצרים מובנים': 'SP',
    'הלוואות': 'LOANS',
    'פקדונות מעל 3 חודשים': 'DOTM',
    'זכויות מקרקעין': 'LR',
    'השקעות אחרות': 'OI',
    'השקעה בחברות מוחזקות': 'IC',
    'יתרת התחיבות להשקעה': 'ICB',
    'עלות מותאמת אג"ח קונצרני סחיר': 'CBAC',
    'עלות מותאמת אג"ח קונצרני לא סחיר': 'CBAC',
    'עלות מותאמת מסגרות אשראי ללווים ': 'BCAC',
}


class Command(BaseCommand):
    def handle(self, *args, **options):
        print('Importing..')
        data_csv = pd.read_csv('/Users/nirgalon/Downloads/pension_data_all.csv', index_col=False, header=0)

        # Read the content of the sheet
        for index, managing_body in enumerate(data_csv['managing_body']):
            quarter = Quarter.objects.get_or_create(
                year=data_csv['report_year'][index],
                month=data_csv['report_qurater'][index],
            )

            if data_csv['liquidity'][index] == 'סחיר':
                negotiable = 1
            else:
                negotiable = 0

            if str(data_csv['date_of_revaluation'][index]) == 'nan':
                date_of_revaluation = timezone.now()
            else:
                date_of_revaluation = data_csv['date_of_revaluation'][index]

            instrument, created = Instrument.objects.get_or_create(
                fund_name=data_csv['fund'][index],
                fund_id=data_csv['fund_name'][index],
                issuer_id=data_csv['instrument_id'][index],
                issuer_name=data_csv['instrument_name'][index],
                rating=data_csv['rating'][index],
                rating_agency=data_csv['rating_agency'][index],
                currency=data_csv['currency'][index],
                interest_rate=data_csv['intrest_rate'][index],
                yield_to_maturity=data_csv['yield'][index],
                market_cap=float(data_csv['market_cap'][index]),
                rate_of_investment_channel=0.00,
                rate_of_fund=data_csv['rate_of_fund'][index],
                trading_floor='',
                date_of_purchase=data_csv['date_of_purchase'][index],
                average_of_duration=data_csv['average_of_duration'][index],
                rate=data_csv['rate'][index],
                rate_of_ipo=data_csv['rate_of_ipo'][index],
                informer='',
                fair_value=data_csv['fair_value'][index],
                activity_industry=data_csv['activity_industry'][index],
                date_of_revaluation=date_of_revaluation,
                type_of_asset=data_csv['type_of_asset'][index],
                return_on_equity=0.00,
                liabilities=0.00,
                expiry_date_of_liabilities=timezone.now(),
                effective_rate=0.00,
                coordinated_cost=0.00,
                underlying_asset=data_csv['underlying_asset'][index],
                consortium=False,
                average_rate=0.00,
                par_value=data_csv['par_value'][index],
                managing_body=managing_body_dict[managing_body],
                geographical_location='IL',
                instrument_sub_type=instrument_dict[data_csv['asset_type'][index]],
                negotiable=negotiable,
                quarter=quarter[0],
            )
            print('Finish to import {index} row!'.format(index=index))

        print('Finish with {filename}'.format(filename=filename))
