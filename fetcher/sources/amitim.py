
from logger import get_logger, init_logger
from source_interface import SourceInterface, ignore_source

LOGGER = get_logger()


"""
README:
This source is broken due to the use of Amitim with "reblaze". Basically, it tries and
blocks clients which don't behave as human and both 'requests' and 'selenium' fails their
tests. The sad thing about it is that there are 8 pension funds managed by them.
"""


@ignore_source
class AmitimPension(SourceInterface):
    PENSION_NAME = "Amitim"
    SUB_PENSION_NAME = None
    
    BASE_URL = "https://www.amitim.com/"
    USER_AGENT = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Safari/537.36"

    @staticmethod
    def get_root_page_url():
        driver = SourceInterface.get_selenium_chrome_driver()
        driver.get(AmitimPension.BASE_URL)
        gclb_cookie = driver.get_cookie("GCLB")
        driver.close()

        return SourceInterface.download_page(AmitimPension.BASE_URL,
                                             headers={"User-Agent": AmitimPension.USER_AGENT,
                                                      "cache-control": "no-cache",
                                                      "pragma": "no-cache",
                                                      "accept-encoding": "gzip, deflate, br",
                                                      "accept-language": "en-US,en;q=0.9,he;q=0.8,ca;q=0.7"
                                                      },
                                             allow_redirects=True,
                                             cookies=dict(GCLB=gclb_cookie['value']))


@ignore_source
class AmitimKagam(AmitimPension):
    PENSION_NAME = "Amitim - Kagan"
    SUB_PENSION_NAME = "קגם"
    _ignore = False

    def get_quarterly(self, year: int):
        root_menu_page = self.get_root_page_url()
        for url in root_menu_page.find_all('a'):
            self.logger.info(url)


if __name__ == '__main__':
    init_logger()
    AmitimKagam(output_path=r"c:\temp").get_quarterly(year=2018)
