import json
import os
import time

import requests

from ..consts import OPEN_FIGI_LARGE_BULK, OPEN_FIGI_SMALL_BULK
from ..utils import check_isin_validity


def create_json_for_output(resp, isin_list):
    # Add Isin to open figi data
    open_figi_resp = json.loads(resp)
    for index, val in enumerate(open_figi_resp):
        open_figi_resp[index]["isin"] = isin_list[index]
    return json.dumps(open_figi_resp)


def check_isin_open_figi(isin_list):
    data = [{"idType": "ID_ISIN", "idValue": isin} for isin in isin_list]
    ret = requests.post(url="https://api.openfigi.com/v2/mapping",
                        data=json.dumps(data),
                        headers={
                            "Content-Type": "application/json",
                            "X-OPENFIGI-APIKEY": os.environ.get("X-OPENFIGI-APIKEY")
                        })

    print("Waiting 3 seconds to continue")
    time.sleep(0.2)
    return ret.content


def create_isin_list(isin_list):
    # Check validity of numbers in the list.
    # Return a list of reject and approved isin numbers
    approved_isin_list = [isin for isin in isin_list if check_isin_validity(isin)]
    rejected_isin_list = set(approved_isin_list).symmetric_difference(set(isin_list))
    return approved_isin_list, rejected_isin_list


def create_bulks(isin_list):
    # Create bulks to send to OpenFIGI according to limits
    # Return a list of lists with isin numbers
    bulk_size = OPEN_FIGI_LARGE_BULK if os.environ.get("X-OPENFIGI-APIKEY", "") else OPEN_FIGI_SMALL_BULK

    # TODO - test this part to see if bulks correctly
    bulked_list = []
    for i in range((len(isin_list) * bulk_size - 1) // bulk_size):
        bulked_list.append(isin_list[i * bulk_size: (i + 1) * bulk_size])
    return bulked_list
