import json
from datetime import date, datetime


def values_to_upper_and_remove_spaces(instrument_dict: dict) -> dict:
    for key, value in instrument_dict.items():
        if isinstance(value, str):
            instrument_dict[key] = reformat_to_upper_lstrip_rstrip(value)
    return instrument_dict


def reformat_to_upper_lstrip_rstrip(value: str) -> str:
    return value.rstrip().lstrip().upper()


def to_float(dic: dict, value: str) -> float:
    try:
        return float(dic[value])
    except ValueError:
        raise ValueError("Invalid '{}' value: {}".format(value, dic.get(value)))


def to_date(dic: dict, value: str) -> str:
    try:
        date = dic[value]
        date_format = "%d/%m/%Y"
        if year_with_two_digits(date):
            date_format = "%d/%m/%y"
        return datetime.strptime(date, date_format).strftime("%Y-%m-%d")

    except ValueError:
        raise ValueError("Invalid '{}' value: {}".format(value, dic.get(value)))


def year_with_two_digits(date: str) -> bool:
    return len(date.split('/')[2]) == 2


def flatten_instrument_dict(instrument_dict):
    instrument_flat_list = []

    for _, value in instrument_dict.items():
        instrument_flat_list.extend(value)

    return instrument_flat_list