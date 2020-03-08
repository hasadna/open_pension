from openpyxl.workbook import Workbook
from openpyxl.worksheet.worksheet import Worksheet
import re


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

    year = get_year(worksheet)
    start_row, start_cell = get_anchor_cell(worksheet)
    processed_data = process_data(worksheet, start_row, start_cell)

    return {
        'year': year,
        'processed_data': processed_data,
    }


def get_year(worksheet: Worksheet) -> int:
    """
    Getting the year.
    """
    p = re.compile('[0-9]{4}')

    for row in range(worksheet.max_row):
        for column in range(worksheet.max_column):
            cell_value = worksheet.cell(row + 1, column + 1).value

            if cell_value is None:
                continue

            if p.match(str(cell_value)):
                return cell_value


def get_anchor_cell(worksheet: Worksheet) -> (int, int):
    """
    Start to run on the fields and look for the anchor cell which from there
    the data lay out.
    """
    return 1, 1


def process_data(worksheet: Worksheet, start_row: int, start_cell: int):
    return {}
