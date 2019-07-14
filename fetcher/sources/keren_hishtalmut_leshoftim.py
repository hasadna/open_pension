from urllib.parse import urljoin

from bs4 import BeautifulSoup

from logger import init_logger, get_logger
from source_interface import SourceInterface

LOGGER = get_logger()


BASE_URL = 'http://www.keren-shoftim.org.il'
REPORTS_URL = 'GemelWeb/Templates/DownloadForms.aspx?menuItem=701&subMenuItem=1712'


class KerenHishtalmutLeShoftim(SourceInterface):
    """
    החברה לניהול קרן השתלמות לשופטים בע"מ
    """
    PENSION_NAME = 'Keren Hishtalmut LeShoftim'

    def get_quarterly(self, year: int):
        reports_page = self.download_page(urljoin(BASE_URL, REPORTS_URL))
        for quarter in range(1, 5):
            self._download_quarterly_report(year, quarter, reports_page)

    def _download_quarterly_report(self, year: int, quarter: int, reports_page: BeautifulSoup) -> None:
        month = 3*quarter
        text_to_search = f'רשימת נכסים {month:02}.{year}'
        items = reports_page.find_all(text=text_to_search)
        if not items:
            LOGGER.error(f"Failed finding report for {year}-{quarter} - find to find item")
            return

        item = items[0]
        parent = item.findParent('a')
        href = parent.get('href')
        if not href:
            LOGGER.error(f"Failed finding report for {year}-{quarter} - failed to find href")
            return

        self.download_href_to_file(urljoin(BASE_URL, href))


if __name__ == '__main__':
    save_path = '/tmp/reports'
    init_logger()
    KerenHishtalmutLeShoftim(save_path).get_quarterly(2017)