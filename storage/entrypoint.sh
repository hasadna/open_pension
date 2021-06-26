#! /bin/bash

# Check if DB exists.DB
echo "Waiting for DB connection"
while ! echo exit | nc -vz storage_db 3306;
do
    echo "DB still off-line....";
    sleep 10;
done
echo "DB is online"

if [[ -n $DEBUG ]]
then
  echo "Running in local development mode"
  curl -fsSL https://deb.nodesource.com/setup_16.x | bash
  apt-get install -y nodejs
  npm i -g nodemon

  nodemon --exec go run kafkaListener.go --signal SIGTERM &
  nodemon --exec go run storage.go --signal SIGTERM
else
  echo "Running in production mode"
  go build ./storage.go
  go build ./kafkaListener.go

  chmod +x /home/app/storage
  chmod +x /home/app/kafkaListener

  supervisord -c /etc/supervisor.conf
fi
