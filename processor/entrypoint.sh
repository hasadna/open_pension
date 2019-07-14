#!/bin/sh

if [[ "$(pwd)" != "$APP_DIR" ]]
then
    echo "Navigating to project folder"
    cd $APP_DIR
fi

echo "Running processor"
python parser_report.py