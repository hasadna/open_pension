import re
import urllib.request

from urllib import parse
from urllib.parse import urljoin
from pathlib import Path

from logger import get_logger


from source_interface import SourceInterface

LOGGER = get_logger()


def parse_link(link):
    scheme, netloc, path, query, fragment = parse.urlsplit(link)
    path = parse.quote(path)
    return parse.urlunsplit((scheme, netloc, path, query, fragment))


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


class JewishAgencyWorkers(SourceInterface):
    PENSION_NAME = 'jewishAgencyWorkers'

    BASE_URL = "http://kupa.gemeljazo.org.il/"
    SEARCH_URL = urljoin(BASE_URL, "GemelWeb/Templates/DownloadForms.aspx?menuItem=271")

    def __init__(self, output_path: str):
        super().__init__(output_path)
        self._base_page = self.download_page(self.SEARCH_URL)

    def get_quarterly(self, year: int):
        for tag in self._base_page.findAll("a"):
            href = tag.attrs.get("href")
            if file_is_relevant(href):
                if not str(year) in re.findall(r'(19|20\d{2})', tag.string):
                    continue
                download_url = self.BASE_URL + href
                output_folder = Path(self._output_path).joinpath(str(year)).joinpath('quarterly')
                output_folder.mkdir(parents=True, exist_ok=True)
                output_file = download_url.split('/')[-1]
                download_url = parse_link(self.BASE_URL + href)
                urllib.request.urlretrieve(download_url, output_folder.joinpath(output_file))
                LOGGER.info(f"Downloading quarterly report '{tag.string}' to file '{output_file}'")


def main():
    f = JewishAgencyWorkers("gameljazo")
    for year in range(2000, 2020):
        f.get_quarterly(year)


if __name__ == "__main__":
    main()


