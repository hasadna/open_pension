from source_interface import SourceInterface


class ExampleSource(SourceInterface):
    PENSION_NAME = 'Example Pension'

    def get_quarterly(self, year: int):
        self.logger.info(f"Getting quarterly for {year}")
