# !/usr/bin/env python
import json
import os
import threading, logging, time
import multiprocessing
from kafka import KafkaConsumer, KafkaProducer


conf = {
    'bootstrap_servers': os.environ['CLOUDKARAFKA_BROKERS'],
    'security_protocol': 'SASL_SSL',
    'sasl_mechanism': 'SCRAM-SHA-256',
    'sasl_plain_username': os.environ['CLOUDKARAFKA_USERNAME'],
    'sasl_plain_password': os.environ['CLOUDKARAFKA_PASSWORD']
}


class Producer(threading.Thread):
    def __init__(self):
        threading.Thread.__init__(self)
        self.stop_event = threading.Event()

    def stop(self):
        self.stop_event.set()

    def run(self):
        # producer = KafkaProducer(value_serializer=lambda m: json.dumps(m).encode('utf-8'), **conf)
        producer = KafkaProducer(**conf)

        while not self.stop_event.is_set():
            # future = producer.send('9nvtp3tq-default', {'test-key': 'test-value'})
            producer.send('9nvtp3tq-default', b"test")
            producer.send('9nvtp3tq-default', b"\xc2Hola, mundo!")
            time.sleep(1)

        producer.close()


class Consumer(multiprocessing.Process):
    def __init__(self):
        multiprocessing.Process.__init__(self)
        self.stop_event = multiprocessing.Event()

    def stop(self):
        self.stop_event.set()

    def run(self):
                             # value_deserializer=lambda m: json.dumps(m).encode('utf-8')
        consumer = KafkaConsumer('9nvtp3tq-default',
                                 auto_offset_reset='earliest',
                                 consumer_timeout_ms=1000,
                                 **conf)

        while not self.stop_event.is_set():
            for message in consumer:
                print(message)
                if self.stop_event.is_set():
                    break

        consumer.close()


def main():
    tasks = [
        Producer(),
        Consumer()
    ]

    for t in tasks:
        t.start()

    time.sleep(10)

    for task in tasks:
        task.stop()

    for task in tasks:
        task.join()


if __name__ == "__main__":
    logging.basicConfig(
        format='%(asctime)s.%(msecs)s:%(name)s:%(thread)d:%(levelname)s:%(process)d:%(message)s',
        level=logging.INFO
    )
    main()