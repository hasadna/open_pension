from openpyxl.workbook import Workbook
from openpyxl.worksheet.worksheet import Worksheet
import re

p = re.compile('[0-9]{4}')
anchor_cell_value = 'מזומנים ושווי מזומנים'
months = {
    1: 'ינואר',
    2: 'ינואר',
    3: 'פברואר',
    4: 'פברואר',
    5: 'מרץ',
    6: 'מרץ',
    7: 'אפריל',
    8: 'אפריל',
    9: 'מאי',
    10: 'מאי',
    11: 'יוני',
    12: 'יוני',
    13: 'יולי',
    14: 'יולי',
    15: 'אוגוסט',
    16: 'אוגוסט',
    17: 'ספטמבר',
    18: 'ספטמבר',
    19: 'נובמבר',
    20: 'נובמבר',
    21: 'אוקטובר',
    22: 'אוקטובר',
    23: 'דצמבר',
    24: 'דצמבר',
}


def process_file(file: Workbook):
    """
    Handling a file for process.

    :param file: The file to process.
    """
    sheets = {}
    for worksheet in file.worksheets:
        sheets[worksheet.title] = process_worksheet(worksheet)

    return sheets


def process_worksheet(worksheet: Worksheet):
    """
    Processing a single worksheet.

    First, we need to get the year which it's represents.
    Second, we need to find the first appearance of our "key" cell. The key
    cell is the cell which starts to lay out the data we need to take.

    Once we got our key cell, we can start and run over that row, and process
    each pair of cells. The couples are displaying data for each month which
    means we need to have 24 rows eventually.
    """

    year, processed_data = process_data(worksheet)

    return {
        'year': year,
        'processed_data': processed_data,
    }


def is_year(cell_value) -> bool:
    """
    Getting the year.
    """

    if p.match(str(cell_value)):
        return True

    return False


def collect_table(worksheet: Worksheet, row, column) -> object:
    """
    Start to run on the fields and look for the anchor cell which from there
    the data lay out.
    """

    data = {}

    for iterated_row in range(row, row + 21):
        row_label: str = worksheet.cell(row=iterated_row, column=column).value

        row_data = []
        for iterated_column in range(column + 1, column + 1 + 24):

            cell_value = worksheet.cell\
                (row=iterated_row, column=iterated_column).value
            row_data.append(cell_value)

        data[row_label.strip()] = row_data

    return data


def process_data(worksheet: Worksheet) -> (int, object):
    year = 0
    for row in range(worksheet.max_row):
        for column in range(worksheet.max_column):
            # Bump the row and the column by 1 since the API method which
            # returns the value does not allow 0 as parameters.
            row, column = row + 1, column + 1

            cell_value = worksheet.cell(row, column).value

            if cell_value is None:
                continue

            # First, let's get the year.
            if is_year(cell_value):
                year = cell_value

            # After we got the year, let's look for the anchor cell.
            if cell_value == anchor_cell_value:
                print('Fond!', row, column)

                return year, collect_table(worksheet, row, column)
