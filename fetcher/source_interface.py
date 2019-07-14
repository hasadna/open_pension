
import requests
from bs4 import BeautifulSoup
from http import HTTPStatus

from abc import ABCMeta, abstractmethod

from logger import get_logger


class SourceFetchError(Exception):
    def __init__(self, msg, *args):
        super(SourceFetchError, self).__init__(msg % args)


class SourceInterface(metaclass=ABCMeta):
    PENSION_NAME = None

    def __init__(self, output_path: str):
        self._output_path = output_path
        self.logger = get_logger()

    @staticmethod
    def download_page(url, parse=True):
        top_url_page = requests.get(url)
        if HTTPStatus.OK != top_url_page.status_code:
            raise SourceFetchError("Error downloading top URL page: %s", url)

        if parse:
            return BeautifulSoup(top_url_page.content, 'html.parser')
        return top_url_page.content

    @abstractmethod
    def get_quarterly(self, year: int):
        pass
