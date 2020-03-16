import pdb

from kafka import KafkaConsumer
from json import loads

print('ready')
# To consume latest messages and auto-commit offsets
consumer = KafkaConsumer('processor', bootstrap_servers=['kafka'])
for message in consumer:
    # message value and key are raw bytes -- decode if necessary!
    # e.g., for unicode: `message.value.decode('utf-8')`
    decoded_message = loads(message.value.decode())
    print(decoded_message['key'], decoded_message['value'])
