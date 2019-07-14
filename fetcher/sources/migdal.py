import os
from source_interface import SourceInterface, get_filename_from_url
from logger import get_logger

root_url = 'https://www.migdal.co.il/'
home_url = "https://www.migdal.co.il/He/MigdalTeam/investments/Assets/Pages/default.aspx"
query_url = 'https://www.migdal.co.il/He/MigdalTeam/investments/Assets/Pages/Q%d_%d.aspx'
LOGGER = get_logger()


class Migdal(SourceInterface):
    PENSION_NAME = 'Migdal'

    def get_quarterly(self, year: int):
        for quarter in range(1, 5):
            target_url = query_url % (quarter, year)
            base_page = SourceInterface.download_page(target_url, parse=True)
            # this filter isn't good enough so we will be conservative
            tables = base_page.find_all('table', attrs={'summary': ''})
            for table in tables:
                url_tags = table.find_all('a', attrs={'target': '_blank'})
                for url_tag in url_tags:
                    url = url_tag.attrs['href']
                    if '.xlsx' not in url and '.xls' not in url:
                        continue
                    url = root_url + url
                    filename = get_filename_from_url(url)
                    data = SourceInterface.download_page(url, parse=False)
                    filename = str(year) + '_' + str(quarter) + '_' + filename
                    file_path = os.path.join(self._output_path, filename)
                    with open(file_path, 'wb') as f:
                        f.write(data)


if __name__ == '__main__':
    save_path = '/tmp/migdal'
    migdal = Migdal(save_path)
    migdal.get_quarterly(2018)
