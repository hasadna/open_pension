from datetime import datetime
import os

from lookups.consts import ISIN_PATTERN, NULL_VALUES_LIST
import pandas as pd

REJECT_PATH = os.path.join(os.path.abspath(os.path.dirname(__file__)), "..", "rejected")
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


def reject_listings(df, file_name):
    # export listing as json and save locally
    df.to_json(os.path.join(REJECT_PATH, file_name), orient="records")


def format_bank_account_numbers(num):
    # If in format <bank>-<account>, return account. Else, return the first number
    if isinstance(num, str):
        split_num = num.split('-')
        return split_num[1] if len(split_num) > 1 else split_num[0]
    else:
        return num


def remove_null_values(column, investment_types_list, df):
    # Check for Blanks and send to reject_list

    # Create a new column to hold the indices for later use in removal from df
    temp_df = df
    temp_df["df_indices"] = temp_df.index

    # look only at rows which are of the relevant investment types
    test_columns_mask = temp_df[temp_df["Investment"].isin(investment_types_list)]

    # remove all null-value lines in the relevant rows
    error_df = test_columns_mask[test_columns_mask[column].isin(NULL_VALUES_LIST)]

    # output rejected rows for later analysis
    if not error_df.empty:
        reject_listings(error_df, "{}_{}_errors.json".format(temp_df["file_name"][0], column.lower().replace(" ", "_")))

    # return df without the rejected rows
    return df.drop(error_df["df_indices"])


def remove_values_not_in_list(column, investment_types_list, item_list, df):
    # Test if all values in "item_list" are in the list and remove errors to separate file

    # Create a new column to hold the indices for later use in removal from df
    temp_df = df
    temp_df["df_indices"] = temp_df.index

    # look only at rows which are of the relevant investment types
    test_columns_mask = temp_df[temp_df["Investment"].isin(investment_types_list)]

    # remove all rows that their values are not in the list
    error_df = test_columns_mask[~test_columns_mask[column].isin(item_list)]
    if not error_df.empty:
        reject_listings(error_df, "{}_{}_list_errors.json".format(temp_df["file_name"][0], column.lower().replace(" ", "_")))

    return df.drop(error_df["df_indices"])


def send_enriched_data(df):
    file_params = df.iloc[0]
    file_name = "{file}_{type}_{timestamp}.json".format(file=file_params['file_name'],
                                                        type=file_params["Investment"],
                                                        timestamp=datetime.now().strftime("%Y%m%dT%H%M%S"))
    df.to_json(os.path.join(COMPLETED_PATH, file_name), orient="records")


def convert_date_to_iso_str(ser, form):
    """
    Convert string dates from given format to ISO type strings
    :param ser: A series object holding date string
    :param form: The format of the dates in the series
    :return: a pandas Series of converted strings
    """

    return ser.apply(lambda x: norm_date(x))


def norm_date(date_str):
    day, month, year = date_str.split("/")
    day = day.zfill(2)
    month = month.zfill(2)
    if not len(year) == 4:
        prefix = "20" if int(year) < 50 else "19"
        year = "{}{}".format(prefix, year)

    return "{}-{}-{}".format(year, month, day)



if __name__ == "__main__":
    # print(validate_luhn_algo(base36_decode_isin("IL0004440181")))

    # print(add_luhn_checksum(base36_decode_isin("IL000444018")))
    # print(check_isin_validity("IL0004440181"))
    print(create_il_isin("1100957"))
    print(create_il_isin("1123272"))

    # TASE  + all digits