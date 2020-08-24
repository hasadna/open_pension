from normalization.tests.test_base import TestBaseClass
from normalization.utils.reformating import to_float, to_date


class TestReformatting(TestBaseClass):

    def test_to_float_num(self):
        self.assertEqual(to_float(self.test_dict, "float"), 123.12)
        self.assertEqual(to_float(self.test_dict, "float_string"), 123.12)

    def test_to_float_string(self):
        with self.assertRaises(ValueError):
            to_float(self.test_dict, "string")

    def test_to_date_string(self):
        self.assertEqual(to_date(self.test_dict, "date_four_digit_year"), "2000-01-01")
        self.assertEqual(to_date(self.test_dict, "date_two_digit_year"), "2000-01-01")

    def test_flatten_instrument_json(self):
        pass



