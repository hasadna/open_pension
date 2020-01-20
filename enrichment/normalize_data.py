import pandas as pd

from enrichment.lookups.consts import DF_COLUMNS, INSTRUMENT_TYPES


def normalize_data(df):
    normalized_df = pd.DataFrame(columns=DF_COLUMNS)

    # Flatten JSON file
    for instrument in INSTRUMENT_TYPES:
        normalized_df = normalized_df.append(df[instrument])

    # Strip whitespace from instrument numbers
    normalized_df["Instrument number"] = normalized_df["Instrument number"].apply(lambda x: x.strip() if pd.notnull(x) else x)

    return normalized_df