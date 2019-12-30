
class ExcelWorkbookParsingError(Exception):
    def __init__(self, *args, **kwargs):
        super(ExcelWorkbookParsingError, self).__init__()
        self.parse_error = kwargs['parse_error']
        self.file_name = kwargs['file_name']


class ExcelSheetParsingError(Exception):
    def __init__(self, *args, **kwargs):
        super(ExcelSheetParsingError, self).__init__()
        self.parse_error = kwargs['parse_error']
        self.sheet_name = kwargs['sheet_name']


class FailToLoadFile(Exception):
    pass
