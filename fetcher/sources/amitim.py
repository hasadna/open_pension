
from logger import get_logger, init_logger
from source_interface import SourceInterface, ignore_source, include_source

LOGGER = get_logger()


@ignore_source
class AmitimPension(SourceInterface):
    PENSION_NAME = "Amitim"
    SUB_PENSION_NAME = None
    
    BASE_URL = "https://www.amitim.com/"

    @staticmethod
    def get_root_page_url():

        return SourceInterface.download_page(AmitimPension.BASE_URL)


@include_source
class AmitimKagam(AmitimPension):
    PENSION_NAME = "Amitim - Kagan"
    SUB_PENSION_NAME = "קגם"
    _ignore = False

    def get_quarterly(self, year: int):
        root_menu_page = self.get_root_page_url()
        for url in root_menu_page.find_all('a'):
            print(url)


if __name__ == '__main__':
    init_logger()
    AmitimKagam(output_path=r"c:\temp").get_quarterly(year=2018)
