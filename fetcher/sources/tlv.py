import os
import re
import requests
from urllib.parse import urlparse, urlunparse

from bs4 import BeautifulSoup

from source_interface import SourceInterface


def get_filename_from_url(url):
    return os.path.basename(urlparse(url).path)

HEBREW = {
        "RIVON": b"\xd7\xa8\xd7\x91\xd7\xa2\xd7\x95\xd7\x9f".decode("utf-8"),
        "RESHIMAT_NECHASIM": b"\xd7\xa8\xd7\xa9\xd7\x99\xd7\x9e\xd7\xaa\x20\xd7\xa0\xd7\x9b\xd7\xa1\xd7\x99\xd7\x9d".decode("utf-8"),
}


class TLVFetcher(SourceInterface):
    FILE_LIST_URLS = [
            ("http://tag.tagmulimta.co.il/AssetsCompositionByQuarters.aspx", "{RIVON}.*{year}.*"),
            ("http://www.shhak.tagmulimta.co.il/AssetsCompositionByQuarters.aspx", "{RESHIMAT_NECHASIM}.*{year}"),
            ("http://pitzuim.tagmulimta.co.il/AssetsCompositionByQuarters.aspx", "{year}.*{RESHIMAT_NECHASIM}"),
    ]

    def __init__(self, output_path: str):
        self._base_page = None
        self._output_path = output_path

        super().__init__(output_path)

    def get_quarterly(self, year: int):
        file_urls = []

        for file_list_url, search_re in self.FILE_LIST_URLS:
            page = self.download_page(file_list_url)

            re_dict = dict(HEBREW)
            re_dict['year'] = str(year)
            file_links = page.find_all("a", string=re.compile(search_re.format(**re_dict)))

            split_results = urlparse(file_list_url)._replace(path="")
            base_url = urlunparse(split_results)

            file_urls.extend([base_url + link.attrs['href'] for link in file_links])

        year_base_dir = os.path.join(self._output_path, str(year))
        if not os.path.exists(year_base_dir):
            os.mkdir(year_base_dir)


        for file_url in file_urls:
            res = requests.get(file_url)
            with open(os.path.join(year_base_dir, get_filename_from_url(res.url)), "wb") as f:
                print("Downloading: ", file_url)
                f.write(res.content)


def main():
    f = TLVFetcher("/tmp/infinity")
    f.get_quarterly(2018)

if __name__ == "__main__":
    main()


