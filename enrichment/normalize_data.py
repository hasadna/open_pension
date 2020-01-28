import pandas as pd

from enrichment.lookups.consts import DF_COLUMNS, INSTRUMENT_TYPES, GOVERNMENTAL_BONDS, COMPANY_BONDS, MARKETS_LIST, \
    CURRENCIES
from enrichment.lookups.utils import reject_listings


def normalize_data(data_dict):

    switcher = {
        GOVERNMENTAL_BONDS: norm_type_gov_bonds,
        # COMPANY_BONDS: norm_type_comp_bonds,

    }

    normalized_data = {}

    # Flatten JSON file
    for instrument in INSTRUMENT_TYPES:
        df = pd.DataFrame(data_dict[instrument])
        func = switcher.get(instrument, lambda x: None)
        normalized_df = func(df)
        if normalized_df:
            normalized_data.update(normalized_df.to_dict())

    return normalized_data

# --- Instrument normalization functions ---

def norm_type_gov_bonds(df):
    df = check_market_names(df, GOVERNMENTAL_BONDS)
    df = normalize_instrument_number(df)
    df = check_currencies(df, GOVERNMENTAL_BONDS)

def norm_type_comp_bonds(df):
    pass


# --- Specific column normalization functions ---

def check_market_names(df, instrument_type):
    # Test if all values in "Market name" are in the MOF list and remove errors to separate file
    error_df = df.loc[~df["Market name"].isin(MARKETS_LIST)]
    if not error_df.empty:
        reject_listings(error_df, "{}_{}.json".format(df["file_name"][0], instrument_type))

    df = df.loc[df["Market name"].isin(MARKETS_LIST)]

    return df

def check_currencies(df, instrument_type):
    # Test if all values in "Currency" are in the MOF list and remove errors to separate file
    error_df = df.loc[~df["Currency"].isin(CURRENCIES.keys())]
    if not error_df.empty:
        reject_listings(error_df, "{}_{}.json".format(df["file_name"][0], instrument_type))

    df = df.loc[df["Currency"].isin(CURRENCIES.keys())]

    return df

def normalize_instrument_number(df):
    # Strip whitespace from instrument numbers
    df["Instrument number"] = df["Instrument number"].apply(lambda x: x.strip() if pd.notnull(x) else x)
    return df
