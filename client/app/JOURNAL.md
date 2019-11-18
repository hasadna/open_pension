
Dockerizing as per https://mherman.org/blog/dockerizing-a-react-app/

sudo docker build -t client:dev .


sudo docker run -v ${PWD}:/app -v /app/node_modules -p 3001:3000 --rm client:dev
