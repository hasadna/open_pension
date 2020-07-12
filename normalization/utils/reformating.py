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


def to_date(dic: dict, value: str) -> date:
    try:
        return datetime.strptime(dic[value], "%d/%m/%Y")
    except ValueError:
        raise ValueError("Invalid '{}' value: {}".format(value, dic.get(value)))