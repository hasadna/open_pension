from parser_report import ExcelParser
from loggers.fake_logger import FakeLogger
import os
import json

main_dir = "/Applications/MAMP/htdocs/open_pension/processor/source_files"
output_folder = "/Applications/MAMP/htdocs/open_pension/processor/output_folder"

passed = ["foo", "bar"]
failed = [{"file": "foo", "error": "bar"}]

i = 0
for root, subfolder, files in os.walk(main_dir):

    for file_path in files:
        full_path = root + "/" + file_path

        print(f"processing {full_path}")

        try:
            parser = ExcelParser(logger=FakeLogger)
            parsed = parser.parse_file(file_path=full_path)
            passed.append(full_path)

            f = open(f"{output_folder}/{i}-{file_path}.json", "a")
            f.write(json.dumps(parsed))
            f.close()
            i = i + 1
        except Exception as ex:
            failed.append({'file': full_path, 'error': ex})

print("Passed:")
print(passed)
print("failed:")
print(failed)
