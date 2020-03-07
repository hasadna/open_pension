from openpyxl.workbook import Workbook
from openpyxl.worksheet.worksheet import Worksheet


def process_file(file: Workbook):
    """
    Handling a file for process.

    :param file: The file to process.
    """
    for worksheet in file.worksheets:
        process_worksheet(worksheet)


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
    pass


def get_anchor_cell(worksheet: Worksheet) -> (int, int):
    """
    Start to run on the fields and look for the anchor cell which from there
    the data lay out.
    """
    return 1, 1


def process_data(worksheet: Worksheet, start_row: int, start_cell: int):
    return {}
