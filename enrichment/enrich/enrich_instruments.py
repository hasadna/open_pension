from enrich.enrich_columns import isin_enrichment


def enrich_gov_bonds(df, error_indices_list=list):
    '''
    - Add row with instrument number as ISIN
    '''

    origin_df = df

    df["en_instrument_number_isin"] = isin_enrichment(df)

    error_indices_list.extend([i for i in origin_df.index if i not in df.index])

    return df, error_indices_list
