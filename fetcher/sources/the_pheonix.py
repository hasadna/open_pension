import os
import requests
import datetime
from source_interface import SourceInterface, get_filename_from_url
from logger import get_logger

base_url = "https://www.fnx.co.il/SPF/iframe-reshimat-nichsey-hamevateah.aspx"
query = base_url + '?page=%d'

LOGGER = get_logger()


class ThePheonix_consolidated(SourceInterface):
    PENSION_NAME = 'The Phoenix'

    _cache_init = False
    _cache = {}

    def get_bounds(self):
        main_page = SourceInterface.download_page(base_url, parse=True)
        edge_link = main_page.find('a', text='<<')
        end_link = edge_link.attrs['href']
        num_pages = int(end_link[end_link.find('=') + 1:])
        return num_pages

    def get_all_urls(self):
        if self._cache_init:
            return self._cache
        max_page = self.get_bounds()
        for i in range(1, max_page + 1):
            page_url = query % i
            page_content = SourceInterface.download_page(page_url, parse=True)
            table = page_content.find("table", {"class": "archive-documents"})
            rows = table.findAll("tr")
            rows = rows[1:]  # skip table heading
            for row in rows:
                cols = row.find_all('td')
                file_col = cols[0]
                date_col = cols[-1]
                file_url = file_col.string[file_col.string.find('http'):]
                date = datetime.datetime.strptime(date_col.string[3:], '%m/%Y')
                if date in self._cache:
                    self._cache[date].append(file_url)
                else:
                    self._cache[date] = [file_url]
        self._cache_init = True
        return self._cache

    def get_quarterly(self, year: int):
        if not self._cache_init:
            self.get_all_urls()
        for quarter in range(1, 5):
            month = quarter * 3
            target_date = datetime.datetime(year, month, day=1)
            if target_date not in self._cache:
                continue
            urls = self._cache[target_date]
            for url in urls:
                filename = get_filename_from_url(url)
                data = SourceInterface.download_page(url, parse=False)
                filename = target_date.strftime('%Y_%m') + '_' + filename
                file_path = os.path.join(self._output_path, filename)
                with open(file_path, 'wb') as f:
                    f.write(data)


if __name__ == '__main__':
    save_path = '/tmp/the_pheonix'
    pheonix = ThePheonix_consolidated(save_path)
    pheonix.get_quarterly(2019)
