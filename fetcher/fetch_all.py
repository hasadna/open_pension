import argparse
import glob
import importlib
import inspect
from typing import List, Type, Optional

import sources
import os

from logger import init_logger, get_logger
from source_interface import SourceInterface, IGNORE_SOURCE_ATTR

IGNORE_MODULE_FILES = ["__init__.py"]
SOURCES_PACKAGE = 'sources'
DEFAULT_YEARS_RANGE = (2000, 2018)


class FetcherRunner:
    def __init__(self, output_path: str):
        self.output_path = output_path
        self.source_path = os.path.join(os.path.dirname(sources.__file__), '*.py')
        self.logger = get_logger()

    def _load_all_fetchers(self) -> List[Type[SourceInterface]]:
        fetcher_source_classes = []
        for file_path in glob.glob(self.source_path):
            filename = os.path.basename(file_path)
            if filename in IGNORE_MODULE_FILES:
                continue
            module_name = os.path.splitext(filename)[0]
            module = importlib.import_module(f'{SOURCES_PACKAGE}.{module_name}')
            for name, obj in inspect.getmembers(module):
                if inspect.isclass(obj) and issubclass(obj, SourceInterface) and obj != SourceInterface:
                    if getattr(obj, IGNORE_SOURCE_ATTR, False):
                        continue

                    fetcher_source_classes.append(obj)

        return fetcher_source_classes

    def run_all_fetchers(self, year: Optional[int] = None):
        fetcher_classes = self._load_all_fetchers()
        for fetcher_class in fetcher_classes:
            try:
                self.logger.info(f"Fetching for {fetcher_class.__name__}")
                pansion_output_path = os.path.join(self.output_path, fetcher_class.PENSION_NAME)
                os.makedirs(pansion_output_path, exist_ok=True)
                fetcher = fetcher_class(output_path=pansion_output_path)
                if year:
                    fetcher.get_quarterly(year)
                else:
                    for year in range(*DEFAULT_YEARS_RANGE):
                        fetcher.get_quarterly(year)
            except:
                self.logger.exception(f"Failed to run fetcher on {fetcher_class.__name__}")


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('-o', '--output_dir', dest='output_dir', help='Fetched XMLs output path', type=str)
    parser.add_argument('--year', dest='year', help='Specific year', type=int, default=None)
    args = parser.parse_args()

    init_logger()
    FetcherRunner(output_path=args.output_dir).run_all_fetchers(year=args.year)


if __name__ == '__main__':
    main()
