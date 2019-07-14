import os
import re
import requests
from urllib.parse import urlsplit, urlparse, urlunparse

from bs4 import BeautifulSoup

from source_interface import SourceInterface

# Reshimat nechasim rivon
URL_PREFIX = b"\xd7\xa8\xd7\xa9\xd7\x99\xd7\x9e\xd7\xaa\x20\xd7\xa0\xd7\x9b\xd7\xa1\xd7\x99\xd7\x9d\x20\xd7\xa8\xd7\x91\xd7\xa2\xd7\x95\xd7\xa0\xd7\x99\xd7\xaa\x20\xd7\xa8\xd7\x91\xd7\xa2\xd7\x95\xd7\x9f".decode("utf-8")

def get_filename_from_url(url):
    return os.path.basename(urlsplit(url).path)


class IAIFetcher(SourceInterface):
    PENSION_NAME = 'IAI'

    BASE_URL = "http://www.gemeliai.co.il/GemelWeb/Templates/DownloadForms.aspx?menuItem=931"

    def __init__(self, output_path: str):
        super().__init__(output_path)
        self._base_page = None


    def get_quarterly(self, year: int):
        if self._base_page is None:
            self._base_page = self.download_page(self.BASE_URL)


        split_results = urlparse(self.BASE_URL)._replace(path="")
        base_url = urlunparse(split_results)

        file_urls = [base_url + a.attrs['href'] for a in self._base_page.find_all("a", string=re.compile(f"{URL_PREFIX}.*{year}"))]

        year_base_dir = os.path.join(self._output_path, str(year))
        if not os.path.exists(year_base_dir):
            os.mkdir(year_base_dir)

        for file_url in file_urls:
            print("Downloading ", file_url)
            res = requests.get(file_url)
            with open(os.path.join(year_base_dir, get_filename_from_url(res.url)), "wb") as f:
                f.write(res.content)


def main():
    f = IAIFetcher("/tmp/iai")
    f.get_quarterly(2018)

if __name__ == "__main__":
    main()


