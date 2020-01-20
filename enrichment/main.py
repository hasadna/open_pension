import json
import pandas as pd

from enrichment.enrich_data import isin_enrichment
from enrichment.normalize_data import normalize_data

PATH = r"C:\Hasadna\drive-download-20191202T182023Z-001\510773922_gsum_0118.json"


# Stages:
# Load JSON
# Create DFs to Test
    # ISIN format Mask -> ISIN
    # TASE and all nums -> ISIN ;
# Add "Instrument number (en) - ISIN"
# Create JSON from DF and save local (new file)


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


if __name__ == '__main__':
    dfs_dict = load_dict_for_enrichment(load_json_from_file(PATH))
    new_df = pd.DataFrame()

    # Normalize data in DataFrame for processing
    normalized_df = normalize_data(dfs_dict)

    # ISIN enrichment
    normalized_df = isin_enrichment(normalized_df)

    # Append data from this instrument to general DataFrame
    new_df = new_df.append(normalized_df)

    print(new_df)
