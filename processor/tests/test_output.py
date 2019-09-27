from os import getcwd, path
from parser import ExcelParser
from logger import Logger


class TestOutputs:

    def test_output(self):
        file_to_parse_path = path.join(getcwd(), 'files', '512237744_psum_0219.xlsx')

        parser = ExcelParser(Logger('test'))
        parsing_results = parser.parse(file_to_parse_path)

        # Make sure we have a tab we expect and one that we don't.
        assert 'מזומנים' in parsing_results.keys(), 'The מזומנים should appear but it not'
        assert 'סכום נכסי הקרן' not in parsing_results.keys(), 'The סכום נכסי הקרן should not appear but it is'

        # Checking the values.
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
