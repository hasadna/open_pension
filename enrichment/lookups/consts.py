import re

ISIN_PATTERN = re.compile('^[A-Z]{2}[A-Z0-9]{9}\\d$')
OPEN_FIGI_LARGE_BULK = 100
OPEN_FIGI_SMALL_BULK = 5

INSTRUMENT_TYPES = [
    'אג"ח קונצרני',
    'כתבי אופציה',
    'מוצרים מובנים',
    'פקדונות מעל 3 חודשים',
    'קרנות נאמנות',
    'תעודות חוב מסחריות',
    'לא סחיר - חוזים עתידיים',
    'לא סחיר - מניות',
    'תעודות סל',
    'לא סחיר - אג"ח קונצרני',
    'יתרת התחייבות להשקעה',
    'תעודות התחייבות ממשלתיות',
    'לא סחיר - קרנות השקעה',
    'מזומנים',
    'מניות'
]

TASE_STOCK_MASK_TYPES = [

]

DF_COLUMNS = [
    'Currency',
    'Duration',
    'Fair value',
    'Industry',
    'Information provider',
    'Instrument name',
    'Instrument number',
    'Investment',
    'Issuer number',
    'Market name',
    'Nominal value',
    'Price',
    'Purchase date',
    'Rate',
    'Rate of fund holding',
    'Rate of instrument type',
    'Rate of register',
    'Rating',
    'Rating agencies',
    'Underlying asset',
    'coupon',
    'dividend',
    'Yield to maturity',
    'file_name',
    'index',
    'israel',
    'line_in_file',
    'total commitment'
]