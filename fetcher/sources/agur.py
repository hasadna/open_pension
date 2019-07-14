import os
import re

import requests
from bs4 import BeautifulSoup

from logger import init_logger, get_logger
from source_interface import SourceInterface


LOGGER = get_logger()


base_url = 'https://www.kereni.co.il'
reports_url = base_url + '/' + '%d7%94%d7%a9%d7%a7%d7%a2%d7%95%d7%aa/%d7%a0%d7%9b%d7%a1%d7%99-%d7%94%d7%a7%d7%95%d7%a4%d7%94/%d7%a8%d7%a9%d7%99%d7%9e%d7%aa-%d7%a0%d7%9b%d7%a1%d7%99%d7%9d-%d7%91%d7%a8%d7%9e%d7%aa-%d7%94%d7%a0%d7%9b%d7%a1-%d7%94%d7%91%d7%95%d7%93%d7%93-%d7%9e%d7%90%d7%95%d7%97%d7%93/'


class Agur(SourceInterface):
    """
    עגור חברה לניהול קופות גמל וקרנות השתלמות בע"מ
    """
    PENSION_NAME = 'Agur'

    def get_quarterly(self, year: int):
        for quarter in range(1, 5):
            self.get_quarterly_by_quarter(year, quarter)

    def get_quarterly_by_quarter(self, year: int, quarter: int):
        r = requests.get(reports_url)
        parsed_html = BeautifulSoup(r.content, "html.parser")

        month = 3*quarter

        text_to_search = f'רשימת נכסים ברמת הנכס הבודד – עגור מאוחד {month:02}.{year}'
        items = parsed_html.find_all(text=re.compile('.*' + text_to_search + '.*'))
        if not items:
            LOGGER.error(f"Failed finding report for {year}-{quarter} - find to find item")
            return

        item = items[0]
        parent = item.findParent('a')
        href = parent.get('href')
        if not href:
            LOGGER.error(f"Failed finding report for {year}-{quarter} - failed to find href")
            return

        d = requests.get(base_url + '/' + href)

        file_path = os.path.join(self._output_path, f'{year}-{quarter}.xls')
        with open(file_path, 'wb') as f:
            f.write(d.content)
            LOGGER.info(f'Saved file {href} to {file_path}')


if __name__ == '__main__':
    save_path = '/tmp/reports'
    init_logger()
    Agur(save_path).get_quarterly(2017)