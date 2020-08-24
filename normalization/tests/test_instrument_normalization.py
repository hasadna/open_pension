import json

from normalization.main import process_entry
from normalization.tests.instrument_data_for_tests import CASH_ENTRY_JSON_RAW, CASH_ENTRY_JSON_NORMED, \
    GOVT_BOND_ENTRY_JSON_RAW, GOVT_BOND_ENTRY_JSON_NORMED
from normalization.tests.test_reformatting import TestBaseClass


class TestInstrumentNormalization(TestBaseClass):

    def test_cash_normalize(self):
        normalized_entry = process_entry(json.loads(CASH_ENTRY_JSON_RAW))
        self.assertEqual(normalized_entry, json.loads(CASH_ENTRY_JSON_NORMED))

    def test_gov_bonds_normalize(self):
        normalized_entry = process_entry(json.loads(GOVT_BOND_ENTRY_JSON_RAW))
        self.assertEqual(normalized_entry, json.loads(GOVT_BOND_ENTRY_JSON_NORMED))

    def test_commercial_bonds_normalize(self):
        # TODO - Find example to test
        pass

    def test_company_bonds_normalize(self):
        pass

    def test_stocks_normalize(self):
        pass

    def test_mutual_funds_normalize(self):
        pass

    def test_exchange_traded_note_normalize(self):
        pass

    def test_warrants_normalize(self):
        pass

    def test_options_normalize(self):
        pass

    def test_futures_normalize(self):
        pass

    def test_structured_products_normalize(self):
        pass

