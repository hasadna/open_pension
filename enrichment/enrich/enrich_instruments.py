from enrich.enrich_columns import isin_enrichment


def enrich_gov_bonds(df):
    df = isin_enrichment(df)

    return df