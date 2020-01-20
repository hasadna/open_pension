#! /bin/bash

echo "Rendering Kafka Config..."
envsubst < server.properties.template > config/server.properties

echo "Starting kafka server..."
bin/kafka-server-start.sh config/server.properties
