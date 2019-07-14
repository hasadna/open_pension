import re
import urllib.request

from bs4 import BeautifulSoup
from urllib import parse
from urllib.parse import urljoin
from pathlib import Path
import requests

from logger import get_logger

from source_interface import SourceInterface

LOGGER = get_logger()


def file_is_relevant(href):
    if not href:
        return False
    file = href.split('/')[-1]
    if '?' in file:
        return False
    file_extention = file.split('.')[-1]
    if file_extention not in ('xls', 'xlsx'):
        return False
    return True


def extract_year(string):
    match = re.findall(r'(19|20\d{2})', string)
    if len(match) == 1:
        return match[0]
    else:
        return '20'+str(re.findall(r'\d{0,2}\.?\d{1,2}\.(\d{2})', string)[-1])


def parse_link(link):
    scheme, netloc, path, query, fragment = parse.urlsplit(link)
    path = parse.quote(path)
    return parse.urlunsplit((scheme, netloc, path, query, fragment))


class TagmulimHaifa(SourceInterface):
    PENSION_NAME = 'TagmulimHaifa'
    BASE_URL = "http://www.ktagmulimhaifa.co.il/"
    SEARCH_URL = urljoin(BASE_URL, "assetlist")

    def __init__(self, output_path: str):
        super().__init__(output_path)
        headers = {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) '
                          'Chrome/39.0.2171.95 Safari/537.36'}
        response = requests.get("http://www.ktagmulimhaifa.co.il/assetlist", headers=headers)
        self._base_page = BeautifulSoup(response.text, "html.parser")

    def get_quarterly(self, year: int):
        for tag in self._base_page.findAll("a"):
            href = tag.attrs.get("href")
            if file_is_relevant(href):
                if not str(year) == extract_year(tag.string):
                    continue
                download_url = self.BASE_URL + href
                output_folder = Path(self._output_path).joinpath(str(year)).joinpath('quarterly')
                output_folder.mkdir(parents=True, exist_ok=True)
                output_file = download_url.split('/')[-1]
                urllib.request.urlretrieve(parse_link(href), output_folder.joinpath(output_file))
                LOGGER.info(f"Downloading quarterly report '{tag.string}' to file '{output_file}'")


def main():
    f = TagmulimHaifa("tagmulim_haifa")
    for year in range(2000, 2020):
        f.get_quarterly(year)


if __name__ == "__main__":
    main()


