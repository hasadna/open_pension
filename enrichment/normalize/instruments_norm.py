import pandas as pd

from enrichment.lookups.lookup_lists import MOF_MARKETS_LIST, MOF_CURRENCIES_DICT
from enrichment.utils import remove_rows_with_blank_in_columns, remove_values_not_in_list, \
    reformat_to_upper_lstrip_rstrip


def normalize_cash(df, error_indices_list=list):
    pass


def normalize_gov_bonds(df, error_indices_list=list):
    '''
    - Format all rows - lowercase and no spaces to right / left
    - Remove rows with null values in instrument_number, currency and fair_value
    - Remove rows with market names and currencies that are not in MOF's list
    - Format purchase_date as date type
    - Reformat Fair value x 1000
    - Reformat price value / 100
    - Reformat duration, rate, yield to maturity, nominal value, coupon, rate of register, rate of instrument type and
      rate of fund holding to numerical values
    '''

    origin_df = df

    # Format rows
    for col in df:
        df[col] = reformat_to_upper_lstrip_rstrip(df[col])

    # Remove rows with blank columns
    df = remove_rows_with_blank_in_columns(df, "Instrument number")
    df = remove_rows_with_blank_in_columns(df, "Currency")
    df = remove_rows_with_blank_in_columns(df, "Fair value")

    # Lookup in lists and remove non-conforming values
    df = remove_values_not_in_list(df, "Market name", MOF_MARKETS_LIST)
    df = remove_values_not_in_list(df, "Currency", MOF_CURRENCIES_DICT.keys())

    # Reformat specific columns
    df["Purchase date"] = pd.to_datetime(df["Purchase date"], dayfirst=True)
    df["Fair value"] = pd.to_numeric(df["Fair value"]) * 1000
    df["Price"] = pd.to_numeric(df["Price"]) / 100
    df["Duration"] = pd.to_numeric(df["Duration"])
    df["Rate"] = pd.to_numeric(df["Rate"])
    df["Yield to maturity"] = pd.to_numeric(df["Yield to maturity"])
    df["Nominal value"] = pd.to_numeric(df["Nominal value"])
    df["coupon"] = pd.to_numeric(df["coupon"])
    df["Rate of register"] = pd.to_numeric(df["Rate of register"])
    df["Rate of instrument type"] = pd.to_numeric(df["Rate of instrument type"])
    df["Rate of fund holding"] = pd.to_numeric(df["Rate of fund holding"])

    # Retrieve rows with errors
    error_indices_list.extend([i for i in origin_df.index if i not in df.index])

    return df, error_indices_list


def normalize_commercial_bonds(df, error_indices_list=list):
    pass


def normalize_company_bonds(df, error_indices_list=list):
    '''
    - Format all rows - lowercase and no spaces to right / left
    - Remove rows with null values in instrument_number, currency and fair_value
    - Remove rows with market names and currencies that are not in MOF's list
    - Format purchase_date as date type
    - Reformat Fair value x 1000
    - Reformat price value / 100
    - Reformat duration, rate, yield to maturity, nominal value, coupon, rate of register, rate of instrument type and
      rate of fund holding to numerical values
    '''

    origin_df = df

    # Format rows
    for col in df:
        df[col] = reformat_to_upper_lstrip_rstrip(df[col])

    # Remove rows with blank columns
    df = remove_rows_with_blank_in_columns(df, "Instrument number")
    df = remove_rows_with_blank_in_columns(df, "Currency")
    df = remove_rows_with_blank_in_columns(df, "Fair value")

    # Lookup in lists and remove non-conforming values
    df = remove_values_not_in_list(df, "Market name", MOF_MARKETS_LIST)
    df = remove_values_not_in_list(df, "Currency", MOF_CURRENCIES_DICT.keys())

    # Reformat specific columns
    df["Purchase date"] = pd.to_datetime(df["Purchase date"], dayfirst=True)
    df["Fair value"] = pd.to_numeric(df["Fair value"]) * 1000
    df["Price"] = pd.to_numeric(df["Price"]) / 100
    df["Duration"] = pd.to_numeric(df["Duration"])
    df["Rate"] = pd.to_numeric(df["Rate"])
    df["Yield to maturity"] = pd.to_numeric(df["Yield to maturity"])
    df["Nominal value"] = pd.to_numeric(df["Nominal value"])
    df["coupon"] = pd.to_numeric(df["coupon"])
    df["Rate of register"] = pd.to_numeric(df["Rate of register"])
    df["Rate of instrument type"] = pd.to_numeric(df["Rate of instrument type"])
    df["Rate of fund holding"] = pd.to_numeric(df["Rate of fund holding"])

    # Retrieve rows with errors
    error_indices_list.extend([i for i in origin_df.index if i not in df.index])

    return df, error_indices_list


