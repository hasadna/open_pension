import os
import requests
from bs4 import BeautifulSoup

from logger import get_logger, init_logger
from source_interface import SourceInterface

base_url = "http://infinity.co.il/nihulkupot/Kahar/%D7%A7-%D7%94-%D7%A8-%D7%A0%D7%9B%D7%A1%D7%99-%D7%94%D7%A7%D7%95%D7%A4%D7%94-%D7%95%D7%AA%D7%A9%D7%95%D7%90%D7%95%D7%AA/%D7%A7-%D7%94-%D7%A8-%D7%A8%D7%A9%D7%99%D7%9E%D7%AA-%D7%A0%D7%9B%D7%A1%D7%99%D7%9D-%D7%A8%D7%91%D7%A2%D7%95%D7%A0%D7%99%D7%AA/"

report_text_base = "דוח נכסים רבעון"

report_text_template = '{base} {quarter} {year}'

LOGGER = get_logger()


class InfinityKHRSource(SourceInterface):
    """
    ק.ה.ר - קרן השתלמות לרוקחים בע"מ
    """
    PENSION_NAME = 'KHR'

    def get_quarterly(self, year: int):
        for quarter in range(1, 5):
            self.get_quarterly_by_quarter(year, quarter)

    def get_quarterly_by_quarter(self, year: int, quarter: int):
        r = requests.get(base_url)
        parsed_html = BeautifulSoup(r.content, "html.parser")
        report_text_by_year_month = report_text_template.format(base=report_text_base,
                                                                year=year,
                                                                quarter=quarter)
        items = parsed_html.find_all(text=report_text_by_year_month)
        if not items:
            LOGGER.error(f"Failed finding report for {year}-{quarter} - find to find item")
            return

        item = items[0]
        parent = item.findParent('a')
        href = parent.get('href')
        if not href:
            LOGGER.error(f"Failed finding report for {year}-{quarter} - failed to find href")
            return

        d = requests.get(href)

        file_path = os.path.join(self._output_path, f'{year}-{quarter}.xls')
        with open(file_path, 'wb') as f:
            f.write(d.content)
            LOGGER.info(f'Saved file {href} to {file_path}')


if __name__ == '__main__':
    save_path = '/tmp/reports'
    init_logger()
    InfinityKHRSource(save_path).get_quarterly(2017)





