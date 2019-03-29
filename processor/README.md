[![Build Status](https://travis-ci.org/hasadna/open_processor.svg?branch=master)](https://travis-ci.org/hasadna/open_processor)

# Open Processor

Welcome to open processor

## Setup
```bash
pip3 install -r requirements.txt
```

## Parsing a file
In order to handle a file you'll need to do something like this:
```python

from parser_report import ExcelParser
from loggers.fake_logger import FakeLogger


path = PATH_TO_FILE

parser = ExcelParser(logger=FakeLogger)
parsed = parser.parse_file(file_path=path)


print(parsed)
```

## Run pep8 tests

```bash
# If you need to install the pycode style
# pip install pycodestyle flake8 isort
pycodestyle --show-source --max-line-length=120 --show-pep8 .
```