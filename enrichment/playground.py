
import json
import os

from .process import process_json

if __name__ == "__main__":
    PATH = r"C:\Hasadna\0219_all_jsons"
    FILE_NAME = r'512065202_gsum_0219'

    with open(os.path.join(PATH, "{}.json".format(FILE_NAME)), "rb") as f:
        json_data = json.load(f)
    process_json(json_data)


# ---- OpenFigi ---
# if __name__ == "__main__":
#
#     # Receive Bulk data from json file
#     # check if file in json format - if not, send an error
#     # Load Json into dictionary (if from service, load from request)
#     isin_list = REJECTED_EDITED
#     approved_isin_list, rejected_isin_list = create_isin_list(isin_list)
#     bulks_list = create_bulks(approved_isin_list)
#     # If exists OPEN_FIGI_API - create bulks of 100, if not, create bulks of 5
#     # Send to openfigi to check isin
#     # send response back - save to file or send as response
#
#     isin_check_list = []  # store 5 isin numbers to check in open_figi - less api calls
#     count = 32
#     for index, isin in enumerate(REJECTED_EDITED):
#         if check_isin_validity(isin):
#             isin_check_list.append(isin)
#             if len(isin_check_list) == 100 or index == len(REJECTED_EDITED) - 1:
#                 resp = check_isin_open_figi(isin_check_list)
#                 out = create_json_for_output(resp, isin_check_list)
#                 with open("isin_lists/isin_list{}.json".format(str(count)), "wb+") as f:
#                     f.writelines(out)
#                 isin_check_list = []
#                 count += 1
#         else:
#             out = isin + "\n"
#             with open("isin_lists/reject_list2.txt", "ab+") as f:
#                 f.writelines(out)
'''
https://rosettacode.org/wiki/Validate_International_Securities_Identification_Number

Test Cases

US0378331005	valid
US0373831005	not valid	The transposition typo is caught by the checksum constraint.
U50378331005	not valid	The substitution typo is caught by the format constraint.
US03378331005	not valid	The duplication typo is caught by the format constraint.
AU0000XVGZA3	valid
FR0000988040	valid
'''


# -- Process --
# send_enriched_data(enriched_df)

# save_data_to_file(processed_json, file_name=FILE_NAME)
# save_data_to_file(errors_json, file_name=FILE_NAME, errors=True)
