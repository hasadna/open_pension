YEARS = (
    ('2018', '2018'),
    ('2017', '2017'),
    ('2016', '2016'),
    ('2015', '2015'),
    ('2014', '2014'),
    ('2013', '2013'),
    ('2012', '2012'),
)

MONTHS = (
    ('1', '01'),
    ('2', '02'),
    ('3', '03'),
    ('4', '04'),
)

MANAGING_BODIES = (
    ('AS', 'Altshuler Shaham'),
    ('YL', 'Yelin Lapidot'),
    ('CLL', 'Clal Insurance'),
    ('AMT', 'Amitim'),
    ('MTD', 'Meitav Dash'),
    ('FNX', 'Phoenix'),
    ('HRL', 'Harel'),
    ('MNR', 'Menora Mivtachim'),
    ('MGD', 'Migdal'),
    ('PSG', 'Psagot'),
    ('XNS', 'Excellence'),
)

GEOGRAPHICAL_LOCATION = (
    ('IL', 'Israel'),
    ('ABR', 'Abroad')
)

INSTRUMENT_SUB_TYPES = (
    ('GDC', 'Government Debt Certificates'),
    ('CDC', 'Commercial Debt Certificates'),
    ('CB', 'Corporate Bonds'),
    ('STOCK', 'Stock'),
    ('IF', 'Investment Funds'),
    ('ETF', 'ETF'),
    ('MF', 'Mutual Funds'),
    ('WARRANTS', 'Warrants'),
    ('OPTIONS', 'Options'),
    ('FC', 'Future Contracts'),
    ('SP', 'Structured Products'),
)

INSTRUMENT_TYPES = (
    ('CASH', 'Cash'),
    ('MS', 'Marketable Securities'),
    ('NMS', 'Non-Marketable Securities'),
    ('DE', 'Deposits'),
    ('LOANS', 'Loans'),
    ('DOTM', 'Deposits Over Three Months'),
    ('LR', 'Land Rights'),
    ('OI', 'Other Investments'),
    ('IC', 'Investee Companies'),
    ('ICB', 'Investment Commitments Balance'),
    ('CBAC', 'Corporate Bonds Adjusted Cost'),
    ('BCAC', 'Borrowers Credit Adjusted Cost'),
)

INSTRUMENT_FIELDS = (
    ('currency', 'Currency'),
    ('informer', 'Informer'),
    ('activity_industry', 'Activity Industry'),
    ('type_of_asset', 'Type Of Asset'),
    ('consortium', 'Consortium'),
    ('managing_body', 'Managing Body'),
    ('geographical_location', 'Geographical Location'),
    ('instrument_sub_type', 'Instrument Sub Type'),
)

RATING = (
    ('AAA+', 'AAA+'),
    ('AAA', 'AAA'),
    ('AAA-', 'AAA-'),
    ('AA+', 'AA+'),
    ('AA', 'AA'),
    ('AA-', 'AA-'),
    ('A+', 'A+'),
    ('A', 'A'),
    ('A-', 'A-'),
    ('BBB+', 'BBB+'),
    ('BBB', 'BBB'),
    ('BBB-', 'BBB-'),
    ('BB+', 'BB+'),
    ('BB', 'BB'),
    ('BB-', 'BB-'),
    ('B+', 'B+'),
    ('B', 'B'),
    ('B-', 'B-'),
    ('CCC+', 'CCC+'),
    ('CCC', 'CCC'),
    ('CCC-', 'CCC-'),
    ('CC+', 'CC+'),
    ('CC', 'CC'),
    ('CC-', 'CC-'),
    ('C+', 'C+'),
    ('C', 'C'),
    ('C-', 'C-'),
    ('DDD+', 'DDD+'),
    ('DDD', 'DDD'),
    ('DDD-', 'DDD-'),
    ('DD+', 'DD+'),
    ('DD', 'DD'),
    ('DD-', 'DD-'),
    ('D+', 'D+'),
    ('D', 'D'),
    ('D-', 'D-'),
    ('S&P', 'S&P'),
    ('לא מדורג', 'Not Rated'),
    ('מעלות', 'From Cost'),
    ('פנימי', 'Internal'),
    ('לא דווח', 'No report'),
)
