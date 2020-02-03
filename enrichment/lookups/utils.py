import os

from .consts import ISIN_PATTERN
import pandas as pd

REJECT_PATH = os.path.join(os.path.abspath(os.path.dirname(__file__)), "..", "rejected")

def return_isin_or_none(isin):
    return isin if pd.notna(isin) and check_isin_validity(isin) else None


def check_isin_validity(isin):
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


if __name__ == "__main__":
    # print(validate_luhn_algo(base36_decode_isin("IL0004440181")))

    # print(add_luhn_checksum(base36_decode_isin("IL000444018")))
    # print(check_isin_validity("IL0004440181"))
    print(create_il_isin("1100957"))

    # TASE  + all digits