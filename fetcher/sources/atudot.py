import os
import re
import requests
from urllib.parse import urlsplit, urlparse, urlunparse

from bs4 import BeautifulSoup

from source_interface import SourceInterface

LINK_PREFIX = b"\xd7\xa0\xd7\x9b\xd7\xa1\xd7\x99\x20\xd7\x94\xd7\xa7\xd7\x95\xd7\xa4\xd7\x94".decode("utf-8")

def get_filename_from_url(url):
    return os.path.basename(urlsplit(url).path)


class AtudotFetcher(SourceInterface):
    PENSION_NAME = 'Atudot'

    BASE_URL = "https://atudotvatika.co.il/%D7%A0%D7%9B%D7%A1%D7%99-%D7%94%D7%A7%D7%95%D7%A4%D7%94/"

    def __init__(self, output_path: str):
        super().__init__(output_path)
        self._base_page = None


    def get_quarterly(self, year: int):
        if self._base_page is None:
            self._base_page = self.download_page(self.BASE_URL)

        # Their site has a double structure of sections, we take the inner one (it will always come second)
        section = [x for x in self._base_page.find_all("section") if x.find("h2", string=re.compile(str(year)))][1]


        file_urls = [a.attrs['href'] for a in section.find_all("a")]

        year_base_dir = os.path.join(self._output_path, str(year))
        if not os.path.exists(year_base_dir):
            os.mkdir(year_base_dir)

        for file_url in file_urls:
            print("Downloading ", file_url)
            res = requests.get(file_url)
            with open(os.path.join(year_base_dir, get_filename_from_url(res.url)), "wb") as f:
                f.write(res.content)


def main():
    f = AtudotFetcher("/tmp/atudot")
    f.get_quarterly(2018)

if __name__ == "__main__":
    main()


