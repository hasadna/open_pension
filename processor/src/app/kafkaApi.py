from kafka import KafkaProducer
from kafka.errors import KafkaError
from msgpack import dumps
from json import dumps
import logging

log = logging.getLogger(__name__)


def send_json(data, topic='processor'):
    producer = KafkaProducer(bootstrap_servers=['kafka'], value_serializer=lambda v: dumps(v).encode('utf-8'))
    producer.send(topic, data)
    producer.flush()
