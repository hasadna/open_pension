import pandas as pd
import numpy as np

from lookups.consts import CURRENCIES, NULL_VALUES_LIST, INSTRUMENT_NAME_COLUMNS, INSTRUMENT_NUM_COLUMNS, \
    MARKET_NAME_COLUMNS, MARKETS_LIST, CURRENCY_COLUMNS
from lookups.utils import reject_listings


def normalize_data(data_dict):
    normalized_data = {}
    df = pd.DataFrame()

    # Flatten JSON file to one DF
    df = pd.DataFrame()
    for k, v in data_dict.items():
        temp_df = pd.DataFrame(data_dict[k])
        df = pd.concat([df, temp_df], axis=0, sort=False, ignore_index=True)
    df.fillna(value=pd.np.nan, inplace=True)

    # Normalize values in DF
    normalize_df(df)

    print(df)
    return df


def normalize_df(df):
    df.fillna(value=pd.np.nan, inplace=True)
    df = normalize_instrument_name(df)
    df = normalize_instrument_number(df)
    df = normalize_market_name(df)
    df = normalize_currency(df)


# --- Specific column normalization functions ---

def normalize_instrument_name(df):
    return remove_null_values("Instrument name", INSTRUMENT_NAME_COLUMNS, df)


def normalize_instrument_number(df):
    df = remove_null_values("Instrument number", INSTRUMENT_NUM_COLUMNS, df)

    # Strip whitespace from instrument numbers
    df["Instrument number"] = df["Instrument number"].str.strip()

    # Remove Initial Bank number for numbers in format <bank_num>-<account_num>

    df["Instrument number"] = df["Instrument number"].apply(format_bank_account_numbers)

    return df


def normalize_market_name(df):
    df = remove_null_values("Market name", MARKET_NAME_COLUMNS, df)
    df = remove_values_not_in_list("Market name", MARKET_NAME_COLUMNS, MARKETS_LIST, df)
    df["Market name"] = df["Market name"].astype("category")
    return df


def normalize_currency(df):
    df = remove_null_values("Currency", CURRENCY_COLUMNS, df)
    df = remove_values_not_in_list("Currency", CURRENCY_COLUMNS, CURRENCIES, df)

    return df


def format_bank_account_numbers(num):
    # If in format <bank>-<account>, return account. Else, return the first number
    if isinstance(num, str):
        split_num = num.split('-')
        return split_num[1] if len(split_num) > 1 else split_num[0]
    else:
        return num


def remove_null_values(column, investment_types_list, df):
    # Check for Blanks and send to reject_list

    # Create a new column to hold the indices for later use in removal from df
    temp_df = df
    temp_df["df_indices"] = temp_df.index

    # look only at rows which are of the relevant investment types
    test_columns_mask = temp_df[temp_df["Investment"].isin(investment_types_list)]

    # remove all null-value lines in the relevant rows
    error_df = test_columns_mask[test_columns_mask[column].isin(NULL_VALUES_LIST)]

    # output rejected rows for later analysis
    if not error_df.empty:
        reject_listings(error_df, "{}_{}_errors.json".format(temp_df["file_name"][0], column.lower().replace(" ", "_")))

    # return df without the rejected rows
    return df.drop(error_df["df_indices"])


def remove_values_not_in_list(column, investment_types_list, item_list, df):
    # Test if all values in "item_list" are in the list and remove errors to separate file

    # Create a new column to hold the indices for later use in removal from df
    temp_df = df
    temp_df["df_indices"] = temp_df.index

    # look only at rows which are of the relevant investment types
    test_columns_mask = temp_df[temp_df["Investment"].isin(investment_types_list)]

    # remove all rows that their values are not in the list
    error_df = test_columns_mask[~test_columns_mask[column].isin(item_list)]
    if not error_df.empty:
        reject_listings(error_df, "{}_{}_list_errors.json".format(temp_df["file_name"][0], column.lower().replace(" ", "_")))

    return df.drop(error_df["df_indices"])