def normalize_stocks(df, error_indices_list=list):
    '''
    - Format all rows - lowercase and no spaces to right / left
    - Remove rows with null values in instrument_number, currency and fair_value
    - Remove rows with market names and currencies that are not in MOF's list
    - Reformat Fair value x 1000
    - Reformat price value / 100
    - Reformat nominal value, dividend, rate of register, rate of instrument type and
      rate of fund holding to numerical values
    '''

    origin_df = df

    # Format rows
    for col in df:
        df[col] = reformat_to_upper_lstrip_rstrip(df[col])

    # Remove rows with blank columns
    df = remove_rows_with_blank_in_columns(df, "Instrument number")
    df = remove_rows_with_blank_in_columns(df, "Currency")
    df = remove_rows_with_blank_in_columns(df, "Fair value")

    # Lookup in lists and remove non-conforming values
    df = remove_values_not_in_list(df, "Market name", MOF_MARKETS_LIST)
    df = remove_values_not_in_list(df, "Currency", MOF_CURRENCIES_DICT.keys())

    # Reformat specific columns
    df["Fair value"] = pd.to_numeric(df["Fair value"]) * 1000
    df["Price"] = pd.to_numeric(df["Price"]) / 100
    df["Nominal value"] = pd.to_numeric(df["Nominal value"])
    df["dividend"] = pd.to_numeric(df["dividend"])
    df["Rate of register"] = pd.to_numeric(df["Rate of register"])
    df["Rate of instrument type"] = pd.to_numeric(df["Rate of instrument type"])
    df["Rate of fund holding"] = pd.to_numeric(df["Rate of fund holding"])

    # Retrieve rows with errors
    error_indices_list.extend([i for i in origin_df.index if i not in df.index])

    return df, error_indices_list


def normalize_etf(df, error_indices_list=list):
    '''
    - Format all rows - lowercase and no spaces to right / left
    - Remove rows with null values in instrument_number, currency and fair_value
    - Remove rows with market names and currencies that are not in MOF's list
    - Reformat Fair value x 1000
    - Reformat price value / 100
    - Reformat nominal value, coupon, rate of register, rate of instrument type and rate of fund holding to
      numerical values
    '''

    origin_df = df

    # Format rows
    for col in df:
        df[col] = reformat_to_upper_lstrip_rstrip(df[col])

    # Remove rows with blank columns
    df = remove_rows_with_blank_in_columns(df, "Instrument number")
    df = remove_rows_with_blank_in_columns(df, "Currency")
    df = remove_rows_with_blank_in_columns(df, "Fair value")

    # Lookup in lists and remove non-conforming values
    df = remove_values_not_in_list(df, "Market name", MOF_MARKETS_LIST)
    df = remove_values_not_in_list(df, "Currency", MOF_CURRENCIES_DICT.keys())

    # Reformat specific columns
    df["Fair value"] = pd.to_numeric(df["Fair value"]) * 1000
    df["Price"] = pd.to_numeric(df["Price"]) / 100
    df["Nominal value"] = pd.to_numeric(df["Nominal value"])
    df["coupon"] = pd.to_numeric(df["coupon"])
    df["Rate of register"] = pd.to_numeric(df["Rate of register"])
    df["Rate of instrument type"] = pd.to_numeric(df["Rate of instrument type"])
    df["Rate of fund holding"] = pd.to_numeric(df["Rate of fund holding"])

    # Retrieve rows with errors
    error_indices_list.extend([i for i in origin_df.index if i not in df.index])

    return df, error_indices_list


