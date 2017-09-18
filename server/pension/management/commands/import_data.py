# -*- coding: utf-8 -*-
import os
import re
import glob
import pandas as pd
from django.utils import timezone
import dateutil.parser

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
    'תעודות התחייבות ממשלתיות': 'GDC',
    'תעודות חוב מסחריות': 'CDC',
    'אג"ח קונצרני': 'CB',
    'מניות': 'STOCK',
    'תעודות סל': 'ETF',
    'קרנות נאמנות': 'MF',
    'כתבי אופציה': 'WARRANTS',
    'אופציות': 'OPTIONS',
    'חוזים עתידיים': 'FC',
    'מוצרים מובנים': 'SP',
    'לא סחיר - תעודות התחייבות ממשלתי': 'GDC',
    'לא סחיר - תעודות התחייבות ממשלת': 'GDC',
    'לא סחיר - תעודות חוב מסחריות': 'CDC',
    'לא סחיר - אג"ח קונצרני': 'CB',  # לא סחיר - אג״ח קונצרני
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
    'יתרת התחייבות להשקעה': 'ICB',
    'עלות מותאמת אג״ח קונצרני סחיר': 'CBAC',
    'עלות מותאמת אג״ח קונצרני לא סחיר': 'CBAC',
    'עלות מתואמת אג"ח קונצרני ל.סחיר': 'CBAC',
    'עלות מותאמת מסגרות אשראי ללווים': 'BCAC',
}

is_title_per_sheet = {
    'מזומנים': 'מספר ני"ע',
    'תעודות התחייבות ממשלתיות': 'מספר ני"ע',
    'תעודות חוב מסחריות': 'מספר ני"ע',
    'אג"ח קונצרני': 'מספר ני"ע',
    'מניות': 'מספר ני"ע',
    'תעודות סל': 'מספר ני"ע',
    'קרנות נאמנות': 'מספר ני"ע',
    'כתבי אופציה': 'מספר ני"ע',
    'אופציות': 'מספר ני"ע',
    'חוזים עתידיים': 'מספר ני"ע',
    'מוצרים מובנים': 'מספר ני"ע',
    'לא סחיר - תעודות התחייבות ממשלתי': 'מספר ני"ע',
    'לא סחיר - תעודות התחייבות ממשלת': 'מספר ני"ע',
    'לא סחיר - תעודות חוב מסחריות': 'מספר ני"ע',
    'לא סחיר - אג"ח קונצרני': 'מספר ני"ע',  # לא סחיר - אג״ח קונצרני
    'לא סחיר - מניות': 'מספר ני"ע',  # לא סחיר - מניות
    'לא סחיר - קרנות השקעה': 'מספר ני"ע',  # לא סחיר - קרנות השקעה
    'לא סחיר - כתבי אופציה': 'מספר ני"ע',  # לא סחיר - כתבי אופציה
    'לא סחיר - אופציות': 'מספר ני"ע',  # לא סחיר - אופציות
    'לא סחיר - חוזים עתידיים': 'מספר ני"ע',  # לא סחיר - חוזים עתידיים
    'לא סחיר - מוצרים מובנים': 'מספר ני"ע',  # לא סחיר - מוצרים מובנים
    'הלוואות': 'מספר ני"ע',
    'פקדונות מעל 3 חודשים': 'מספר ני"ע',
    'זכויות מקרקעין': 'אופי הנכס',
    'השקעות אחרות': 'מספר הנייר',
    'השקעה בחברות מוחזקות': 'מספר מנפיק',
    'יתרת התחיבות להשקעה': 'תאריך סיום ההתחייבות',
    'יתרת התחייבות להשקעה': 'תאריך סיום ההתחייבות',
    'עלות מתואמת אג"ח קונצרני סחיר': 'מספר ני"ע',
    'עלות מותאמת אג״ח קונצרני לא סחיר': 'מספר ני"ע',
    'עלות מתואמת אג"ח קונצרני ל.סחיר': 'מספר ני"ע',
    'עלות מתואמת מסגרות אשראי ללווים': 'מספר ני"ע',
}

