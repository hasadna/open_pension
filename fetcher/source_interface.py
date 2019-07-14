import os
import sys
from abc import ABCMeta, abstractmethod
from http import HTTPStatus
from urllib.parse import urlsplit

import requests
from bs4 import BeautifulSoup

from logger import get_logger

LOGGER = get_logger()


def get_filename_from_url(url):
    return os.path.basename(urlsplit(url).path)


class SourceFetchError(Exception):
    def __init__(self, msg, *args):
        super(SourceFetchError, self).__init__(msg % args)


IGNORE_SOURCE_ATTR = "_ignore"


def ignore_source(cls):
    setattr(cls, IGNORE_SOURCE_ATTR, True)
    return cls


def include_source(cls):
    setattr(cls, IGNORE_SOURCE_ATTR, False)
    return cls


class SourceInterface(metaclass=ABCMeta):
    PENSION_NAME = None

    def __init__(self, output_path: str):
        self._output_path = output_path
        self.logger = get_logger()

    @staticmethod
    def get_selenium_chrome_driver():
        try:
            from selenium import webdriver
        except ImportError:
            raise SourceFetchError("Missing 'selenium' package")

        if not sys.platform.startswith("win"):
            raise SourceFetchError(r"Need to add support for non-Windows machines ¯\_(ツ)_/¯")

        chrome_driver_path = os.path.join(os.path.dirname(__file__), "tools", "chromedriver.exe")
        if not os.path.isfile(chrome_driver_path):
            raise SourceFetchError("Missing 'chromedriver.exe' (expected under %s)", chrome_driver_path)

        return webdriver.Chrome(chrome_driver_path)

    @staticmethod
    def download_page(url, parse=True):
        LOGGER.debug("Downloading URL: %s", url)

        top_url_page = requests.get(url)
        if HTTPStatus.OK != top_url_page.status_code:
            raise SourceFetchError("Error downloading top URL page: %s", url)

        if parse:
            charset_location = top_url_page.headers['Content-Type'].find('charset=')
            if charset_location != 1:
                charset = top_url_page.headers['Content-Type'][charset_location + len('charset='):]
            else:
                charset = 'utf-8'
            return BeautifulSoup(top_url_page.content, 'html.parser', from_encoding=charset)
        return top_url_page.content

    @abstractmethod
    def get_quarterly(self, year: int):
        pass

    def download_to_file(self, url):
        response = requests.get(url)

        basename = os.path.basename(urlsplit(url).path)
        file_path = os.path.join(self._output_path, basename)
        with open(file_path, 'wb') as f:
            f.write(response.content)
            LOGGER.info(f'Saved file {url} to {file_path}')