def normalize_mutual_funds(df, error_indices_list=list):
    '''
    - Format all rows - lowercase and no spaces to right / left
    - Remove rows with null values in instrument_number, currency and fair_value
    - Remove rows with market names and currencies that are not in MOF's list
    - Reformat Fair value x 1000
    - Reformat price value / 100
    - Reformat nominal value, rate of register, rate of instrument type and rate of fund holding to
      numerical values
    '''

    origin_df = df

    # Format rows
    for col in df:
        df[col] = reformat_to_upper_lstrip_rstrip(df[col])

    # Remove rows with blank columns
    df = remove_rows_with_blank_in_columns(df, "Instrument number")
    df = remove_rows_with_blank_in_columns(df, "Currency")
    df = remove_rows_with_blank_in_columns(df, "Fair value")

    # Lookup in lists and remove non-conforming values
    df = remove_values_not_in_list(df, "Market name", MOF_MARKETS_LIST)
    df = remove_values_not_in_list(df, "Currency", MOF_CURRENCIES_DICT.keys())

    # Reformat specific columns
    df["Fair value"] = pd.to_numeric(df["Fair value"]) * 1000
    df["Price"] = pd.to_numeric(df["Price"]) / 100
    df["Nominal value"] = pd.to_numeric(df["Nominal value"])
    df["Rate of register"] = pd.to_numeric(df["Rate of register"])
    df["Rate of instrument type"] = pd.to_numeric(df["Rate of instrument type"])
    df["Rate of fund holding"] = pd.to_numeric(df["Rate of fund holding"])

    # Retrieve rows with errors
    error_indices_list.extend([i for i in origin_df.index if i not in df.index])

    return df, error_indices_list


def normalize_warrants(df, error_indices_list=list):
    '''
    - Format all rows - lowercase and no spaces to right / left
    - Remove rows with null values in instrument_number, currency and fair_value
    - Remove rows with market names and currencies that are not in MOF's list
    - Reformat Fair value x 1000
    - Reformat price value / 100
    - Reformat nominal value, rate of instrument type and rate of fund holding to numerical values
    '''

    origin_df = df

    # Format rows
    for col in df:
        df[col] = reformat_to_upper_lstrip_rstrip(df[col])

    # Remove rows with blank columns
    df = remove_rows_with_blank_in_columns(df, "Instrument number")
    df = remove_rows_with_blank_in_columns(df, "Currency")
    df = remove_rows_with_blank_in_columns(df, "Fair value")

    # Lookup in lists and remove non-conforming values
    df = remove_values_not_in_list(df, "Market name", MOF_MARKETS_LIST)
    df = remove_values_not_in_list(df, "Currency", MOF_CURRENCIES_DICT.keys())

    # Reformat specific columns
    df["Fair value"] = pd.to_numeric(df["Fair value"]) * 1000
    df["Price"] = pd.to_numeric(df["Price"]) / 100
    df["Nominal value"] = pd.to_numeric(df["Nominal value"])
    df["Rate of instrument type"] = pd.to_numeric(df["Rate of instrument type"])
    df["Rate of fund holding"] = pd.to_numeric(df["Rate of fund holding"])

    # Retrieve rows with errors
    error_indices_list.extend([i for i in origin_df.index if i not in df.index])

    return df, error_indices_list


def normalize_options(df, error_indices_list=list):
    '''
    - Format all rows - lowercase and no spaces to right / left
    - Remove rows with null values in instrument_number, currency and fair_value
    - Remove rows with market names and currencies that are not in MOF's list
    - Reformat Fair value x 1000
    - Reformat price value / 100
    - Reformat nominal value, rate of instrument type and rate of fund holding to numerical values
    '''

    origin_df = df

    # Format rows
    for col in df:
        df[col] = reformat_to_upper_lstrip_rstrip(df[col])

    # Remove rows with blank columns
    df = remove_rows_with_blank_in_columns(df, "Instrument number")
    df = remove_rows_with_blank_in_columns(df, "Currency")
    df = remove_rows_with_blank_in_columns(df, "Fair value")

    # Lookup in lists and remove non-conforming values
    df = remove_values_not_in_list(df, "Market name", MOF_MARKETS_LIST)
    df = remove_values_not_in_list(df, "Currency", MOF_CURRENCIES_DICT.keys())

    # Reformat specific columns
    df["Fair value"] = pd.to_numeric(df["Fair value"]) * 1000
    df["Price"] = pd.to_numeric(df["Price"]) / 100
    df["Nominal value"] = pd.to_numeric(df["Nominal value"])
    df["Rate of instrument type"] = pd.to_numeric(df["Rate of instrument type"])
    df["Rate of fund holding"] = pd.to_numeric(df["Rate of fund holding"])

    # Retrieve rows with errors
    error_indices_list.extend([i for i in origin_df.index if i not in df.index])

    return df, error_indices_list


