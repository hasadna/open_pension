import pandas as pd

from ..lookups.lookup_lists import MOF_MARKETS_LIST, MOF_CURRENCIES_DICT, MOF_REAL_ESTATE_TYPES

from ..utils import remove_rows_with_blank_in_columns, remove_values_not_in_list, \
    reformat_to_upper_lstrip_rstrip


def normalize_cash(df, error_indices_list=list):
    '''
    - Format all rows - lowercase and no spaces to right / left
    - Remove rows with null values in Issuer number, currency and fair_value
    - Remove rows with currencies that are not in MOF's list
    - Reformat Fair value x 1000
    - Reformat rate, yield to maturity, rate of instrument type and rate of fund holding to numerical values
    '''

    origin_df = df

    # Format rows
    for col in df:
        df[col] = reformat_to_upper_lstrip_rstrip(df[col])

    # Remove rows with blank columns
    df = remove_rows_with_blank_in_columns(df, "Issuer number")
    df = remove_rows_with_blank_in_columns(df, "Currency")

    # Lookup in lists and remove non-conforming values
    df = remove_values_not_in_list(df, "Currency", MOF_CURRENCIES_DICT.keys())

    # Reformat specific columns
    df["Fair value"] = pd.to_numeric(df["Fair value"]) * 1000
    df["Rate"] = pd.to_numeric(df["Rate"])
    df["Yield to maturity"] = pd.to_numeric(df["Yield to maturity"])
    df["Rate of instrument type"] = pd.to_numeric(df["Rate of instrument type"])
    df["Rate of fund holding"] = pd.to_numeric(df["Rate of fund holding"])

    # Retrieve rows with errors
    error_indices_list.extend([i for i in origin_df.index if i not in df.index])

    return df, error_indices_list


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
    # df["coupon"] = pd.to_numeric(df["coupon"])
    df["Rate of register"] = pd.to_numeric(df["Rate of register"])
    df["Rate of instrument type"] = pd.to_numeric(df["Rate of instrument type"])
    df["Rate of fund holding"] = pd.to_numeric(df["Rate of fund holding"])

    # Retrieve rows with errors
    error_indices_list.extend([i for i in origin_df.index if i not in df.index])

    return df, error_indices_list


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


def normalize_stocks_nt(df, error_indices_list=list):
    '''
    - Format all rows - lowercase and no spaces to right / left
    - Remove rows with null values in instrument_number, currency
    - Remove rows with currencies that are not in MOF's list
    - Replace Fair value "None" with 0
    - Reformat Fair value x 1000
    - Reformat price value / 100
    - Reformat nominal value, rate of register, rate of instrument type and
      rate of fund holding to numerical values
    '''

    origin_df = df

    # Format rows
    for col in df:
        df[col] = reformat_to_upper_lstrip_rstrip(df[col])

    # Remove rows with blank columns
    df = remove_rows_with_blank_in_columns(df, "Instrument number")
    df = remove_rows_with_blank_in_columns(df, "Currency")

    # Lookup in lists and remove non-conforming values
    df = remove_values_not_in_list(df, "Currency", MOF_CURRENCIES_DICT.keys())

    # Replace "None"
    df["Fair value"] = df["Fair value"].fillna(0)

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


def normalize_gov_bonds_nt(df, error_indices_list=list):
    '''
    - Format all rows - lowercase and no spaces to right / left
    - Remove rows with null values in instrument_number, currency
    - Remove rows with currencies that are not in MOF's list
    - Format purchase_date as date type
    - Replace Fair value "None" with 0
    - Reformat Fair value x 1000
    - Reformat price value / 100
    - Reformat duration, rate, yield to maturity, nominal value, rate of register, rate of instrument type and
      rate of fund holding to numerical values
    '''

    origin_df = df

    # Format rows
    for col in df:
        df[col] = reformat_to_upper_lstrip_rstrip(df[col])

    # Remove rows with blank columns
    df = remove_rows_with_blank_in_columns(df, "Instrument number")
    df = remove_rows_with_blank_in_columns(df, "Currency")

    # Lookup in lists and remove non-conforming values
    df = remove_values_not_in_list(df, "Currency", MOF_CURRENCIES_DICT.keys())

    # Replace "None"
    df["Fair value"] = df["Fair value"].fillna(0)

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


