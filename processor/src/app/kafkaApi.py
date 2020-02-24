from kafka import KafkaProducer
from kafka.errors import KafkaError
from msgpack import dumps
from logging import log
from json import dumps


def send_json():
    producer = KafkaProducer(bootstrap_servers=['kafka'], value_serializer=lambda v: dumps(v).encode('utf-8'))

    # Asynchronous by default
    future = producer.send('processor', {'key': 'value'})

    # Block for 'synchronous' sends
    try:
        record_metadata = future.get(timeout=10)
    except KafkaError:
        # Decide what to do if produce request failed...
        log.exception()
        pass


send_json()
