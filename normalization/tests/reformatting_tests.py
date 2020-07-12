import json
import unittest

from normalization.main import start_instrument_processing
from normalization.utils.reformating import to_float, to_date
from datetime import datetime


class TestBaseClass(unittest.TestCase):
    def setUp(self):
        self.test_dict = {
            "float": 123.12,
            "float_string": "123.12",
            "string": "string",
            "date": "01/01/2000"
        }

        self.cash_json = '''
        {
            "index": " תעודות התחייבות ממשלתיות",
            "israel": true,
            "line_in_file": 14,
            "Instrument name": "גליל 5903",
            "Instrument number": "9590332",
            "Market name": "TASE",
            "Rating": "RF",
            "Rating agencies": null,
            "Purchase date": null,
            "Duration": "1.98",
            "Currency": "שקל חדש",
            "Rate": "0.04",
            "Yield to maturity": "-0.0083",
            "Nominal value": "878207771.0200001",
            "Price": "150.85999961731468",
            "coupon": null,
            "Fair value": "1324864.24",
            "Rate of register": "0.1775",
            "Rate of instrument type": "0.12083544204045915",
            "Rate of fund holding": "0.032187601442658816",
            "Investment": "תעודות התחייבות ממשלתיות",
            "file_name": "512065202_gsum_0219.xlsx",
            "Date": " 30/06/2019",
            "Institutional body": " מיטב דש גמל ופנסיה בע\\"מ"
        }
        '''

class TestReformatting(TestBaseClass):

    def test_to_float_num(self):
        self.assertEqual(to_float(self.test_dict, "float"), 123.12)
        self.assertEqual(to_float(self.test_dict, "float_string"), 123.12)

    def test_to_float_string(self):
        with self.assertRaises(ValueError):
            to_float(self.test_dict, "string")

    def test_to_date_string(self):
        self.assertEqual(to_date(self.test_dict, "date"), datetime(2000, 1, 1, 0, 0))

    def test_to_date_string_error(self):
        with self.assertRaises(ValueError):
            to_date(self.test_dict, "string")


class TestInstrumentNormalization(TestBaseClass):

    def test_cash_normalize(self):
        start_instrument_processing(json.loads(self.cash_json))