def normalize_commercial_bonds_nt(df, error_indices_list=list):
    '''
    - Format all rows - lowercase and no spaces to right / left
    - Remove rows with null values in instrument_number, currency
    - Remove rows with currencies that are not in MOF's list
    - Format purchase_date as date type
    - Replace Fair value "None" with 0
    - Reformat Fair value x 1000
    - Reformat price value / 100
    - Reformat duration, rate, yield to maturity, nominal value, rate of register, rate of instrument type and
      rate of fund holding to numerical values
    '''

    origin_df = df

    # Format rows
    for col in df:
        df[col] = reformat_to_upper_lstrip_rstrip(df[col])

    # Remove rows with blank columns
    df = remove_rows_with_blank_in_columns(df, "Instrument number")
    df = remove_rows_with_blank_in_columns(df, "Currency")

    # Lookup in lists and remove non-conforming values
    df = remove_values_not_in_list(df, "Currency", MOF_CURRENCIES_DICT.keys())

    # Replace "None"
    df["Fair value"] = df["Fair value"].fillna(0)

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


def normalize_company_bonds_nt(df, error_indices_list=list):
    '''
    - Format all rows - lowercase and no spaces to right / left
    - Remove rows with null values in instrument_number, currency
    - Remove rows with currencies that are not in MOF's list
    - Format purchase_date as date type
    - Replace Fair value "None" with 0
    - Reformat Fair value x 1000
    - Reformat price value / 100
    - Reformat duration, rate, yield to maturity, nominal value, rate of register, rate of instrument type and
      rate of fund holding to numerical values
    '''

    origin_df = df

    # Format rows
    for col in df:
        df[col] = reformat_to_upper_lstrip_rstrip(df[col])

    # Remove rows with blank columns
    df = remove_rows_with_blank_in_columns(df, "Instrument number")
    df = remove_rows_with_blank_in_columns(df, "Currency")

    # Lookup in lists and remove non-conforming values
    df = remove_values_not_in_list(df, "Currency", MOF_CURRENCIES_DICT.keys())

    # Replace "None"
    df["Fair value"] = df["Fair value"].fillna(0)

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


def normalize_mutual_funds_nt(df, error_indices_list=list):
    '''
    - Format all rows - lowercase and no spaces to right / left
    - Remove rows with null values in instrument_number, currency and fair_value
    - Remove rows with currencies that are not in MOF's list
    - Replace Fair value "None" with 0
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

    # Lookup in lists and remove non-conforming values
    df = remove_values_not_in_list(df, "Currency", MOF_CURRENCIES_DICT.keys())

    # Replace "None"
    df["Fair value"] = df["Fair value"].fillna(0)

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


def normalize_warrants_nt(df, error_indices_list=list):
    '''
    - Format all rows - lowercase and no spaces to right / left
    - Remove rows with null values in instrument_number, currency
    - Remove rows with currencies that are not in MOF's list
    - Replace Fair value "None" with 0
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

    # Lookup in lists and remove non-conforming values
    df = remove_values_not_in_list(df, "Currency", MOF_CURRENCIES_DICT.keys())

    # Replace "None"
    df["Fair value"] = df["Fair value"].fillna(0)

    # Reformat specific columns
    df["Fair value"] = pd.to_numeric(df["Fair value"]) * 1000
    df["Price"] = pd.to_numeric(df["Price"]) / 100
    df["Nominal value"] = pd.to_numeric(df["Nominal value"])
    df["Rate of instrument type"] = pd.to_numeric(df["Rate of instrument type"])
    df["Rate of fund holding"] = pd.to_numeric(df["Rate of fund holding"])

    # Retrieve rows with errors
    error_indices_list.extend([i for i in origin_df.index if i not in df.index])

    return df, error_indices_list


