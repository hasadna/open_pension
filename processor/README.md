# Processor

In order to run multiple file processing first create a virtual env for the 
project. I'll demonstrate with vritualenv wrapper:

```bash
mkvirtualenv processor
pip install -r src/app/requirements.txt
```

Next, make sure the files are extracted somewhere and you have a folder to dump
the files to:

```bash
python single-asset-cli.py --folder=1 --output_folder=OUTPUT_FOLDER_PATH ORIGIN_FOLDER
```
