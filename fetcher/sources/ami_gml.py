import re
from urllib.parse import urljoin

from bs4 import BeautifulSoup

from logger import get_logger, init_logger
from source_interface import SourceInterface

LOGGER = get_logger()

BASE_URL = "http://ami-gml.co.il"
REPORTS_RELATIVE_URL = "%d7%a8%d7%a9%d7%99%d7%9e%d7%aa-%d7%a0%d7%9b%d7%a1%d7%99%d7%9d-%d7%93%d7%95%d7%97%d7%95%d7%aa-%d7%9e%d7%90%d7%95%d7%97%d7%93%d7%99%d7%9d-{year}"


class AmiGmlSource(SourceInterface):
    """
    עמ"י - חברה לניהול קופות גמל ענפיות בע"מ
    """
    PENSION_NAME = 'Ami Gemel'

    def get_quarterly(self, year: int):
        base_url_yearly = urljoin(BASE_URL, REPORTS_RELATIVE_URL.format(year=year))
        reports_page = self.download_page(base_url_yearly)

        for quarter in range(1, 5):
            self._download_quarterly_report(year, quarter, reports_page)

    def _download_quarterly_report(self, year: int, quarter: int, reports_page: BeautifulSoup) -> None:
        # it's either p118 or 0118, cause they suck.
        items = reports_page.find_all(href=re.compile(f'.*gsum_[p0]{quarter}{str(year)[-2:]}.*'))
        if not items:
            LOGGER.error(f"Failed finding report for {year}-{quarter} - could not find item")
            return

        item = items[0]
        href = item.get('href')
        if not href:
            LOGGER.error(f"Failed finding report for {year}-{quarter} - could not find href")
            return

        self.download_href_to_file(urljoin(BASE_URL, href))


if __name__ == '__main__':
    save_path = '/tmp/reports'
    init_logger()
    AmiGmlSource(save_path).get_quarterly(2018)