import re
from urllib.parse import urljoin

from bs4 import BeautifulSoup

from logger import init_logger, get_logger
from source_interface import SourceInterface

LOGGER = get_logger()


BASE_URL = 'https://www.kereni.co.il'
REPORTS_URL = '%d7%94%d7%a9%d7%a7%d7%a2%d7%95%d7%aa/%d7%a0%d7%9b%d7%a1%d7%99-%d7%94%d7%a7%d7%95%d7%a4%d7%94/%d7%a8%d7%a9%d7%99%d7%9e%d7%aa-%d7%a0%d7%9b%d7%a1%d7%99%d7%9d-%d7%91%d7%a8%d7%9e%d7%aa-%d7%94%d7%a0%d7%9b%d7%a1-%d7%94%d7%91%d7%95%d7%93%d7%93-%d7%9e%d7%90%d7%95%d7%97%d7%93/'
BASE_TEXT_TO_SEARCH = 'רשימת נכסים ברמת הנכס הבודד – עגור מאוחד'


class Agur(SourceInterface):
    """
    עגור חברה לניהול קופות גמל וקרנות השתלמות בע"מ
    """
    PENSION_NAME = 'Agur'

    def get_quarterly(self, year: int):
        reports_page = self.download_page(urljoin(BASE_URL, REPORTS_URL))
        for quarter in range(1, 5):
            self._download_quarterly_report(year, quarter, reports_page)

    def _download_quarterly_report(self, year: int, quarter: int, reports_page: BeautifulSoup) -> None:
        month = 3 * quarter

        text_to_search = f'{BASE_TEXT_TO_SEARCH} {month:02}.{year}'
        items = reports_page.find_all(text=re.compile('.*' + text_to_search + '.*'))
        if not items:
            LOGGER.error(f"Failed finding report for {year}-{quarter} - find to find item by text")
            return

        item = items[0]
        parent = item.findParent('a')
        href = parent.get('href')
        if not href:
            LOGGER.error(f"Failed finding report for {year}-{quarter} - failed to find href")
            return

        self.download_to_file(urljoin(BASE_URL, href))


if __name__ == '__main__':
    save_path = '/tmp/reports'
    init_logger()
    Agur(save_path).get_quarterly(2017)