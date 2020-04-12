import json

import pandas as pd

from consts import ALL_INSTRUMENT_TYPES, GOVERNMENTAL_BONDS

from enrich.enrich_instruments import enrich_gov_bonds
from utils import join_json_strings
from normalize.instruments_norm import normalize_gov_bonds

PATH = r"C:\Hasadna\0219_all_jsons"
FILE_NAME = r'512065202_gsum_0219.json'


def load_json_from_file(json_file_path):
    with open(json_file_path) as f:
        loaded_dict = json.load(f)
    return loaded_dict


def load_dict_for_enrichment(en_dict):
    dfs_dict = dict()
    for k, v in en_dict.items():
        dfs_dict[k] = pd.DataFrame(v)
    return dfs_dict


norm_switcher = {
    GOVERNMENTAL_BONDS: normalize_gov_bonds
}

enrich_switcher = {
    GOVERNMENTAL_BONDS: enrich_gov_bonds
}


def process_json(data):
    dfs_dict = load_dict_for_enrichment(data)
    error_indices_list = []

    processed_data = []
    errors_data = []

    for instrument in ALL_INSTRUMENT_TYPES:
        if instrument in dfs_dict.keys():
            df = dfs_dict.get(instrument)
            if norm_switcher.get(instrument):
                df, error_indices_list = norm_switcher[instrument](df, error_indices_list)

            if enrich_switcher.get(instrument):
                df, error_indices_list = enrich_switcher[instrument](df, error_indices_list)

            processed_data.append(df.to_json(orient="records"))  # adding as json and not dict to preserve nulls
            errors_data.append(df[df.index.isin(error_indices_list)].to_json(orient="records"))
            # send_enriched_data(enriched_df)

    processed_json = join_json_strings(processed_data)
    errors_json = join_json_strings(errors_data)

    # save_data_to_file(processed_json, file_name=FILE_NAME)
    # save_data_to_file(errors_json, file_name=FILE_NAME, errors=True)
    return processed_json, errors_json

