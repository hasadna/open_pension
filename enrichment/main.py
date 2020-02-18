import json
import pandas as pd

from lookups.consts import ALL_INSTRUMENT_TYPES, GOVERNMENTAL_BONDS, CASH

from enrich.enrich_instruments import enrich_gov_bonds
from lookups.utils import send_enriched_data
from normalize.instruments_norm import normalize_gov_bonds

PATH = r"C:\Hasadna\files\511751513_psum_0319.json"


def load_json_from_file(json_file_path):
    with open(json_file_path) as f:
        loaded_dict = json.load(f)
    return loaded_dict


def load_dict_for_enrichment(en_dict):
    dfs_dict = dict()
    for k, v in en_dict.items():
        dfs_dict[k] = pd.DataFrame(v)
    return dfs_dict



def save_df_to_path(df, path):
    pass


norm_switcher = {
    GOVERNMENTAL_BONDS: normalize_gov_bonds
}

enrich_switcher = {
    GOVERNMENTAL_BONDS: enrich_gov_bonds
}


if __name__ == '__main__':
    dfs_dict = load_dict_for_enrichment(load_json_from_file(PATH))
    new_df = pd.DataFrame()

    for instrument in ALL_INSTRUMENT_TYPES:
        if norm_switcher.get(instrument):
            df = dfs_dict[instrument]
            normed_df = norm_switcher[instrument](df)
            enriched_df = enrich_switcher[instrument](normed_df)
            send_enriched_data(enriched_df)



    # # Normalize data in DataFrame for processing
    # normalized_df = normalize_data(dfs_dict)
    #
    # # ISIN enrichment
    # normalized_df = isin_enrichment(normalized_df)
    #
    # # Append data from this instrument to general DataFrame
    # new_df = new_df.append(normalized_df)
    #
    # # Save data to new JSON file
    #
    # print(new_df)
