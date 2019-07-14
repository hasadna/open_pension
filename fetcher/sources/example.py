from fetcher.logger import get_logger
from fetcher.source_interface import SourceInterface

LOGGER = get_logger()


class ExampleSource(SourceInterface):
    def get_annual(self, year: int):
        LOGGER.info("Getting annually")

    def get_quarterly(self, year: int):
        LOGGER.info("Getting quarterly")
