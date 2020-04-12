import json
import os

from pandas.core.dtypes.common import is_string_dtype

from consts import ISIN_PATTERN
import pandas as pd

COMPLETED_PATH = os.path.join(os.path.abspath(os.path.dirname(__file__)), "..", "completed")


def check_isin_validity(isin):
    # Check non-null value
    if pd.isna(isin):
        return False
    # Check regex validity
    if not ISIN_PATTERN.match(isin.upper()):
        return False
    # Convert from base36 to base10 and check the checksum with luhn's algorithm
    return validate_luhn_algo(base36_decode_isin(isin))


def base36_decode_isin(isin):
    base_10_str = ''
    for i in isin:
        base_10_str += str(int(i, 36))
    return base_10_str


def sum_digits(digit):
    if digit < 10:
        return digit
    else:
        sum = (digit % 10) + (digit // 10)
        return sum


def luhn_algo(isin_num):
    # reverse the credit card number
    isin_num = isin_num[::-1]
    # convert to integer list
    isin_num = [int(x) for x in isin_num]
    # double every second digit
    doubled_second_digit_list = list()
    digits = list(enumerate(isin_num, start=1))
    for index, digit in digits:
        if index % 2 == 0:
            doubled_second_digit_list.append(digit * 2)
        else:
            doubled_second_digit_list.append(digit)

    # add the digits if any number is more than 9
    doubled_second_digit_list = [sum_digits(x) for x in doubled_second_digit_list]
    # sum all digits
    sum_of_digits = sum(doubled_second_digit_list)
    # return True or False
    return sum_of_digits % 10


def validate_luhn_algo(num):
    return luhn_algo(num) == 0


def add_luhn_checksum(num):
    checksum = 10 - luhn_algo(num + "0")
    return num + str(checksum)


def create_il_isin(num):
    temp_isin = add_luhn_checksum(base36_decode_isin("IL" + num.zfill(9)))
    return "IL" + temp_isin[-10:]


# def format_bank_account_numbers(num):
#     # If in format <bank>-<account>, return account. Else, return the first number
#     if isinstance(num, str):
#         split_num = num.split('-')
#         return split_num[1] if len(split_num) > 1 else split_num[0]
#     else:
#         return num


def save_data_to_file(json_string, file_name="", errors=False):
    if errors:
        error_file_name = file_name.split(".")
        error_file_name.insert(-1, "errors")
        file_name = "{}_{}.{}".format(*error_file_name)

    full_path = os.path.join(COMPLETED_PATH, file_name)
    with open(full_path, 'w') as f:
        f.write(json_string)


def remove_rows_with_blank_in_columns(df, col_name):
    ''' Receives a Dataframe and column name and removes all rows which have nulls or blanks in that column '''
    return df[(df[col_name] != '') & (~df[col_name].isna())]


def reformat_to_upper_lstrip_rstrip(s):
    ''' If series is of type string, update series to be lowercase and strip left/right spaces '''
    if is_string_dtype(s):
        s = s.str.upper().str.lstrip().str.rstrip()
    return s


def remove_values_not_in_list(df, col_name, val_list):
    ''' Removes rows if a values in the column is not in the given values list '''
    return df[df[col_name].isin(val_list)]


def join_json_strings(json_list):
    ''' Create a single json string from a list of json strings '''
    json_loads_df_list = []
    for json_string in json_list:
        json_loads_df_list.append(json.loads(json_string))

    return json.dumps(json_loads_df_list)


if __name__ == "__main__":
    # print(validate_luhn_algo(base36_decode_isin("IL0004440181")))

    # print(add_luhn_checksum(base36_decode_isin("IL000444018")))
    # print(check_isin_validity("IL0004440181"))
    print(create_il_isin("1100957"))
    print(create_il_isin("1123272"))

    # TASE  + all digits