def normalize_futures(df, error_indices_list=list):
    '''
    - Format all rows - lowercase and no spaces to right / left
    - Remove rows with null values in instrument_number, currency and fair_value
    - Remove rows with market names and currencies that are not in MOF's list
    - Reformat Fair value x 1000
    - Reformat price value / 100
    - Reformat nominal value, rate of instrument type and rate of fund holding to numerical values
    '''

    origin_df = df

    # Format rows
    for col in df:
        df[col] = reformat_to_upper_lstrip_rstrip(df[col])

    # Remove rows with blank columns
    df = remove_rows_with_blank_in_columns(df, "Instrument number")
    df = remove_rows_with_blank_in_columns(df, "Currency")
    df = remove_rows_with_blank_in_columns(df, "Fair value")

    # Lookup in lists and remove non-conforming values
    df = remove_values_not_in_list(df, "Market name", MOF_MARKETS_LIST)
    df = remove_values_not_in_list(df, "Currency", MOF_CURRENCIES_DICT.keys())

    # Reformat specific columns
    df["Fair value"] = pd.to_numeric(df["Fair value"]) * 1000
    df["Price"] = pd.to_numeric(df["Price"]) / 100
    df["Nominal value"] = pd.to_numeric(df["Nominal value"])
    df["Rate of instrument type"] = pd.to_numeric(df["Rate of instrument type"])
    df["Rate of fund holding"] = pd.to_numeric(df["Rate of fund holding"])

    # Retrieve rows with errors
    error_indices_list.extend([i for i in origin_df.index if i not in df.index])

    return df, error_indices_list


def normalize_structured_product(df, error_indices_list=list):
    '''
    - Format all rows - lowercase and no spaces to right / left
    - Remove rows with null values in instrument_number, currency and fair_value
    - Remove rows with currencies that are not in MOF's list
    - Format purchase_date as date type
    - Reformat Fair value x 1000
    - Reformat price value / 100
    - Reformat duration, rate, yield to maturity, nominal value, coupon, rate of register, rate of instrument type and
      rate of fund holding to numerical values
    '''

    origin_df = df

    # Format rows
    for col in df:
        df[col] = reformat_to_upper_lstrip_rstrip(df[col])

    # Remove rows with blank columns
    df = remove_rows_with_blank_in_columns(df, "Instrument number")
    df = remove_rows_with_blank_in_columns(df, "Currency")
    df = remove_rows_with_blank_in_columns(df, "Fair value")

    # Lookup in lists and remove non-conforming values
    df = remove_values_not_in_list(df, "Currency", MOF_CURRENCIES_DICT.keys())

    # Reformat specific columns
    df["Purchase date"] = pd.to_datetime(df["Purchase date"], dayfirst=True)
    df["Fair value"] = pd.to_numeric(df["Fair value"]) * 1000
    df["Price"] = pd.to_numeric(df["Price"]) / 100
    df["Duration"] = pd.to_numeric(df["Duration"])
    df["Rate"] = pd.to_numeric(df["Rate"])
    df["Yield to maturity"] = pd.to_numeric(df["Yield to maturity"])
    df["Nominal value"] = pd.to_numeric(df["Nominal value"])
    df["Rate of register"] = pd.to_numeric(df["Rate of register"])
    df["Rate of instrument type"] = pd.to_numeric(df["Rate of instrument type"])
    df["Rate of fund holding"] = pd.to_numeric(df["Rate of fund holding"])

    # Retrieve rows with errors
    error_indices_list.extend([i for i in origin_df.index if i not in df.index])

    return df, error_indices_list

