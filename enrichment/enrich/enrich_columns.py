from lookups.utils import create_il_isin, check_isin_validity


def tase_to_isin(tase_number_series):
    return tase_number_series.apply(lambda x: create_il_isin(x))


def isin_enrichment(df):
    """
    Checks validity of ISIN numbers in the DF. The valid ISIN numbers are added to the new column
    "en_instrument_number_isin".
    Instrument numbers that are recognized as TASE numbers are converted to ISIN numbers and also sent to the new column.
    Invalid numbers are sent to the reject function.

    :param df: The DataFrame with the ISIN values to check
    :return: an identical DataFrame with the new column "en_instrument_number_isin". This column holds only Valid ISIN
    numbers.
    """

    # Apply ISIN testing function to instrument numbers and add correct isin numbers to new column, otherwise add None
    isin_mask = df["Instrument number"].apply(lambda num: check_isin_validity(num))
    df["en_instrument_number_isin"] = df["Instrument number"].loc[isin_mask]

    # create isin for TASE and send to new column
    tase_number_mask = df["en_instrument_number_isin"].bool and df["Market name"] == "TASE"
    df["en_instrument_number_isin"].mask(tase_number_mask, tase_to_isin(df["Instrument number"]), inplace=True)

    return df
