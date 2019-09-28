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
            'column_0': 'בנק הפועלים בע"מ',
            'column_1': '34112000',
            'column_2': '12',
            'column_3': 'AAA.IL',
            'column_4': 'מעלות S&P',
            'column_5': 'שקל חדש',
            'column_6': None,
            'column_7': None,
            'column_8': '45299.34',
            'column_9': '=J13/$J$10',
            'column_10': "=J13/'[5]סכום נכסי הקרן'!$C$42",
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
            'line_in_file': 15, 'column_0': '5903 גליל',
            'column_1': '9590332', 'column_2': 'TASE',
            'column_3': 'RF', 'column_4': None, 'column_5': None,
            'column_6': '1.979999999999996',
            'column_7': 'שקל חדש', 'column_8': '0.04',
            'column_9': '-0.008299999999999908',
            'column_10': '115370623.846259',
            'column_11': '150.86', 'column_12': None,
            'column_13': '174048.12374890796',
            'column_14': '0.007420379211438565',
            'column_15': '0.03286730635324069',
            'column_16': "=O15/'סכום נכסי הקרן'!$C$42",
            'Investment': 'תעודות התחייבות ממשלתיות',
            'file_name': '512237744_psum_0219.xlsx',
            'Date': '30/06/2019',
            'Institutional body': 'מגדל מקפת קרנות פנסיה וקופות גמל בע"מ',
            'Fund Name': 'מקפת מרכז',
            'Fund Number': 'מגדל מקפת - מרכז'
        }, 'The first row in תעודות התחייבות ממשלתיות was not equal to what we expecting'

    def _test_third_tab_results(self, parsing_results):
        assert parsing_results['אג"ח קונצרני'][0] ==  {
            'index': ' צמודות',
            'israel': True,
            'line_in_file': 14,
            'column_0': 'אלה פקדונות אגח ב',
            'column_1': '1142215',
            'column_2': 'TASE',
            'column_3': 'מגמה',
            'column_4': '515666881',
            'column_5': 'שרותים פיננסים',
            'column_6': 'AAA.IL',
            'column_7': 'מעלות S&P',
            'column_8': None,
            'column_9': '3.2999999999999985',
            'column_10': 'שקל חדש',
            'column_11': '0.0062',
            'column_12': '-0.0010999999999997294',
            'column_13': '100699444.685515',
            'column_14': '105.33',
            'column_15': None,
            'column_16': '106066.73135601703',
            'column_17': '0.021362825230232915',
            'column_18': '0.014053885462763965',
            'column_19': "=R14/'סכום נכסי הקרן'!$C$42",
            'Investment': 'אג"ח קונצרני',
            'file_name': '512237744_psum_0219.xlsx',
            'Date': '30/06/2019',
            'Institutional body': 'מגדל מקפת קרנות פנסיה וקופות גמל בע"מ',
            'Fund Name': 'מקפת מרכז',
            'Fund Number': 'מגדל מקפת - מרכז'
        }, 'The first row in תעודות התחייבות ממשלתיות was not equal to what we expecting'
