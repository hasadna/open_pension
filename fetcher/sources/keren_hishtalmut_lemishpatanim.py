import os

import requests
from bs4 import BeautifulSoup

from logger import init_logger, get_logger
from source_interface import SourceInterface


LOGGER = get_logger()


base_url = 'http://keren.mishpatanim.co.il'


class KerenHishtalmutLeMishpatanim(SourceInterface):
    """
    החברה לניהול קרן השתלמות למשפטנים בע"מ
    not to be confused with:
    החברה לניהול קרן השתלמות לשופטים בע"מ
    """
    PENSION_NAME = 'Keren Hishtalmut LeMishpatanim'

    def get_quarterly(self, year: int):
        for quarter in range(1, 5):
            self.get_quarterly_by_quarter(year, quarter)

    def get_quarterly_by_quarter(self, year: int, quarter: int):
        r = requests.get(f"{base_url}/GemelWeb/Templates/DownloadForms.aspx?menuItem=671&subMenuItem=2765")
        parsed_html = BeautifulSoup(r.content, "html.parser")

        month = 3*quarter
        text_to_search = f'רשימת נכסים {month:02}.{year}'
        items = parsed_html.find_all(text=text_to_search)
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
    KerenHishtalmutLeMishpatanim(save_path).get_quarterly(2017)