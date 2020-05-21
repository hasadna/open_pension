from ..utils import create_il_isin, check_isin_validity
import pandas as pd


def isin_enrichment(df):
    """
    Receives a DataFrame and tries converting instrument numbers to ISIN numbers
    - Checks validity of ISIN numbers in the DF.
    - Instrument numbers that are recognized as TASE numbers are converted to ISIN numbers

    Returns a series with isin numbers.
    All instrument numbers that were not converted will be returned as NaN.

    """

    enriched_isin = pd.Series()

    # Apply ISIN testing function to instrument numbers and add correct isin numbers to new column, otherwise add None
    isin_mask = df["Instrument number"].apply(lambda num: check_isin_validity(num))
    isin_ser = df["Instrument number"].loc[isin_mask]
    enriched_isin = pd.concat([enriched_isin, isin_ser])

    # create isin for TASE and send to new column
    tase_number_mask = (~isin_mask) & (df["Market name"] == "TASE")
    tase_number_ser = df[tase_number_mask]["Instrument number"].apply(create_il_isin)
    enriched_isin = pd.concat([enriched_isin, tase_number_ser])

    return enriched_isin
