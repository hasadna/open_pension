import os
import re
import requests
from urllib.parse import urlsplit

from bs4 import BeautifulSoup

from source_interface import SourceInterface


def get_filename_from_url(url):
    return os.path.basename(urlsplit(url).path)


class InfinityFetcher(SourceInterface):
    PENSION_NAME = 'Infinity'

    BASE_URL = "http://infinity.co.il/%D7%A7%D7%95%D7%A4%D7%95%D7%AA-%D7%92%D7%9E%D7%9C/%D7%90%D7%99%D7%A0%D7%A4%D7%99%D7%A0%D7%99%D7%98%D7%99-%D7%A0%D7%99%D7%94%D7%95%D7%9C-%D7%94%D7%A9%D7%AA%D7%9C%D7%9E%D7%95%D7%AA-%D7%95%D7%92%D7%9E%D7%9C-%D7%94%D7%97%D7%91%D7%A8%D7%94-%D7%94%D7%9E%D7%A0%D7%94%D7%9C%D7%AA/%D7%90%D7%99%D7%A0%D7%A4%D7%99%D7%A0%D7%99%D7%98%D7%99-%D7%A0%D7%99%D7%94%D7%95%D7%9C-%D7%94%D7%A9%D7%AA%D7%9C%D7%9E%D7%95%D7%AA-%D7%95%D7%92%D7%9E%D7%9C-%D7%9E%D7%99%D7%93%D7%A2-%D7%9B%D7%9C%D7%9C%D7%99-%D7%95%D7%93%D7%95%D7%97%D7%95%D7%AA/%D7%A8%D7%A9%D7%99%D7%9E%D7%AA-%D7%A0%D7%9B%D7%A1%D7%99%D7%9D-3/"

    def __init__(self, output_path: str):
        super().__init__(output_path)
        self._base_page = None

    def get_year_url(self, year):
        if self._base_page is None:
            self._base_page = BeautifulSoup(requests.get(self.BASE_URL).text, "html.parser")

        # TODO: Add hebrew to search string
        # TODO: Catch errors
        return self._base_page.find("a", string=re.compile(f"{year}")).attrs['href']

    def get_quarterly(self, year: int):
        url = self.get_year_url(year)

        page = BeautifulSoup(requests.get(url).text, "html.parser")
        file_urls = [a.attrs['href'] for a in page.find_all("a", href=re.compile("xls$"))]

        year_base_dir = os.path.join(self._output_path, str(year))
        if not os.path.exists(year_base_dir):
            os.mkdir(year_base_dir)

        for file_url in file_urls:
            res = requests.get(file_url)
            with open(os.path.join(year_base_dir, get_filename_from_url(res.url)), "wb") as f:
                f.write(res.content)


def main():
    f = InfinityFetcher("/tmp/infinity")
    f.get_quarterly(2018)

if __name__ == "__main__":
    main()


