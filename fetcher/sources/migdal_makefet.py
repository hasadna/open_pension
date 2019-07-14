# THIS IS PARTIAL and does not cover all the funds! Only kranot pensia


import os
from source_interface import SourceInterface, get_filename_from_url
from logger import get_logger

root_url = 'https://www.migdal.co.il/'
makefet_private_query_url = 'https://www.migdal.co.il/He/MigdalMakefet/Investments/Nechasim/Pages/%d%d.aspx'
makefet_mashlima_query_url = 'https://www.migdal.co.il/He/MigdalMakefet/Investments/Nechasim/Pages/m%d%d.aspx'
LOGGER = get_logger()


class MigdalMakefet(SourceInterface):
    PENSION_NAME = 'Migdal Makefet'

    def parse_page(self, target_url):
        base_page = SourceInterface.download_page(target_url, parse=True)
        # this filter isn't good enough so we will be conservative
        tables = base_page.find_all('table', attrs={'summary': ''})
        urls = []
        for table in tables:
            url_tags = table.find_all('a', attrs={'target': '_blank'})
            for url_tag in url_tags:
                url = url_tag.attrs['href']
                if '.xlsx' not in url and '.xls' not in url:
                    continue
                url = root_url + url
                urls.append(url)
        return urls

    def get_quarterly(self, year: int):
        for quarter in range(1, 5):
            month = quarter * 3
            query_year = year % 100  # bottom two digits

            private_query = makefet_private_query_url % (month, query_year)
            mashlim_query = makefet_mashlima_query_url % (month, query_year)
            private_urls = self.parse_page(private_query)
            mashlim_urls = self.parse_page(mashlim_query)
            all_urls = private_urls + mashlim_urls
            for url in all_urls:
                filename = get_filename_from_url(url)
                data = SourceInterface.download_page(url, parse=False)
                filename = str(year) + '_' + str(quarter) + '_' + filename
                file_path = os.path.join(self._output_path, filename)
                with open(file_path, 'wb') as f:
                    f.write(data)


if __name__ == '__main__':
    save_path = '/tmp/migdal_makefet'
    migdal = MigdalMakefet(save_path)
    migdal.get_quarterly(2018)
