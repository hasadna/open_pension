import pandas as pd

from normalize.columns_norm import normalize_instrument_number, normalize_instrument_name, normalize_market_name, \
    normalize_currency, normalize_purchase_date


def normalize_gov_bonds(df):
    df = normalize_instrument_name(df)
    df = normalize_instrument_number(df)
    df = normalize_market_name(df)
    df = normalize_currency(df)
    df = normalize_purchase_date(df)

    return df