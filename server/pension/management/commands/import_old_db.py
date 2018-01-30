import pandas as pd
from django.utils import timezone

from django.core.management import BaseCommand
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

rating_dict = {
    'AAA+': 'AAA+',
    'AAA': 'AAA',
    'AAA-': 'AAA-',
    'AA+': 'AA+',
    'AA': 'AA',
    'AA-': 'AA-',
    'A+': 'A+',
    'A': 'A',
    'A-': 'A-',
    'BBB+': 'BBB+',
    'BBB': 'BBB',
    'BBB-': 'BBB-',
    'BB+': 'BB+',
    'BB': 'BB',
    'BB-': 'BB-',
    'B+': 'B+',
    'B': 'B',
    'B-': 'B-',
    'CCC+': 'CCC+',
    'CCC': 'CCC',
    'CCC-': 'CCC-',
    'CC+': 'CC+',
    'CC': 'CC',
    'CC-': 'CC-',
    'C+': 'C+',
    'C': 'C',
    'C-': 'C-',
    'DDD+': 'DDD+',
    'DDD': 'DDD',
    'DDD-': 'DDD-',
    'DD+': 'DD+',
    'DD': 'DD',
    'DD-': 'DD-',
    'D+': 'D+',
    'D': 'D',
    'D-': 'D-',
    'S&P': 'S&P',
    'לא מדורג': 'Not Rated',
    'מעלות': 'From Cost',
    'פנימי': 'Internal',
    'לא דווח': 'No report',
}

instrument_sub_type_dict = {
    'תעודות התחייבות ממשלתיות': 'GDC',
    'תעודות חוב מסחריות': 'CDC',
    'אג"ח קונצרני': 'CB',
    'מניות': 'STOCK',
    'קרנות השקעה': 'IF',
    'תעודות סל': 'ETF',
    'קרנות נאמנות': 'MF',
    'כתבי אופציה': 'WARRANTS',
    'אופציות': 'OPTIONS',
    'חוזים עתידיים': 'FC',
    'מוצרים מובנים': 'SP',
}

instrument_type_dict = {
    'מזומנים': 'CASH',
    'ניירות ערך סחירים': 'MS',
    'ניירות ערך לא סחירים': 'NMS',
    'פקדונות': 'DE',
    'פקדונות': 'DE',
    'הלוואות': 'LOANS',
}


class Command(BaseCommand):
    def handle(self, *args, **options):
        print('Importing..')
        filename = 'pension_data_all.csv'
        data_csv = pd.read_csv(
            '/Users/nirgalon/Downloads/{filename}'.format(filename=filename),
            index_col=False,
            header=0,
        )
        print('Load the file')

        # Read the content of the sheet
        for index, managing_body in enumerate(data_csv['managing_body']):
            quarter = Quarter.objects.get_or_create(
                year=data_csv['report_year'][index],
                month=data_csv['report_qurater'][index],
            )

            if str(data_csv['date_of_revaluation'][index]) == 'nan':
                date_of_revaluation = ''
            else:
                date_of_revaluation = data_csv['date_of_revaluation'][index]

            try:
                rating = rating_dict[data_csv['rating'][index]]
            except (KeyError, TypeError):
                rating = 'לא דווח'

            if str(data_csv['underlying_asset'][index]) == 'nan':
                underlying_asset = ''
            else:
                underlying_asset = data_csv['underlying_asset'][index]

            if str(data_csv['date_of_purchase'][index]) == 'nan':
                date_of_purchase = ''
            else:
                date_of_purchase = data_csv['date_of_purchase'][index]

            if str(data_csv['type_of_asset'][index]) == 'nan':
                type_of_asset = ''
            else:
                type_of_asset = data_csv['type_of_asset'][index]

            if str(data_csv['instrument_sub_type'][index]) == 'nan':
                instrument_sub_type = ''
            else:
                instrument_sub_type = instrument_sub_type_dict[data_csv['instrument_sub_type'][index]]

            instrument, created = Instrument.objects.get_or_create(
                instrument_type=instrument_type_dict[data_csv['instrument_type'][index]],
                instrument_sub_type=instrument_sub_type,
                # instrument_id='',
                fund_name=data_csv['fund_name'][index],
                fund_id=data_csv['fund'][index],
                issuer_id=data_csv['instrument_id'][index],  # regex from Oded. and replace to instrument_sub_type.
                issuer_name=data_csv['instrument_name'][index],
                rating=rating,
                rating_agency=data_csv['rating_agency'][index],
                currency=data_csv['currency'][index],
                interest_rate=data_csv['intrest_rate'][index],
                yield_to_maturity=data_csv['yield'][index],
                par_value=data_csv['par_value'][index],  # fair value
                # market_cap=''  # estimated_value = fair_value = market_cap
                # rate_of_investment_channel='',
                rate_of_fund=data_csv['rate_of_fund'][index],
                # trading_floor='',
                date_of_purchase=date_of_purchase,
                average_of_duration=data_csv['average_of_duration'][index],
                rate=data_csv['rate'][index],
                rate_of_ipo=data_csv['rate_of_ipo'][index],
                # informer='',
                fair_value=data_csv['fair_value'][index],
                activity_industry=data_csv['activity_industry'][index],
                date_of_revaluation=date_of_revaluation,
                type_of_asset=type_of_asset,
                # rate_of_return_during_period='',
                # return_on_equity='',
                # liabilities='',
                # expiry_date_of_liabilities='',
                # effective_rate='',
                # coordinated_cost='',
                underlying_asset=underlying_asset,
                # consortium='',
                # average_rate='',
                # estimated_value='',  # estimated_value = fair_value = market_cap
                managing_body=managing_body_dict[managing_body],
                # geographical_location='',
                # negotiable='',
                quarter=quarter[0],
            )
            print('Finish to import {index} row!'.format(index=index))

        print('Finish with {filename}'.format(filename=filename))