def read_sheet(xls_file, sheet_name, rows_to_skip, managing_body, quarter):

    # if sheet_name == 'תעודות התחייבות ממשלתיות':
    #     exit()

    rows_to_skip_calculated = calc_rows_to_skip(xls_file, sheet_name)


    sheet = xls_file.parse(sheet_name, skiprows=rows_to_skip_calculated, parse_cols=40)

    sheet.columns = sheet.columns.str.strip()
    # print(sheet.columns.tolist())
    # print(sheet)
    # Read the content of the sheet
    try:
        current_sh = sheet['שם המנפיק/שם נייר ערך']
    except KeyError as ke:
        # print('+1 on rows')
        # print(sheet_name)
        # sheet = xls_file.parse(sheet_name, skiprows=rows_to_skip_calculated)
        # sheet.columns = sheet.columns.str.strip()
        # print(sheet.columns.tolist())
        try:
            current_sh = sheet['שם נייר ערך']
        except KeyError as ke2:
            try:
                current_sh = sheet['שם נ"ע']
            except KeyError as ke3:
                try:
                    current_sh = sheet['מספר הנייר']
                except KeyError as ke5:
                    try:
                        current_sh = sheet['מספר נ"ע']
                    except KeyError as ke6:
                        current_sh = sheet['אופי הנכס']

    # print('current_sh:%s' % current_sh)
    for index, col_title in enumerate(current_sh):
        cleaned_sheet_name = str(sheet_name).strip().replace('-', ' - ').replace('  ', ' ')

        if col_title == 'nan':
            continue
        elif col_title == 'בישראל':
            context = 'IL'
        elif col_title == 'בחו"ל':
            context = 'ABR'

        elif 'ישראל' in str(col_title):
            context = 'IL'
        elif 'חו"ל' in str(col_title):
            context = 'ABR'

        # Continue only if we have a context
        try:
            context
        except UnboundLocalError as e:
            continue

        # Check if it's a title or real data
        itps = cleaned_sheet_name
        cell = is_title_per_sheet[itps]

        # print('index row no178:%s' % str(index))
        # print('cell  row no178:%s' % str(cell))
        try:
            str(sheet[cell][index])
        except KeyError as ke4:
            cell = 'מספר ני"ע'

        if str(sheet[cell][index]) == 'nan' or '*' in str(col_title) \
                or 'סה"כ' in str(col_title) or '0' == str(col_title).strip():
            #print("This is a title row, I'm going out!")
            continue

        try:

            issuer_id = sheet['מספר ני"ע'][index]
            if str(issuer_id) == 'nan':
                raise KeyError
        except KeyError as e:
            try:
                issuer_id = sheet['מספר הנייר'][index]
                if str(issuer_id) == 'nan':
                    raise KeyError
            except KeyError as e:
                issuer_id = cleaned_sheet_name  # sheet_name

            issuer_id = cleaned_sheet_name  # sheet_name

        try:
            rating = sheet['דירוג'][index]
            if str(rating) == 'nan':
                raise KeyError
        except KeyError as e:
            rating = ''

        try:
            rating_agency = sheet['שם מדרג'][index]
            if str(rating_agency) == 'nan':
                raise KeyError
        except KeyError as e:
            rating_agency = ''

        try:
            currency = sheet['סוג מטבע'][index]
            if str(currency) == 'nan':
                raise KeyError
        except KeyError as e:
            currency = ''

        try:
            interest_rate = sheet['שיעור ריבית'][index]
            if str(interest_rate) == 'nan':
                raise KeyError
        except KeyError as e:
            interest_rate = 0.0

        try:
            yield_to_maturity = sheet['תשואה לפידיון'][index]
            if str(yield_to_maturity) == 'nan':
                raise KeyError
        except KeyError as e:
            yield_to_maturity = 0.0

        try:
            market_cap = sheet['שווי שוק'][index]
            if str(market_cap) == 'nan':
                raise KeyError
        except KeyError as e:
            market_cap = 0.0

        try:
            rate_of_investment_channel = sheet['שעור מנכסי אפיק ההשקעה'][index]
            if str(rate_of_investment_channel) == 'nan':
                raise KeyError
        except KeyError as e:
            rate_of_investment_channel = 0.0

        try:
            rate_of_fund = sheet['שעור מסך נכסי השקעה'][index]
            if str(rate_of_fund) == 'nan':
                raise KeyError
        except KeyError as e:
            rate_of_fund = 0.0

        try:
            trading_floor = sheet['זירת מסחר'][index]
            if str(trading_floor) == 'nan':
                raise KeyError
        except KeyError as e:
            trading_floor = ''

        try:
            date_of_purchase = sheet['תאריך רכישה'][index]
            if str(date_of_purchase) == 'nan':
                raise KeyError
        except KeyError as e:
            date_of_purchase = ''

        try:
            average_of_duration = sheet['מח"מ'][index]
            if str(average_of_duration) == 'nan':
                raise KeyError
        except KeyError as e:
            average_of_duration = 0.0

        try:
            rate = sheet['שער'][index]
            if str(rate) == 'nan':
                raise KeyError
        except KeyError as e:
            rate = 0.0

        try:
            rate_of_ipo = sheet['שעור מערך נקוב מונפק'][index]
            if str(rate_of_ipo) == 'nan':
                raise KeyError
        except KeyError as e:
            rate_of_ipo = 0.0

        try:
            informer = sheet['ספק מידע'][index]
            if str(informer) == 'nan':
                raise KeyError
        except KeyError as e:
            informer = ''

        try:
            fair_value = sheet['שווי הוגן'][index]
            if str(fair_value) == 'nan':
                raise KeyError
        except KeyError as e:
            fair_value = 0.0

        try:
            activity_industry = sheet['ענף מסחר'][index]
            if str(activity_industry) == 'nan':
                raise KeyError
        except KeyError as e:
            activity_industry = ''

        try:
            # print('type:%s|value:%s' % (type(sheet['תאריך שערוך אחרון'][index]), sheet['תאריך שערוך אחרון'][index]))
            if type(sheet['תאריך שערוך אחרון'][index]) is str:
                if len(sheet['תאריך שערוך אחרון'][index]) > 3:
                    date_of_revaluation = dateutil.parser.parse(sheet['תאריך שערוך אחרון'][index])
                else:
                    date_of_revaluation = timezone.now()
            else:
                date_of_revaluation = sheet['תאריך שערוך אחרון'][index]

            if str(date_of_revaluation) == 'nan':
                raise KeyError
        except KeyError as e:
            date_of_revaluation = timezone.now()

        try:
            type_of_asset = sheet['אופי הנכס'][index]
            if str(type_of_asset) == 'nan':
                raise KeyError
        except KeyError as e:
            type_of_asset = ''

        try:
            return_on_equity = sheet[''][index]
            if str(return_on_equity) == 'nan':
                raise KeyError
        except KeyError as e:
            return_on_equity = 0.0

        try:
            liabilities = sheet['סכום ההתחייבות'][index]
            if str(liabilities) == 'nan':
                raise KeyError
        except KeyError as e:
            liabilities = 0.0

        try:

            if type(sheet['תאריך סיום ההתחייבות'][index]) is str:
                if 'מועד' in str(sheet['תאריך סיום ההתחייבות'][index]):
                    expiry_date_of_liabilities_pre = None
                else:

                    try:
                        expiry_date_of_liabilities_pre = dateutil.parser.parse(sheet['תאריך סיום ההתחייבות'][index], fuzzy=True)
                    except ValueError as ve:
                        # print(sheet['תאריך סיום ההתחייבות'][index])
                        expiry_date_of_liabilities_pre = None
                        # expiry_date_of_liabilities_pre = sheet['תאריך סיום ההתחייבות'][index]
            else:
                expiry_date_of_liabilities_pre = sheet['תאריך סיום ההתחייבות'][index]


            expiry_date_of_liabilities = expiry_date_of_liabilities_pre
            if str(expiry_date_of_liabilities) == 'nan':
                raise KeyError
        except KeyError as e:
            expiry_date_of_liabilities = timezone.now()

        try:
            effective_rate = sheet['ריבית אפקטיבית'][index]
            if str(effective_rate) == 'nan':
                raise KeyError
        except KeyError as e:
            effective_rate = 0.0

        try:
            coordinated_cost = sheet['עלות מתואמת'][index]
            if str(coordinated_cost) == 'nan':
                raise KeyError
        except KeyError as e:
            coordinated_cost = 0.0

        try:
            underlying_asset = sheet['נכס הבסיס'][index]
            if str(underlying_asset) == 'nan':
                raise KeyError
        except KeyError as e:
            underlying_asset = 0.0

        try:
            consortium = sheet['קונסורציום כן/לא'][index]
            if str(consortium) == 'nan':
                raise KeyError
            elif str(consortium).strip() == 'כן':
                consortium = True
            elif str(consortium).strip() == 'לא':
                consortium = False
        except KeyError as e:
            consortium = False

        try:
            average_rate = sheet['שיעור ריבית ממוצע'][index]
            if str(average_rate) == 'nan':
                raise KeyError
        except KeyError as e:
            average_rate = 0.0

        try:
            par_value = sheet['שווי משוערך'][index]
            if str(par_value) == 'nan':
                raise KeyError
        except KeyError as e:
            par_value = 0.0

        try:

            instrument, created = Instrument.objects.get_or_create(
                issuer_id=issuer_id,
                rating=rating,
                rating_agency=rating_agency,
                currency=currency,
                interest_rate=interest_rate,
                yield_to_maturity=yield_to_maturity,
                market_cap=market_cap,
                rate_of_investment_channel=rate_of_investment_channel,
                rate_of_fund=rate_of_fund,
                trading_floor=trading_floor,
                date_of_purchase=date_of_purchase,
                average_of_duration=average_of_duration,
                rate=rate,
                rate_of_ipo=rate_of_ipo,
                informer=informer,
                fair_value=fair_value,
                activity_industry=activity_industry,
                date_of_revaluation=date_of_revaluation,
                type_of_asset=type_of_asset,
                return_on_equity=return_on_equity,
                liabilities=liabilities,
                expiry_date_of_liabilities=expiry_date_of_liabilities,
                effective_rate=effective_rate,
                coordinated_cost=coordinated_cost,
                underlying_asset=underlying_asset,
                consortium=consortium,
                average_rate=average_rate,
                par_value=par_value,
                managing_body=managing_body_dict[managing_body],
                geographical_location=context,
                instrument_sub_type=instrument_dict[cleaned_sheet_name],

                quarter=quarter[0],
                # defaults={
                #     'birthday': date(1940, 10, 9)
                # },
            )

            #print('created', instrument, created)

        except ValueError as e:
            print('index', index)
            print('issuer_id', issuer_id)
            print('rating', rating)
            print('rating_agency', rating_agency)
            print('currency', currency)
            print('interest_rate', interest_rate)
            print('yield_to_maturity', yield_to_maturity)
            print('market_cap', market_cap)
            print('rate_of_investment_channel', rate_of_investment_channel)
            print('rate_of_fund', rate_of_fund)
            print('trading_floor', trading_floor)
            print('date_of_purchase', date_of_purchase)
            print('average_of_duration', average_of_duration)
            print('rate', rate)
            print('rate_of_ipo', rate_of_ipo)
            print('informer', informer)
            print('fair_value', fair_value)
            print('activity_industry', activity_industry)
            print('date_of_revaluation', date_of_revaluation)
            print('type_of_asset', type_of_asset)
            print('return_on_equity', return_on_equity)
            print('liabilities', liabilities)
            print('expiry_date_of_liabilities', expiry_date_of_liabilities)
            print('effective_rate', effective_rate)
            print('coordinated_cost', coordinated_cost)
            print('underlying_asset', underlying_asset)
            print('consortium', consortium)
            print('average_rate', average_rate)
            print('par_value', par_value)
            print('managing_body', managing_body_dict[managing_body])
            print('geographical_location', context)
            print('instrument_sub_type', instrument_dict[cleaned_sheet_name])
            print('--------------------')
            raise(ValueError)

    # print('Finish with {sheet_name}'.format(sheet_name=sheet_name))

