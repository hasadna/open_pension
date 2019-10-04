from excel_adapter import ExcelProcessor
from logger import Logger

logger = Logger('fo')
ep = ExcelProcessor(file_path='./columns_mapping_prepare.xlsx', logger=logger)

sheets_order = {
    'מזומנים',
    'תעודות התחייבות ממשלתיות',
    'תעודות חוב מסחריות',
    'אג"ח קונצרני',
    'מניות',
    'תעודות סל',
    'קרנות נאמנות',
    'כתבי אופציה',
    'אופציות',
    'חוזים עתידיים',
    'מוצרים מובנים',
    'לא סחיר- תעודות התחייבות ממשלתי',
    'לא סחיר - תעודות חוב מסחריות',
    'לא סחיר - אג"ח קונצרני',
    'לא סחיר - מניות',
    'לא סחיר - קרנות השקעה',
    'לא סחיר - כתבי אופציה',
    'לא סחיר - אופציות',
    'לא סחיר - חוזים עתידיים',
    'לא סחיר - מוצרים מובנים',
    'הלוואות',
    'פקדונות מעל 3 חודשים',
    'זכויות מקרקעין',
    'השקעה בחברות מוחזקות',
    'השקעות אחרות ',
    'יתרת התחייבות להשקעה',
    'עלות מתואמת אג"ח קונצרני סחיר',
    'עלות מתואמת אג"ח קונצרני ל.סחיר',
    'עלות מתואמת מסגרות אשראי ללווים'
}

mapping = {}
for i in range(2, 386):
    sheet, key, value = \
        ep._workbook['מפתח עמודות'].cell(row=i, column=1).value,\
        ep._workbook['מפתח עמודות'].cell(row=i, column=3).value,\
        ep._workbook['מפתח עמודות'].cell(row=i, column=4).value

    if sheet.strip() not in mapping:
        mapping[sheet.strip()] = {}

    mapping[sheet.strip()][key] = value.strip()

print(mapping)