def normalize_options_nt(df, error_indices_list=list):
    '''
    - Format all rows - lowercase and no spaces to right / left
    - Remove rows with null values in instrument_number, currency
    - Remove rows with currencies that are not in MOF's list
    - Replace Fair value "None" with 0
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

    # Lookup in lists and remove non-conforming values
    df = remove_values_not_in_list(df, "Currency", MOF_CURRENCIES_DICT.keys())

    # Replace "None"
    df["Fair value"] = df["Fair value"].fillna(0)

    # Reformat specific columns
    df["Fair value"] = pd.to_numeric(df["Fair value"]) * 1000
    df["Price"] = pd.to_numeric(df["Price"]) / 100
    df["Nominal value"] = pd.to_numeric(df["Nominal value"])
    df["Rate of instrument type"] = pd.to_numeric(df["Rate of instrument type"])
    df["Rate of fund holding"] = pd.to_numeric(df["Rate of fund holding"])

    # Retrieve rows with errors
    error_indices_list.extend([i for i in origin_df.index if i not in df.index])

    return df, error_indices_list


def normalize_futures_contract_nt(df, error_indices_list=list):
    '''
    - Format all rows - lowercase and no spaces to right / left
    - Remove rows with null values in instrument_number, currency
    - Remove rows with currencies that are not in MOF's list
    - Replace Fair value "None" with 0
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

    # Lookup in lists and remove non-conforming values
    df = remove_values_not_in_list(df, "Currency", MOF_CURRENCIES_DICT.keys())

    # Replace "None"
    df["Fair value"] = df["Fair value"].fillna(0)

    # Reformat specific columns
    df["Fair value"] = pd.to_numeric(df["Fair value"]) * 1000
    df["Price"] = pd.to_numeric(df["Price"]) / 100
    df["Nominal value"] = pd.to_numeric(df["Nominal value"])
    df["Rate of instrument type"] = pd.to_numeric(df["Rate of instrument type"])
    df["Rate of fund holding"] = pd.to_numeric(df["Rate of fund holding"])

    # Retrieve rows with errors
    error_indices_list.extend([i for i in origin_df.index if i not in df.index])

    return df, error_indices_list


def normalize_structured_product_nt(df, error_indices_list=list):
    '''
    - Format all rows - lowercase and no spaces to right / left
    - Remove rows with null values in instrument_number, currency
    - Remove rows with currencies that are not in MOF's list
    - Format purchase_date as date type
    - Replace Fair value "None" with 0
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

    # Lookup in lists and remove non-conforming values
    df = remove_values_not_in_list(df, "Currency", MOF_CURRENCIES_DICT.keys())

    # Replace "None"
    df["Fair value"] = df["Fair value"].fillna(0)

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


def normalize_loans(df, error_indices_list=list):
    pass


def normalize_security_dep_over_three_months(df, error_indices_list=list):
    pass


def normalize_real_estate(df, error_indices_list=list):
    '''
    - Format all rows - lowercase and no spaces to right / left
    - Remove rows with null values in currency
    - Remove rows with real estate types and currencies that are not in MOF's list
    - Format Date of valuation as date type
    - Reformat Fair value x 1000
    - Reformat Holding period return/yield, rate of instrument type and rate of fund holding to numerical values
    '''

    origin_df = df

    # Format rows
    for col in df:
        df[col] = reformat_to_upper_lstrip_rstrip(df[col])

    # Remove rows with blank columns
    df = remove_rows_with_blank_in_columns(df, "Currency")

    # Lookup in lists and remove non-conforming values
    df = remove_values_not_in_list(df, "Currency", MOF_CURRENCIES_DICT.keys())
    df = remove_values_not_in_list(df, "Real estate type", MOF_REAL_ESTATE_TYPES)

    # Reformat specific columns
    df["Date of valuation"] = pd.to_datetime(df["Date of valuation"], dayfirst=True)
    df["Fair value"] = pd.to_numeric(df["Fair value"]) * 1000
    df["Holding period return/yield"] = pd.to_numeric(df["Holding period return/yield"])
    df["Rate of instrument type"] = pd.to_numeric(df["Rate of instrument type"])
    df["Rate of fund holding"] = pd.to_numeric(df["Rate of fund holding"])

    # Retrieve rows with errors
    error_indices_list.extend([i for i in origin_df.index if i not in df.index])

    return df, error_indices_list


def normalize_investment_in_held_companies(df, error_indices_list=list):
    pass


def normalize_other_investments(df, error_indices_list=list):
    pass


def normalize_balance_investment_commitment(df, error_indices_list=list):
    pass


def normalize_coordinated_cost_company_bonds(df, error_indices_list=list):
    pass


def normalize_coordinated_cost_borrowing_credit(df, error_indices_list=list):
    pass




