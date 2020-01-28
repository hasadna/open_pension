import re

ISIN_PATTERN = re.compile('^[A-Z]{2}[A-Z0-9]{9}\\d$')
OPEN_FIGI_LARGE_BULK = 100
OPEN_FIGI_SMALL_BULK = 5

# Asset Types
CASH = 'מזומנים'
GOVERNMENTAL_BONDS = 'תעודות התחייבות ממשלתיות'
COMMERCIAL_BONDS = 'תעודות חוב מסחריות'
COMPANY_BONDS = 'אג"ח קונצרני'
STOCKS = 'מניות'
MUTUAL_FUNDS = 'קרנות נאמנות'
ETN = 'תעודות סל'  # Exchange-traded note
WARRANTS = 'כתבי אופציה'
OPTIONS = 'אופציות'

# Non Tradeable asset types
GOVERNMENTAL_BONDS_NT = 'לא סחיר - תעודות התחייבות ממשלתיות'
COMMERCIAL_BONDS_NT = 'לא סחיר - תעודות חוב מסחריות'
COMPANY_BONDS_NT = 'לא סחיר - אג"ח קונצרני'
STOCKS_NT = 'לא סחיר - מניות'
MUTUAL_FUNDS_NT = 'לא סחיר - קרנות השקעה'
WARRANTS_NT = 'לא סחיר - כתבי אופציה'
OPTIONS_NT = 'לא סחיר - אופציות'

INSTRUMENT_TYPES = [
    CASH,
    GOVERNMENTAL_BONDS,
    COMMERCIAL_BONDS,
    COMPANY_BONDS,
    STOCKS,
    ETN,
    MUTUAL_FUNDS,
    WARRANTS,
    OPTIONS,
    'חוזים עתידיים',
    'מוצרים מובנים',
    STOCKS_NT,
    GOVERNMENTAL_BONDS_NT,
    COMMERCIAL_BONDS_NT,
    COMPANY_BONDS_NT,
    MUTUAL_FUNDS_NT,
    WARRANTS_NT,
    OPTIONS_NT,
    'לא סחיר - חוזים עתידיים',
    'לא סחיר - מוצרים מובנים',
    'הלוואות',
    'פקדונות מעל 3 חודשים',
    'זכויות מקרקעין',
    'השקעה בחברות מוחזקות',
    'השקעות אחרות',
    'יתרת התחייבות להשקעה',
    'יתרת התחייבות להשקעה',
]

ISIN_INSTRUMENTS_LIST = [GOVERNMENTAL_BONDS, GOVERNMENTAL_BONDS_NT, COMPANY_BONDS, COMPANY_BONDS_NT, STOCKS, STOCKS_NT,
                         ETN, MUTUAL_FUNDS, MUTUAL_FUNDS_NT, WARRANTS, WARRANTS_NT, OPTIONS, OPTIONS_NT

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

MARKETS_LIST = [
    "TASE",
    "NYSE",
    "NASDAQ",
    "JPX",
    "NYX",
    "AMEX",
    "ASX",
    "BOVESPA",
    "BSE",
    "NSE",
    "CAC",
    "DAX",
    "BME",
    "HKSE",
    "KRX",
    "ISE",
    "LSE",
    "SSE",
    "SZSE",
    "RTS",
    "SGX",
    "SIX",
    "JSE",
    "TSE",
    "TSX",
    "TSEC",
    "אחר"
]

CURRENCIES = {
    "שקל חדש": "ILS",
    "דולר אמריקאי": "USD",
    "אירו": "EUR",
    "לירה שטרלינג": "GBP",
    "דולר קנדי": "CAD",
    "דולר אוסטרלי": "AUD",
    "דולר הונג קונג": "HKD",
    "דולר ניו-זילנד": "NZD",
    "כתר דני": "DKK",
    "כתר שבדי": "SEK",
    "יין יפני": "JPY",
    "מקסיקו פזו": "MXN",
    "פרנק שווצרי": "CHF",
    "ריאל ברזילאי": "BRL",
    "ראנד דרום אפריקאי": "ZAR",
    "אחר": "OTHER"
}

TASE_MARKET_SECTORS = [
    'ביוטכנולוגיה',
    'מכשור רפואי',
    'השקעות במדעי החיים',
    'פארמה',
    'שירותי מידע',
    'תוכנה ואינטרנט',
    'אלקטרוניקה ואופטיקה',
    'ביטחוניות',
    'ציוד תקשורת',
    'מוליכים למחצה',
    'קלינטק',
    'השקעות בהיי-טק',
    'בנקים',
    'ביטוח',
    'שירותים פיננסיים',
    'מסחר',
    'שירותים',
    'מלונאות ותיירות',
    'תקשורת ומדיה',
    'נדל"ן מניב בישראל',
    'נדל"ן מניב בחו"ל',
    'בנייה',
    'מזון',
    'אופנה והלבשה',
    'מתכת ומוצרי בניה',
    'חשמל',
    'כימיה, גומי ופלסטיק',
    'עץ, נייר ודפוס',
    'השקעה ואחזקות',
    'חברות מעטפת',
    'חיפושי נפט וגז',
    'אנרגיה',
    'קרנות סל',
    'אג"ח מובנות'
]
