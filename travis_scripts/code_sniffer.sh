#!/usr/bin/env bash

pip install pycodestyle
pip install --upgrade pycodestyle
source ~/.bash_profile
source ~/.bashrc
pycodestyle --show-pep8 server