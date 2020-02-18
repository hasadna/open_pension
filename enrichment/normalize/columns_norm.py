# --- Specific column normalization functions ---
from lookups.consts import INSTRUMENT_NAME_COLUMNS, INSTRUMENT_NUM_COLUMNS, MARKET_NAME_COLUMNS, MARKETS_LIST, \
    CURRENCY_COLUMNS, CURRENCIES
from lookups.utils import remove_null_values, format_bank_account_numbers, remove_values_not_in_list, \
    convert_date_to_iso_str


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
    df = remove_values_not_in_list("Currency", CURRENCY_COLUMNS, CURRENCIES.keys(), df)
    df["Currency"] = df["Currency"].astype("category")

    return df


def normalize_purchase_date(df):
    df = remove_null_values("Purchase date", CURRENCY_COLUMNS, df)
    df["Purchase date"] = convert_date_to_iso_str(df["Purchase date"], "%d/%m/%Y")

    return df

