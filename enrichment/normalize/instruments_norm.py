import pandas as pd

from lookups.isa_lists import ISA_MARKETS_LIST, ISA_CURRENCIES_DICT
from utils import remove_rows_with_blank_in_columns, \
    remove_values_not_in_list, reformat_to_upper_lstrip_rstrip


def normalize_gov_bonds(df, error_indices_list=list):
    '''
    - Format all rows - lowercase and no spaces to right / left
    - Remove rows with null values in instrument_number, currency and fair_value
    - Remove rows with market names and currencies that are not in ISA's list
    - Change instrument number to ISIN ----- > TODO: Move this part to enrichment
    - Format purchase_date as date type
    - Reformat Fair value x 1000
    - Reformat price value / 100
    '''

    origin_df = df

    # Format rows
    for col in df:
        df[col] = reformat_to_upper_lstrip_rstrip(df[col])

    # Remove rows with blank columns
    df = remove_rows_with_blank_in_columns(df, "Instrument number")
    df = remove_rows_with_blank_in_columns(df, "Currency")
    df = remove_rows_with_blank_in_columns(df, "Fair value")

    # Lookup ISA lists and remove non-conforming values
    df = remove_values_not_in_list(df, "Market name", ISA_MARKETS_LIST)
    df = remove_values_not_in_list(df, "Currency", ISA_CURRENCIES_DICT.keys())

    # Reformat specific columns
    df["Purchase date"] = pd.to_datetime(df["Purchase date"], dayfirst=True)
    df["Fair value"] = pd.to_numeric(df["Fair value"]) * 1000
    df["Price"] = pd.to_numeric(df["Price"]) / 100

    # Retrieve rows with errors
    error_indices_list.extend([i for i in origin_df.index if i not in df.index])

    return df, error_indices_list
