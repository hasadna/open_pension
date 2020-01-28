import pandas as pd
from enrichment.lookups.consts import TASE_STOCK_MASK_TYPES
from enrichment.lookups.utils import create_il_isin, return_isin_or_none


def tase_to_isin(df):
    # TODO - finish logic
    # 1. Test if TASE and industry number all digits and instrument in TASE_STOCK_MASK_TYPES - add to dict to test
    # 2. Test with openfigi if isin exists


    instrument_numbers = df.loc[df["Market name"] == "TASE"]["Instrument number"]

    tase_stock_mask = df[df["Market name"] == "TASE" and df["Investment"] in TASE_STOCK_MASK_TYPES]

    tase_isin_numbers = instrument_numbers.apply(lambda x: create_il_isin(x))
    instrument_numbers_df = pd.concat([instrument_numbers, tase_isin_numbers],
                                      axis=1,
                                      keys=["Instrument number", "en_instrument_number_isin"])
    return instrument_numbers_df


def isin_enrichment(df):

    # Test for ISIN numbers in "Instrument Number" and copy them to "en_instrument_number_isin"
    df["en_instrument_number_isin"] = df["Instrument number"].apply(lambda x: return_isin_or_none(x))

    # Convert TASE numbers into ISIN numbers and store in new column ("instrument_number_en_isin")
    # Only use instruments from the ISIN_INSTRUMENTS_LIST
    tase_isin_numbers_df = pd.DataFrame(columns=["Instrument number", "en_instrument_number_isin"])
    # if "Market name" in df.columns and not df.loc[df["Market name"] == "TASE"].empty:
    #     tase_isin_numbers_df = tase_to_isin(df)
    # df = pd.merge(left=df, right=tase_isin_numbers_df, on="Instrument number", how="left")

    return df