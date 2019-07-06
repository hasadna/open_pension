import time
import logging
import os
from urllib.parse import unquote
from urllib.parse import quote
import json
import glob
from multiprocessing.dummy import Pool as ThreadPool
import urllib3

# TEST
try:
    # IF linux and XVFB installed (apt-get), you have to use pvd
    from pyvirtualdisplay import Display

    display = Display(visible=0, size=(1366, 768))
    display.start()
except Exception as e:
    pass
try:
    import requests
except ModuleNotFoundError:
    print("Please Install 'requests' module using 'pip install requests'")
    exit(1)
try:
    from selenium import webdriver
    from selenium.common.exceptions import WebDriverException
    from selenium.webdriver.support.ui import Select as HTML_Select
except ModuleNotFoundError:
    print("Please Install 'selenium' module using 'pip install selenium'")
    exit(1)
try:
    opt = webdriver.ChromeOptions()
    opt.add_argument('headless')
    d = webdriver.Chrome(options=opt)
    d.close()
    d.quit()
except WebDriverException:
    site = "https://sites.google.com/a/chromium.org/chromedriver/home"
    print(f"Please download 'chromedriver' from {site} and/or add to PATH")
    exit(1)


class PensyanetFetcher:
    MAIN_URL = 'https://pensyanet.cma.gov.il/Parameters/Index'
    XML_URL = 'https://pensyanet.cma.gov.il/Parameters/ExportToXML'
    BITUACH_MAIN_URL = \
        'https://bituachnet.cma.gov.il/' \
        'bituachTsuotUI/Tsuot/UI/bituachTsuotUI.aspx'
    BITUACH_XML_URL = \
        'https://bituachnet.cma.gov.il/' \
        'bituachTsuotUI/Tsuot/UI/horadatXMLMain.aspx'
    BITUACH_XML_URL_FINAL = \
        'https://bituachnet.cma.gov.il/bituachTsuotUI/Tsuot/UI/horadatXML.aspx'
    PENSYA_TYPE_DICT = {"maslul_perut": "0", "maslul_rashi": "1",
                        "maslul_sahir": "2",
                        "kranot_perut": "3", "kranot_rashi": "4",
                        "kranot_sahir": "5",
                        "kranot_klali": "6", "maslul_klali": "7"}

    def __init__(self, output_path=os.getcwd()):
        self.output_path = output_path
        self.cookies = {}
        self.cookies_bituach = {}
        self.logger = logging.getLogger('PensyanetFetcher')
        self.logger.setLevel(logging.DEBUG)
        fh = logging.FileHandler('fetcher.log')
        fh.setLevel(logging.DEBUG)
        ch = logging.StreamHandler()
        ch.setLevel(logging.DEBUG)
        formatter = logging.Formatter(
            '%(asctime)s - %(name)s - %(levelname)s - %(message)s')
        fh.setFormatter(formatter)
        ch.setFormatter(formatter)
        self.logger.addHandler(fh)
        self.logger.addHandler(ch)
        self.logger.info("Created a new Fetcher Object!")
        urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

    def write_file(self, req_obj, full_path):
        with open(full_path, "wb") as f:
            for block in req_obj.iter_content(1024):
                f.write(block)
        self.logger.info(f"Finished writing {full_path}")

    def get_cookies(self, cookie_site=MAIN_URL):
        """
        A method that uses selenium, headless-mode chrome web driver to
        fetch the needed cookies for the future xml export.
        :return dict: cs
        """
        self.logger.info("Getting cookies... " + cookie_site)
        options = webdriver.ChromeOptions()
        options.add_argument('headless')
        driver = webdriver.Chrome(options=options)
        driver.get(cookie_site)
        selenium_cookies = driver.get_cookies()
        driver.close()
        driver.quit()
        final_cookie_jar = {}
        for cookie in selenium_cookies:
            final_cookie_jar[cookie["name"]] = cookie["value"]
        if cookie_site == self.MAIN_URL:
            self.cookies = final_cookie_jar
        elif cookie_site == self.BITUACH_MAIN_URL:
            self.cookies_bituach = final_cookie_jar
            for k, v in final_cookie_jar.items():
                print(k + '=' + v + ';')

    @classmethod
    def generate_post_data(cls, month="01", year="2018",
                           fetch_type="maslul_perut"):
        with open(f"post_data_template{cls.PENSYA_TYPE_DICT[fetch_type]}.txt",
                  "r") as f:
            post_data_template = f.read()
        json_string_template = unquote(post_data_template)[3:]
        data_prefix = post_data_template[:3]
        j = json.loads(json_string_template)
        j["ReportStartDate"] = f"{year}-{month}-01T22:00:00.000Z"
        j["ReportEndDate"] = f"{year}-{month}-01T22:00:00.000Z"
        # Maximum Start and End date:
        # j["ReportStartDate"] = "1998-12-31T22:00:00.000Z"
        # j["ReportEndDate"] = "2018-08-31T21:00:00.000Z"
        json_string_final = json.dumps(j)
        send_data = quote(data_prefix + json_string_final) \
            .replace("%3D", "=") \
            .replace("%2B", "+") \
            .replace("/", "%2F")
        return send_data

    @staticmethod
    def generate_headers(post_data_len):
        headers = {"Host": "pensyanet.cma.gov.il",
                   "Connection": "keep-alive",
                   "Content-Length": str(post_data_len),
                   "Cache-Control": "max-age=0",
                   "Origin": "https://pensyanet.cma.gov.il",
                   "Upgrade-Insecure-Requests": "1",
                   "Content-Type": "application/x-www-form-urlencoded",
                   "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
                                 "AppleWebKit/537.36 (KHTML, like Gecko) "
                                 "Chrome/70.0.3538.77 Safari/537.36",
                   "Accept": "text/html,application/xhtml+xml,application/xml;"
                             "q=0.9,image/webp,image/apng,*/*;q=0.8",
                   "Referer": "https://pensyanet.cma.gov.il/Parameters/Index",
                   "Accept-Encoding": "gzip, deflate, br",
                   "Accept-Language": "en-US,en;q=0.9"}
        return headers

    def get_xml(self, month="01",
                year="2018", fetch_type="maslul_perut"):
        data = self.generate_post_data(month, year, fetch_type)
        headers = self.generate_headers(len(data))
        if self.cookies == {}:
            self.get_cookies()
        cookies = self.cookies
        self.logger.info(
            f"Downloading Pensyanet {year}_{month}_{fetch_type}")
        file_name = f"pensyanet_{year}_{month}_{fetch_type}.xml"
        attempts = 0
        r = None
        while r is None and attempts < 5:
            try:
                r = requests.post(self.XML_URL,
                                  verify=False,
                                  cookies=cookies,
                                  headers=headers,
                                  data=data,
                                  stream=True)
                file_path = os.path.join(self.output_path, file_name)
                self.write_file(r, file_path)
            except Exception as e:
                if attempts < 4:
                    self.logger.error(
                        f"Error {e} Occurred on {file_name}, "
                        f"attempt {attempts}")
                    attempts += 1
                    time.sleep(3)
                else:
                    self.logger.error(
                        f"Error {e} Occurred on {file_name}, "
                        f"GIVING UP.")

    def get_all_xml_types(self, month="01", year="2018"):
        for fetch_type in self.PENSYA_TYPE_DICT.keys():
            self.get_xml(month=month, year=year, fetch_type=fetch_type)

    def get_all_xml_ever(self):
        # Kranot Penstanet XMLs are only available since 6/2016
        years = range(2009, 2010)
        months = range(9, 10)
        for year in years:
            for month in months:
                if year == 2018 and month > 11:
                    break
                fixed_month = str(month).zfill(2)
                fixed_year = str(year)
                self.get_xml(month=fixed_month, year=fixed_year,
                             fetch_type="kranot_klali")
                # self.get_all_xml_types(month=fixed_month, year=fixed_year)
                # self.get_gemelnet_xml(month=fixed_month, year=fixed_year)

    def get_gemelnet_xml(self, month="01", year="2018"):
        headers = {"Host": "gemelnet.cma.gov.il",
                   "Connection": "keep-alive",
                   "Upgrade-Insecure-Requests": "1",
                   "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
                                 "AppleWebKit/537.36 (KHTML, like Gecko)"
                                 " Chrome/70.0.3538.77 Safari/537.36",
                   "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,"
                             "image/webp,image/apng,*/*;q=0.8",
                   "Referer": "https://gemelnet.cma.gov.il/views/dafmakdim.aspx",
                   "Accept-Encoding": "gzip, deflate, br",
                   "Accept-Language": "en-US,en;q=0.9"}
        fetch_types = {"perut": "4", "sikum": "5", "sahir": "2"}
        url = "https://gemelnet.cma.gov.il/tsuot/ui/tsuotHodXML.aspx"
        for fetch_type in fetch_types.keys():
            params = {"miTkfDivuach": f"{year}{month}",
                      "adTkfDivuach": f"{year}{month}",
                      "kupot": "0000",
                      "Dochot": "1",
                      "sug": f"{fetch_types[fetch_type]}"}
            self.logger.info(
                f"Downloading Gemelnet {year}_{month}_{fetch_type}")
            file_name = f"gemelnet_{year}_{month}_{fetch_type}.xml"
            attempts = 0
            r = None
            while r is None and attempts < 5:
                try:
                    r = requests.get(url,
                                     params=params,
                                     headers=headers,
                                     stream=True,
                                     verify=False)
                    file_path = os.path.join(self.output_path, file_name)
                    self.write_file(r, file_path)
                except Exception as e:
                    if attempts < 4:
                        self.logger.error(
                            f"Error {e} Occurred on {file_name}, "
                            f"attempt {attempts}")
                        attempts += 1
                    else:
                        self.logger.error(
                            f"Error {e} Occurred on {file_name}, "
                            f"GIVING UP.")

    def get_xml_bituach_sel(self, month="01", year="2018"):
        options = webdriver.ChromeOptions()
        options.add_experimental_option("prefs", {
            "download.default_directory": self.output_path,
            "download.prompt_for_download": False,
            "download.directory_upgrade": True,
            "safebrowsing.enabled": True
        })
        # options.add_argument('headless')
        driver = webdriver.Chrome(options=options)
        driver.get(self.BITUACH_MAIN_URL)
        bituach_xpaths = \
            {
                "select_all_xpath": "//*[@id=\"output\"]/option[1]",
                "move_select_all_xpath": "//*[@id=\"addone\"]",
                "open_xml_xpath": "//*[@id=\"cbXML\"]"
            }
        for path in bituach_xpaths.values():
            driver.find_element_by_xpath(path).click()
            time.sleep(4)
        xml_window = driver.window_handles[1]
        time.sleep(1)
        # print("Original Window:", driver.current_url, driver.title)
        for download_type in range(4):
            self.logger.info(f"Downloading bituachnet_{year}_{month}_type"
                             f"{str(download_type)}.xml")
            driver.switch_to.window(xml_window)
            # print("Switched to: ", driver.current_url, driver.title)
            # Select From Month
            sel = HTML_Select(driver.find_element_by_id("hodashme"))
            sel.select_by_value(month[1])
            # Select From Year
            sel = HTML_Select(driver.find_element_by_id("shanimme"))
            sel.select_by_value(year)
            # Select To Month
            sel = HTML_Select(driver.find_element_by_id("hodashad"))
            sel.select_by_value(month[1])
            # Select To Year
            sel = HTML_Select(driver.find_element_by_id("shanimad"))
            sel.select_by_value(year)
            driver.find_element_by_id(f'rdl_{str(download_type)}').click()
            # Download
            time.sleep(2)
            driver.find_element_by_id('cbBatzea').click()
            time.sleep(4)
            new_name = f'bituachnet_{year}_{month}_type{download_type}.xml'
            list_of_files = glob.glob(os.path.join(self.output_path, '*'))
            latest_file = max(list_of_files, key=os.path.getctime)
            try:
                os.rename(latest_file,
                          os.path.join(os.path.dirname(latest_file),
                                       new_name))
            except FileExistsError:
                pass
        driver.close()
        driver.quit()
        time.sleep(4)

    def get_all_by_month(self, month='01', year='2019'):
        try:
            self.get_xml_bituach_sel(month, year)
        except:
            self.logger.error(f'Problem with bituach {month}/{year}')
        try:
            self.get_gemelnet_xml(month, year)
        except:
            self.logger.error(f'Problem with gemel {month}/{year}')
        try:
            self.get_all_xml_types(month, year)
        except:
            self.logger.error(f'Problem with pensya {month}/{year}')

    def get_all_year(self, year='2018'):
        arr = [f"{x:02d}" for x in range(1, 13)]
        for m in arr:
            self.get_all_by_month(year=year, month=m)


def main():
    fetcher = PensyanetFetcher(output_path=r"D:\data\hasadna\generals")
    start_time = time.time()
    for y in range(2000, 2020):
        fetcher.get_all_year(year=str(y))
    print("--- %s seconds ---" % (time.time() - start_time))


if __name__ == "__main__":
    main()
