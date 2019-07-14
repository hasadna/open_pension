import os
import re

import requests
from bs4 import BeautifulSoup

base_url = "http://ami-gml.co.il"

base_url_reports = "http://ami-gml.co.il/%d7%a8%d7%a9%d7%99%d7%9e%d7%aa-%d7%a0%d7%9b%d7%a1%d7%99%d7%9d-%d7%93%d7%95%d7%97%d7%95%d7%aa-%d7%9e%d7%90%d7%95%d7%97%d7%93%d7%99%d7%9d-{year}"

report_text_base = "דוח נכסים רבעון"

report_text_template = '{base} {quarter} {year}'

save_path = '/tmp/reports'


def get_ami_gml_quarterly(year, quarter):
    """
    עמ"י - חברה לניהול קופות גמל ענפיות בע"מ
    :param year:
    :param quarter:
    :return:
    """
    base_url_yearly = base_url_reports.format(year=year)
    r = requests.get(base_url_yearly)
    parsed_html = BeautifulSoup(r.content)

    items = parsed_html.find_all(href=re.compile(f'.*gsum_{quarter:02}{str(year)[-2:]}.*'))
    if not items:
        print(f"Failed finding report for {year}-{quarter}")
        return

    href = items[0]['href']

    d = requests.get(base_url + '/' + href)

    file_path = os.path.join(save_path, f'{year}-{quarter}.xls')
    with open(file_path, 'wb') as f:
        f.write(d.content)
        print(f'Saved file {href} to {file_path}')


if __name__ == '__main__':
    get_ami_gml_quarterly(2018, 1)