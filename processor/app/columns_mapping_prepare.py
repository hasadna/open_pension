from .excel_adapter import ExcelProcessor
from .logger import Logger

logger = Logger('fo')
ep = ExcelProcessor(file_path='./columns_mapping_prepare.xlsx', logger=logger)

mapping = {}
for i in range(2, 386):
    sheet, key, value = \
        ep._workbook['מפתח עמודות'].cell(row=i, column=1).value,\
        ep._workbook['מפתח עמודות'].cell(row=i, column=3).value,\
        ep._workbook['מפתח עמודות'].cell(row=i, column=4).value

    if sheet.strip() not in mapping:
        mapping[sheet.strip()] = {}

    mapping[sheet.strip()][key] = value.strip()

print(mapping)
