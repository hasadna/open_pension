import json
import os

path = os.path.join(os.path.dirname(__file__), 'isin_lists')

def process_jsons():
	for file in os.listdir(path):
		if file.endswith(".json"):
			with open(os.path.join(path,file)) as f:
				isin_dict = json.load(f)
				print isin_dict


if __name__ == "__main__":
	process_jsons()