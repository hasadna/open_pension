from normalization.consts import ALL_INSTRUMENT_TYPES, INSTRUMENTS_REQUIRING_ISSUER_NUMBER, \
    INSTRUMENTS_REQUIRING_INSTRUMENT_NUMBER, INSTRUMENTS_REQUIRING_FAIR_VALUE, INSTRUMENTS_REQUIRING_CURRENCY
from normalization.lookup_lists import MOF_CURRENCIES_DICT, MOF_MARKETS_LIST





def in_valid_instruments_list(instrument: str) -> bool:
    return instrument in ALL_INSTRUMENT_TYPES


def in_valid_currency_list(currency: str) -> bool:
    return currency in MOF_CURRENCIES_DICT.keys()


def in_valid_market_name_list(market_name: str) -> bool:
    return market_name in MOF_MARKETS_LIST


def needs_issuer_number(instrument_type: str) -> bool:
    return instrument_type in INSTRUMENTS_REQUIRING_ISSUER_NUMBER


def needs_instrument_number(instrument_type: str) -> bool:
    return instrument_type in INSTRUMENTS_REQUIRING_INSTRUMENT_NUMBER


def needs_fair_value(instrument_type: str) -> bool:
    return instrument_type in INSTRUMENTS_REQUIRING_FAIR_VALUE


def needs_valid_currency(instrument_type: str) -> bool:
    return instrument_type in INSTRUMENTS_REQUIRING_CURRENCY