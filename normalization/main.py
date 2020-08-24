import json
from normalization.utils.validation import in_valid_instruments_list, in_valid_currency_list, \
    needs_issuer_number, needs_fair_value, needs_valid_currency, in_valid_market_name_list, needs_instrument_number
from normalization.utils.reformating import values_to_upper_and_remove_spaces, to_float, to_date, \
    flatten_instrument_dict


def process_instruments_dict(instrument_json: dict) -> list:
    '''
    Receives a json file with multiple instrument types and entries and returns normalized (flattened) json
    '''
    instrument_list = flatten_instrument_dict(instrument_json)
    instrument_list_normed = []

    for entry in instrument_list:
        entry_normed = process_entry(entry)
        instrument_list_normed.append(entry_normed)
    return instrument_list_normed


def process_entry(instrument_dict: dict) -> dict:
    '''
    Receives a single instrument entry as a dictionary and returns the normalized values
    '''

    instrument_dict = values_to_upper_and_remove_spaces(instrument_dict)
    validate_values(instrument_dict)

    instrument_dict = normalize_values(instrument_dict)

    return instrument_dict


def validate_values(instrument_dict):
    instrument_type = instrument_dict.get("Investment")
    if not in_valid_instruments_list(instrument_type):
        raise ValueError("Invalid instrument type: {}".format(instrument_type))

    issuer_number = instrument_dict.get("Issuer number")
    if needs_issuer_number(instrument_type) and not issuer_number:
        raise ValueError("Missing 'Issuer Number' value")

    instrument_number = instrument_dict.get("Instrument number")
    if needs_instrument_number(instrument_type) and not instrument_number:
        raise ValueError("Missing 'Instrument Number' value")

    fair_value = instrument_dict.get("Fair value")
    if needs_fair_value(instrument_type) and not fair_value:
        raise ValueError("Missing 'Fair Value' value")

    currency = instrument_dict.get("Currency")
    if needs_valid_currency(instrument_type) and not currency:
        raise ValueError("Missing 'Currency' value")
    if currency and not in_valid_currency_list(currency):
        raise ValueError("Invalid currency type: {}".format(currency))

    market_name = instrument_dict.get("Market name")
    if market_name and not in_valid_market_name_list(market_name):
        raise ValueError("Invalid market name: {}".format(market_name))


def normalize_values(instrument_dict):

    if instrument_dict.get("Purchase date"):
        instrument_dict["Purchase date"] = to_date(instrument_dict, "Purchase date")
    if instrument_dict.get("Fair value"):
        instrument_dict["Fair value"] = to_float(instrument_dict, "Fair value") * 1000
    if instrument_dict.get("Price"):
        instrument_dict["Price"] = to_float(instrument_dict, "Price") / 100
    if instrument_dict.get("Duration"):
        instrument_dict["Duration"] = to_float(instrument_dict, "Duration")
    if instrument_dict.get("dividend"):
        instrument_dict["dividend"] = to_float(instrument_dict, "dividend")
    if instrument_dict.get("coupon"):
        instrument_dict["coupon"] = to_float(instrument_dict, "coupon")
    if instrument_dict.get("Rate"):
        instrument_dict["Rate"] = to_float(instrument_dict, "Rate")
    if instrument_dict.get("Yield to maturity"):
        instrument_dict["Yield to maturity"] = to_float(instrument_dict, "Yield to maturity")
    if instrument_dict.get("Nominal value"):
        instrument_dict["Nominal value"] = to_float(instrument_dict, "Nominal value")
    if instrument_dict.get("Rate of register"):
        instrument_dict["Rate of register"] = to_float(instrument_dict, "Rate of register")
    if instrument_dict.get("Rate of instrument type"):
        instrument_dict["Rate of instrument type"] = to_float(instrument_dict, "Rate of instrument type")
    if instrument_dict.get("Rate of fund holding"):
        instrument_dict["Rate of fund holding"] = to_float(instrument_dict, "Rate of fund holding")
    if instrument_dict.get("Date"):
        instrument_dict["Date"] = to_date(instrument_dict, "Date")

    return instrument_dict

# TODO:
#  [V] normalize values
#  [V] process single values and return normalized dict
#  [V] process JSON file and return normalized values
#  [V] api for receiving values
#  [ ] use non-flask api for production
#  [ ] kafka listner
#  [ ] kafka publish

