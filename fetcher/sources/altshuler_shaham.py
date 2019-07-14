import os
import re
import urllib
from urllib.parse import urlsplit, unquote

import requests

from source_interface import SourceInterface


def get_filename_from_url(url):
    return unquote(os.path.basename(urlsplit(url).path))


class AltshulerFetcher(SourceInterface):
    PENSION_NAME = 'Altshuler Shaham'

    BASE_URL = "https://www.as-invest.co.il"
    TOP_URL = "https://www.as-invest.co.il/interstedin/%D7%A7%D7%A8%D7%A0%D7%95%D7%AA-%D7%94%D7%A9%D7%AA%D7%9C%D7%9E%D7%95%D7%AA/"
    ASSETS_LIST_TITLE = "רשימת נכסים"

    def __init__(self, output_path: str):
        super().__init__(output_path)
        self._base_page = None

    @staticmethod
    def get_root_menu_page():
        return SourceInterface.download_page(AltshulerFetcher.TOP_URL)

    @staticmethod
    def join_url(uri):
        return urllib.parse.urljoin(AltshulerFetcher.BASE_URL, uri)

    def get_pension_types(self, menu_page):
        pension_types_urls = []
        for pension in menu_page.find_all('table')[0].find_all('a'):
            pension_types_urls.append(AltshulerFetcher.join_url(pension.get('href')))
        return pension_types_urls

    def get_assets_structure_url(self, pension_url):
        assets_panel = None
        for link in pension_url.find_all('li'):
            for btn in link.find_all('button'):
                if self.ASSETS_LIST_TITLE in btn.text.strip():
                    assets_panel = link
                    break

        return [asset for asset in assets_panel.find_all('a', href=re.compile('.*\.xls'))]

    def get_quarterly(self, year: int):
        root_menu_page = self.get_root_menu_page()
        pension_urls = self.get_pension_types(root_menu_page)
        all_assets = []
        for pension_url in pension_urls:
            all_assets.extend(self.get_assets_structure_url(SourceInterface.download_page(pension_url)))

        filtered_asset_urls = [asset for asset in all_assets if not year or str(year) in asset.text]
        for asset in filtered_asset_urls:
            file_url = self.join_url(asset.attrs['href'])
            res = requests.get(file_url)
            downloaded_file_name = get_filename_from_url(res.url)
            with open(os.path.join(self._output_path, downloaded_file_name), "wb") as f:
                f.write(res.content)


def main():
    f = AltshulerFetcher("C:\\temp\\Pensions\\Altshuler Shaham")
    f.get_quarterly(2018)


if __name__ == "__main__":
    main()
