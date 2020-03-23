from kafka import KafkaConsumer
from json import loads

print('Waiting for messages to come')
# To consume latest messages and auto-commit offsets
consumer = KafkaConsumer(bootstrap_servers=['kafka'])
consumer.subscribe(pattern='^processor:*')
for message in consumer:
    # message value and key are raw bytes -- decode if necessary!
    # e.g., for unicode: `message.value.decode('utf-8')`
    decoded_message = loads(message.value.decode())
    print(decoded_message)
