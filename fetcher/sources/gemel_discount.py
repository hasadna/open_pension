import re
from urllib.parse import urljoin

from bs4 import BeautifulSoup

from logger import init_logger, get_logger
from source_interface import SourceInterface

LOGGER = get_logger()


BASE_URL = 'https://www.badal.co.il'
REPORTS_URL = 'private/Financial_Info/Quarterly_Assets'
BASE_TEXT_TO_SEARCH = 'רשימת נכסים ברמת הנכס הבודד – עגור מאוחד'


class GemelDiscount(SourceInterface):
    """
    החברה לניהול קופות גמל של עובדי בנק דיסקונט בע"מ
    """
    PENSION_NAME = 'Gemel Discount'

    def get_quarterly(self, year: int):
        reports_page = self.download_page(urljoin(BASE_URL, REPORTS_URL))
        for quarter in range(1, 5):
            self._download_quarterly_report(year, quarter, reports_page)

    def _download_quarterly_report(self, year: int, quarter: int, reports_page: BeautifulSoup) -> None:
        href_to_search = f'_{quarter:02}{str(year)[-2:]}.xlsx'
        items = reports_page.find_all(href=re.compile('.*' + href_to_search + '.*'))
        if not items:
            LOGGER.error(f"Failed finding report for {year}-{quarter} - find to find item by href")
            return

        item = items[0]
        href = item.get('href')
        if not href:
            LOGGER.error(f"Failed finding report for {year}-{quarter} - failed to find href")
            return

        self.download_to_file(urljoin(BASE_URL, href))


if __name__ == '__main__':
    save_path = '/tmp/reports/test'
    init_logger()
    GemelDiscount(save_path).get_quarterly(2017)