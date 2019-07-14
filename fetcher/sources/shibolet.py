#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import os
import re
import requests
from urllib.parse import urlsplit

from bs4 import BeautifulSoup

from source_interface import SourceInterface


def get_filename_from_url(url):
    return os.path.basename(urlsplit(url).path)


class ShiboletParser(SourceInterface):
    PENSION_NAME = 'Shibolet Pension'
    PENSION_NAME_FILE = 'shibolet'
    SEARCH_STRING = 'רשימת נכסי הקופה'
    base_url_2008_2015 = '''http://www.kdati.org.il/cgi-webaxy/sal/sal.pl?lang=he&ID=812319_kdati&act=show&dbid=pages&dataid=pages_891040_kdati_shibbolet_info_gemel_gemel-%d.htm'''

    urls = {
        2009: base_url_2008_2015 % 2009,
        2008: base_url_2008_2015 % 2008,
        2010: base_url_2008_2015 % 2010,
        2011: base_url_2008_2015 % 2011,
        2012: base_url_2008_2015 % 2012,
        2013: base_url_2008_2015 % 2013,
        2014: base_url_2008_2015 % 2014,
        2015: base_url_2008_2015 % 2015,
        2016: '''http://www.kdati.org.il/cgi-webaxy/sal/sal.pl?lang=he&ID=812319_kdati&act=show&dbid=pages&dataid=pages_891040_kdati_shibbolet_info_gemel_gemel-main.htm''',
        2017: '''http://www.kdati.org.il/cgi-webaxy/item?375''',
        2018: 'http://www.kdati.org.il/cgi-webaxy/item?842',
        2019: '''http://www.kdati.org.il/cgi-webaxy/item?1457'''
    }

    def get_quarterly(self, year: int):
        if year not in self.urls:
            raise ValueError("No support")
        url = self.urls[year]

        page = BeautifulSoup(requests.get(url).text, "html.parser")
        all_links = page.find_all(name='a')
        relevant_links = [x for x in all_links if x.string and x.string.find(self.SEARCH_STRING) != -1]
        file_urls = [(a, a.attrs['href']) for a in relevant_links]

        year_base_dir = os.path.join(self._output_path, str(year))
        if not os.path.exists(year_base_dir):
            os.mkdir(year_base_dir)

        for file_href, file_url in file_urls:
            if 'sal.pl' in file_url:
                continue
            res = requests.get(file_url)
            filename = get_filename_from_url(file_url)

            with open(os.path.join(year_base_dir, filename), "wb") as f:
                f.write(res.content)


def main():
    f = ShiboletParser("/tmp/shibolet")
    f.get_quarterly(2018)


if __name__ == "__main__":
    main()
