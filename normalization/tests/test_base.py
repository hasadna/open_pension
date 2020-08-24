import unittest


class TestBaseClass(unittest.TestCase):
    def setUp(self):
        self.test_dict = {
            "float": 123.12,
            "float_string": "123.12",
            "string": "string",
            "date_four_digit_year": "01/01/2000",
            "date_two_digit_year": "01/01/00"
        }