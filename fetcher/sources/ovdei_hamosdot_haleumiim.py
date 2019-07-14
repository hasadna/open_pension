
import os
import urllib.parse

from logger import get_logger
from source_interface import SourceInterface, SourceFetchError

LOGGER = get_logger()


class OvdeiHamosdotHaleumiim(SourceInterface):
    PENSION_NAME = "Ovdei Hamosdot Haleumiim"

    BASE_URL = "http://kupa.gemeljazo.org.il/"
    TOP_URL = urllib.parse.urljoin(BASE_URL, "GemelWeb/Screens/JazoOpenPage.aspx")
    ASSETS_STRUCTURE_TEXT = b'\xd7\x94\xd7\xa8\xd7\x9b\xd7\x91 \xd7\xa0\xd7\x9b\xd7\xa1\xd7\x99\xd7\x9d'  # herkev nechasim

    @staticmethod
    def get_root_menu_page():
        return SourceInterface.download_page(OvdeiHamosdotHaleumiim.TOP_URL)

    @staticmethod
    def join_url(uri):
        return urllib.parse.urljoin(OvdeiHamosdotHaleumiim.BASE_URL, uri)

    @staticmethod
    def get_assets_structure_url(menu_page):
        for link in menu_page.find_all('a'):
            if OvdeiHamosdotHaleumiim.ASSETS_STRUCTURE_TEXT == link.text.strip().encode("utf-8"):
                return OvdeiHamosdotHaleumiim.join_url(link.get('href'))

        raise SourceFetchError("Couldn't find assets structure menu item")

    @staticmethod
    def list_potential_assets_structure_reports(assets_structure_url):
        reports = []
        for link in SourceInterface.download_page(assets_structure_url).find_all('a'):
            uri = link.get('href')
            if not uri or not uri.endswith(".xls"):
                continue

            reports.append((link.text, OvdeiHamosdotHaleumiim.join_url(uri)))

        return sorted(reports)

    def get_quarterly(self, year: int):
        root_menu_page = self.get_root_menu_page()
        menu_page = SourceInterface.download_page(root_menu_page.a.get('href'))

        assets_structure_url = OvdeiHamosdotHaleumiim.get_assets_structure_url(menu_page)

        index = 1
        for title, url in OvdeiHamosdotHaleumiim.list_potential_assets_structure_reports(assets_structure_url):
            if str(year) in title:
                ext = url.rsplit(".")[-1]
                fname = "report_%d_%d.%s" % (year, index, ext)
                LOGGER.info("Downloading quarterly report '%s': %s", title, fname)

                with open(os.path.join(self._output_path, fname), "wb") as fp:
                    fp.write(self.download_page(url, parse=False))

                index += 1


if __name__ == '__main__':
    OvdeiHamosdotHaleumiim(output_path=r"c:\temp").get_quarterly(year=2018)
