import json
import os
import re
import time

import requests

from isin_list import ISIN_LIST_LARGE, REJECTED_EDITED

ISIN_PATTERN = re.compile('^[A-Z]{2}[A-Z0-9]{9}\\d$')
OPEN_FIGI_LARGE_BULK = 100
OPEN_FIGI_SMALL_BULK = 5

def check_isin_validity(isin):
	# Check regex validity
	if not ISIN_PATTERN.match(isin.upper()):
		return False
	# Convert from base36 to base10 and check the checksum with luhn's algorithm
	return luhn_validation(base36decodeIsin(isin))


def create_json_for_output(resp, isin_list):
	# Add Isin to open figi data
	open_figi_resp = json.loads(resp)
	for index, val in enumerate(open_figi_resp):
		open_figi_resp[index]["isin"] = isin_list[index]
	return json.dumps(open_figi_resp)


def check_isin_open_figi(isin_list):
	data = [{"idType": "ID_ISIN", "idValue": isin} for isin in isin_list]
	ret = requests.post(url="https://api.openfigi.com/v2/mapping",
						data=json.dumps(data),
						headers={
							"Content-Type": "application/json",
							"X-OPENFIGI-APIKEY": os.environ.get("X-OPENFIGI-APIKEY")
						})

	print("Waiting 3 seconds to continue")
	time.sleep(0.2)
	return ret.content


def base36decodeIsin(isin):
	base_10_str = ''
	for i in isin:
		base_10_str += str(int(i, 36))
	return base_10_str


def sum_digits(digit):
	if digit < 10:
		return digit
	else:
		sum = (digit % 10) + (digit // 10)
		return sum


def luhn_validation(isin_num):
	# reverse the credit card number
	isin_num = isin_num[::-1]
	# convert to integer list
	isin_num = [int(x) for x in isin_num]
	# double every second digit
	doubled_second_digit_list = list()
	digits = list(enumerate(isin_num, start=1))
	for index, digit in digits:
		if index % 2 == 0:
			doubled_second_digit_list.append(digit * 2)
		else:
			doubled_second_digit_list.append(digit)

	# add the digits if any number is more than 9
	doubled_second_digit_list = [sum_digits(x) for x in doubled_second_digit_list]
	# sum all digits
	sum_of_digits = sum(doubled_second_digit_list)
	# return True or False
	return sum_of_digits % 10 == 0


def create_isin_list(isin_list):
	# Check validity of numbers in the list.
	# Return a list of reject and approved isin numbers
	approved_isin_list = [isin for isin in isin_list if check_isin_validity(isin)]
	rejected_isin_list = set(approved_isin_list).symmetric_difference(set(isin_list))
	return approved_isin_list, rejected_isin_list


def create_bulks(isin_list):
	# Create bulks to send to OpenFIGI according to limits
	# Return a list of lists with isin numbers
	bulk_size = OPEN_FIGI_LARGE_BULK if os.environ.get("X-OPENFIGI-APIKEY", "") else OPEN_FIGI_SMALL_BULK

	# TODO - test this part to see if bulks correctly
	bulked_list = []
	for i in range((len(isin_list) * bulk_size - 1) // bulk_size):
		bulked_list.append(isin_list[i * bulk_size: (i + 1) * bulk_size])
	return bulked_list

if __name__ == "__main__":

	# Receive Bulk data from json file
		# check if file in json format - if not, send an error
	# Load Json into dictionary (if from service, load from request)
	isin_list = REJECTED_EDITED
	approved_isin_list, rejected_isin_list = create_isin_list(isin_list)
	bulks_list = create_bulks(approved_isin_list)
	# If exists OPEN_FIGI_API - create bulks of 100, if not, create bulks of 5
	# Send to openfigi to check isin
	# send response back - save to file or send as response

	isin_check_list = []  # store 5 isin numbers to check in open_figi - less api calls
	count = 32
	for index, isin in enumerate(REJECTED_EDITED):
		if check_isin_validity(isin):
			isin_check_list.append(isin)
			if len(isin_check_list) == 100 or index == len(REJECTED_EDITED) - 1:
				resp = check_isin_open_figi(isin_check_list)
				out = create_json_for_output(resp, isin_check_list)
				with open("isin_lists/isin_list{}.json".format(str(count)), "wb+") as f:
					f.writelines(out)
				isin_check_list = []
				count += 1
		else:
			out = isin + "\n"
			with open("isin_lists/reject_list2.txt", "ab+") as f:
				f.writelines(out)


'''
https://rosettacode.org/wiki/Validate_International_Securities_Identification_Number

Test Cases

US0378331005	valid	
US0373831005	not valid	The transposition typo is caught by the checksum constraint.
U50378331005	not valid	The substitution typo is caught by the format constraint.
US03378331005	not valid	The duplication typo is caught by the format constraint.
AU0000XVGZA3	valid	
FR0000988040	valid	
'''
