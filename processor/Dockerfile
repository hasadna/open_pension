FROM python:3.7
MAINTAINER Rajdeep Dua "dua_rajdeep@yahoo.com"
COPY . /app
WORKDIR /app
RUN chmod +x app.py
RUN pip install -r requirements.txt
ENTRYPOINT ["python", "app.py"]
