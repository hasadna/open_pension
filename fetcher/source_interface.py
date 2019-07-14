
import requests
from bs4 import BeautifulSoup
from http import HTTPStatus

from abc import ABCMeta, abstractmethod


class SourceFetchError(Exception):
    def __init__(self, msg, *args):
        super(SourceFetchError, self).__init__(msg % args)


class SourceInterface(metaclass=ABCMeta):
    def __init__(self, output_path: str):
        self.output_path = output_path

    @staticmethod
    def download_page(url, parse=True):
        top_url_page = requests.get(url)
        if HTTPStatus.OK != top_url_page.status_code:
            raise SourceFetchError("Error downloading top URL page: %s", url)

        if parse:
            return BeautifulSoup(top_url_page.content, 'html.parser')
        return top_url_page.content

    @abstractmethod
    def get_annual(self, year: int):
        pass

    @abstractmethod
    def get_quarterly(self, year: int, quarter: int):
        pass
