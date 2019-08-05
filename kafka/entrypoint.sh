#! /bin/bash

echo "Starting zookeeper..."
bin/zookeeper-server-start.sh config/zookeeper.properties &

echo "Starting kafka server..."
bin/kafka-server-start.sh config/server.properties
