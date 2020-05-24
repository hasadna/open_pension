FROM python:3

COPY ./requirements.txt /app/requirements.txt
WORKDIR /app
RUN pip install -r requirements.txt
COPY . /app/enrichment

ENV PYTHONPATH "${PYTHONPATH}:/app"
CMD [ "python", "./enrichment/app.py" ]
