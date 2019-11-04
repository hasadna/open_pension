from os import getcwd, path
from parser import ExcelParser
from logger import Logger


class TestOutputs:

    def test_output(self):
        """
        Testing the output of the parsing results.
        """
        file_to_parse_path = path.join(getcwd(), 'files', '512237744_psum_0219.xlsx')

        parser = ExcelParser(Logger('test'))
        parsing_results = parser.parse(file_to_parse_path)

        # Make sure we have a tab we expect and one that we don't.
        assert 'מזומנים' in parsing_results.keys(), 'The מזומנים should appear but it not'
        assert 'סכום נכסי הקרן' not in parsing_results.keys(), 'The סכום נכסי הקרן should not appear but it is'

        # Checking the values.
        self._test_first_tab_results(parsing_results)
        self._test_second_tab_results(parsing_results)
        self._test_third_tab_results(parsing_results)

    def _test_first_tab_results(self, parsing_results):
        """
        Testing the cashing results.

        :param parsing_results: The parsing results object.
        """
        assert parsing_results['מזומנים'][0] == {
            'index': ' בישראל:',
            'israel': True,
            'line_in_file': 13,
            'Instrument Name': 'בנק הפועלים בע"מ',
            'Instrument Number': '34112000',
            'Issuer Nunber': '12',
            'Rating': 'AAA.IL',
            'Rating Agencies': 'מעלות S&P',
            'Currency': 'שקל חדש',
            'Rate': None,
            'yield to maturity': None,
            'Market Value': '45299.34',
            'Rate of Instrument Type': '=J13/$J$10',
            'Rafe of Funde Holding': "=J13/'[5]סכום נכסי הקרן'!$C$42",
            'Investment': 'מזומנים',
            'file_name': '512237744_psum_0219.xlsx',
            'Date': '30/06/2019',
            'Institutional body': 'מגדל מקפת קרנות פנסיה וקופות גמל בע"מ',
            'Fund Name': 'מקפת מרכז',
            'Fund Number': 'מגדל מקפת - מרכז'
        }, 'The first row in מזומנים was not equal to what we expecting'

    def _test_second_tab_results(self, parsing_results):
        assert parsing_results['תעודות התחייבות ממשלתיות'][0] == {
            'index': ' צמודות מדד',
            'israel': True,
            'line_in_file': 15,
            'Instrument Name': '5903 גליל',
            'Instrument Number': '9590332',
            'Market name': 'TASE',
            'Rating': 'RF',
            'Rating Agencies': None,
            'Purcahse date': None,
            'Duration': '1.979999999999996',
            'Currency': 'שקל חדש',
            'Rate': '0.04',
            'yield to maturity': '-0.008299999999999908',
            'Nominal Value': '115370623.846259',
            'Price': '150.86',
            'coupon': None,
            'Market Value': '174048.12374890796',
            'Rafe of Register': '0.007420379211438565',
            'Rate of Instrument Type': '0.03286730635324069',
            'Rafe of Funde Holding': "=O15/'סכום נכסי הקרן'!$C$42",
            'Investment': 'תעודות התחייבות ממשלתיות',
            'file_name': '512237744_psum_0219.xlsx',
            'Date': '30/06/2019',
            'Institutional body': 'מגדל מקפת קרנות פנסיה וקופות גמל בע"מ',
            'Fund Name': 'מקפת מרכז',
            'Fund Number': 'מגדל מקפת - מרכז'
        }, 'The first row in תעודות התחייבות ממשלתיות was not equal to what we expecting'

    def _test_third_tab_results(self, parsing_results):
        assert parsing_results['אג"ח קונצרני'][0] == {
            'index': ' צמודות',
            'israel': True,
            'line_in_file': 14,
            'Instrument Name': 'אלה פקדונות אגח ב',
            'Instrument Number': '1142215',
            'Market name': 'TASE',
            'Information provider': 'מגמה',
            'Issuer Nunber': '515666881',
            'Industry': 'שרותים פיננסים',
            'Rating': 'AAA.IL',
            'Rating Agencies': 'מעלות S&P',
            'Purcahse date': None,
            'Duration': '3.2999999999999985',
            'Currency': 'שקל חדש',
            'Rate': '0.0062',
            'yield to maturity': '-0.0010999999999997294',
            'Nominal Value': '100699444.685515',
            'Price': '105.33',
            'coupon': None,
            'Market Value': '106066.73135601703',
            'Rafe of Register': '0.021362825230232915',
            'Rate of Instrument Type': '0.014053885462763965',
            'Rafe of Funde Holding': "=R14/'סכום נכסי הקרן'!$C$42",
            'Investment': 'אג"ח קונצרני',
            'file_name': '512237744_psum_0219.xlsx',
            'Date': '30/06/2019',
            'Institutional body': 'מגדל מקפת קרנות פנסיה וקופות גמל בע"מ',
            'Fund Name': 'מקפת מרכז',
            'Fund Number': 'מגדל מקפת - מרכז'
        }, 'The first row in תעודות התחייבות ממשלתיות was not equal to what we expecting'
