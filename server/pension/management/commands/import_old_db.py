from os import path

import pandas as pd
from django.core.management import BaseCommand

from pension.models import Fund, Quarter

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
    def value_or_empty(self, value):
        if str(value) == 'nan':
            return None
        return value

    def get_float_or_none(self, value):
        try:
            return float(value)
        except (TypeError, ValueError) as e:
            return None

    def get_int_or_none(self, value):
        try:
            return int(value)
        except (TypeError, ValueError) as e:
            return None

    def handle(self, *args, **options):
        print('Importing..')
        BASE_DIR = path.dirname(path.dirname(path.abspath(__file__)))
        DATA_ROOT = path.abspath(path.join(BASE_DIR, '../../data'))
        csv_filename = path.join(DATA_ROOT, 'pension_data_all.csv')

        data_csv = pd.read_csv(
            csv_filename,
            index_col=False,
            header=0,
        )
        print('Start to load the file')

        # Read the content of the sheet
        for index, managing_body in enumerate(data_csv['managing_body']):
            quarter = Quarter.objects.get_or_create(
                year=data_csv['report_year'][index],
                month=data_csv['report_qurater'][index],
            )

            if not self.value_or_empty(data_csv['instrument_sub_type'][index]):
                instrument_sub_type = ''
            else:
                instrument_sub_type = instrument_sub_type_dict[data_csv['instrument_sub_type'][index]]

            try:
                rating = rating_dict[data_csv['rating'][index]]
            except (KeyError, TypeError):
                rating = 'לא דווח'

            if str(data_csv['dual_trade'][index]) == 't':
                dual_trade = True
            else:
                dual_trade = False

            fund, created = Fund.objects.get_or_create(
                managing_body=managing_body_dict[managing_body],
                fund=self.get_int_or_none(data_csv['fund'][index]),
                fund_name=self.value_or_empty(data_csv['fund_name'][index]),
                quarter=quarter[0],
                instrument_type=instrument_type_dict[data_csv['instrument_type'][index]],
                instrument_sub_type=instrument_sub_type,
                instrument_id=self.get_int_or_none(data_csv['instrument_id'][index]),
                orig_instrument_id=self.value_or_empty(data_csv['orig_instrument_id'][index]),
                instrument_name=self.value_or_empty(data_csv['instrument_name'][index]),
                issuer=self.value_or_empty(data_csv['issuer'][index]),
                activity_industry=self.value_or_empty(data_csv['activity_industry'][index]),
                currency=self.value_or_empty(data_csv['currency'][index]),
                fair_value=self.get_float_or_none(data_csv['fair_value'][index]),
                market_cap=self.get_float_or_none(data_csv['market_cap'][index]),
                rate_of_fund=self.get_float_or_none(data_csv['rate_of_fund'][index]),
                rating_agency=self.value_or_empty(data_csv['rating_agency'][index]),
                reference_index=self.value_or_empty(data_csv['reference_index'][index]),
                intrest_rate=self.get_float_or_none(data_csv['intrest_rate'][index]),
                date_of_purchase=self.value_or_empty(data_csv['date_of_purchase'][index]),
                average_of_duration=self.get_float_or_none(data_csv['average_of_duration'][index]),
                date_of_revaluation=self.value_or_empty(data_csv['date_of_revaluation'][index]),
                rate=self.get_float_or_none(data_csv['rate'][index]),
                yield_to_maturity=self.get_float_or_none(data_csv['yield'][index]),
                rating=rating,
                par_value=self.get_float_or_none(data_csv['par_value'][index]),
                underlying_asset=self.value_or_empty(data_csv['underlying_asset'][index]),
                type_of_asset=self.value_or_empty(data_csv['type_of_asset'][index]),
                rate_of_ipo=self.get_float_or_none(data_csv['rate_of_ipo'][index]),
                liquidity=self.value_or_empty(data_csv['liquidity'][index]),
                asset_type=self.value_or_empty(data_csv['asset_type'][index]),
                row_cleansing_time=self.value_or_empty(data_csv['row_cleansing_time'][index]),
                issuer_number=self.get_int_or_none(data_csv['issuer_number'][index]),
                owner_option=self.value_or_empty(data_csv['owner_option'][index]),
                original_issuer_number=self.get_int_or_none(data_csv['original_issuer_number'][index]),
                isin=self.value_or_empty(data_csv['isin'][index]),
                instrument_symbol=self.value_or_empty(data_csv['instrument_symbol'][index]),
                movil=self.value_or_empty(data_csv['movil'][index]),
                sector=self.value_or_empty(data_csv['sector'][index]),
                dual_trade=dual_trade,
                cleansing_action=self.get_int_or_none(data_csv['cleansing_action'][index]),
            )
            print('Finish to import {index} row!'.format(index=index))

        print('Finish with {filename}'.format(filename=filename))
