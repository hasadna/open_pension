FROM python:3.7
MAINTAINER Rajdeep Dua "dua_rajdeep@yahoo.com"
WORKDIR /app
COPY requirements.txt /app
RUN pip install -r requirements.txt
COPY . /app
RUN chmod +x app.py
ENTRYPOINT ["python", "app.py"]