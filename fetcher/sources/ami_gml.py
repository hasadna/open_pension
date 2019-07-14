import os
import re

import requests
from bs4 import BeautifulSoup

from source_interface import SourceInterface

base_url = "http://ami-gml.co.il"

reports_relative_url = "%d7%a8%d7%a9%d7%99%d7%9e%d7%aa-%d7%a0%d7%9b%d7%a1%d7%99%d7%9d-%d7%93%d7%95%d7%97%d7%95%d7%aa-%d7%9e%d7%90%d7%95%d7%97%d7%93%d7%99%d7%9d-{year}"


class AmiGmlSource(SourceInterface):
    """
    עמ"י - חברה לניהול קופות גמל ענפיות בע"מ
    """
    def get_quarterly(self, year: int):
        for quarter in range(1, 5):
            self.get_quarterly_by_quarter(year, quarter)

    def get_quarterly_by_quarter(self, year: int, quarter: int):
        base_url_yearly = base_url + '/' + reports_relative_url.format(year=year)
        r = requests.get(base_url_yearly)
        parsed_html = BeautifulSoup(r.content)

        items = parsed_html.find_all(href=re.compile(f'.*gsum_(p|0){quarter}{str(year)[-2:]}.*'))
        if not items:
            print(f"Failed finding report for {year}-{quarter}")
            return

        item = items[0]
        href = item.get('href')
        if not href:
            print(f"Failed finding report for {year}-{quarter}")
            return

        d = requests.get(base_url + '/' + href)

        file_path = os.path.join(self.output_path, f'{year}-{quarter}.xls')
        with open(file_path, 'wb') as f:
            f.write(d.content)
            print(f'Saved file {href} to {file_path}')


if __name__ == '__main__':
    save_path = '/tmp/reports'
    AmiGmlSource(save_path).get_quarterly(2018)