def calc_rows_to_skip(xls_file, sheet_name):
    rows_to_skip_calculated = 0
    is_table_head = False
    while not is_table_head and rows_to_skip_calculated < 10:
        pre_sheet = xls_file.parse(sheet_name, skiprows=rows_to_skip_calculated)
        # print(' ')
        # print('+++++++++++++++++++++++++++++++++++++++++++++')
        # print(len(pre_sheet.columns))
        # print('type pre_sheet:%s' % pre_sheet.columns)
        # print('type pre_sheet:%s' % type(pre_sheet.columns))
        # print('---------------------------------------------')
        if len(pre_sheet.columns) > 0:
            pre_sheet_columns = pre_sheet.columns.str.strip()
        else:
            pre_sheet_columns = []
        pre_sheet_columns = list(pre_sheet_columns)

        if ('שם נ"ע' in pre_sheet_columns) or \
                ('שם המנפיק/שם נייר ערך' in pre_sheet_columns) or \
                ('שם נייר ערך' in pre_sheet_columns) or \
                ('מזומנים ושווי מזומנים' in pre_sheet_columns) or \
                ('מספר נ"ע' in pre_sheet_columns) or \
                ('זכויות במקרעין' in pre_sheet_columns):
            is_table_head = True
        else:
            rows_to_skip_calculated += 1

    # print('rows_to_skip_calculated:%s' % rows_to_skip_calculated)
    return rows_to_skip_calculated

def read_xls_file(filename):
    xls_file = pd.ExcelFile('/Users/infinity/op_input/{filename}'.format(filename=filename))
    split_filename = filename.split('.')[0].split('_')

    quarter = Quarter.objects.get_or_create(
        year=split_filename[1],
        month=split_filename[2],
    )

    # Loop over all the sheets in the file
    for sheet_name in xls_file.sheet_names:
        if sheet_name not in ('סכום נכסי הקרן'):
            rows_to_skip = 7
            try:
                read_sheet(xls_file, sheet_name, rows_to_skip, split_filename[0], quarter)
            except Exception as e:
                print(sheet_name)
    #print('Finish with {filename}'.format(filename=filename))


class Command(BaseCommand):
    def handle(self, *args, **options):
        print('Importing..')

        # Go over all the xls files in that directory
        inputs_dir = "/Users/infinity/op_input"
        os.chdir(inputs_dir)

        for file in glob.glob("*.xls*"):
            print(str(file))
            try:
                read_xls_file(file)
            except Exception as e:
                # faults move to badfiles dir
                os.rename(os.path.join(inputs_dir,file), os.path.join(os.path.join(inputs_dir, "notpassed"),file))
        print('Import completed successfully.')
