# Client

## Intro
Progressive web app.

## Stack
A work in progress still but the general idea is:

NodeJs, [React](https://github.com/facebook/react), [MobX](https://mobx.js.org/getting-started.html), 

Boilerplate is [Create React App](https://github.com/facebook/create-react-app)

*TODO:install MobX with CRA [link](https://swizec.com/blog/mobx-with-create-react-app/swizec/7158)

*TODO:dockerize [link](https://mherman.org/blog/dockerizing-a-react-app/)

## Quick ref

* `yarn start` [http://localhost:3000](http://localhost:3000)
* `yarn test`
* `yarn build`
* `npm run lint`

## Docker
	`sudo docker build -t client:dev .`
	`sudo docker run -v ${PWD}:/app -v /app/node_modules -p 3001:3000 --rm client:dev` [http://localhost:3001](http://localhost:3001)
TODO: maybe use docker compose / add docker-compose.yml?

	`

## vesrions used for dev env
	docker 18.06.1-ce
	node 12.10.0
	npm 6.10.3
	yarn 1.19.1
    eslint 6.6.0
    react 16.11.0
    react-dom 16.11.0
    react-scripts 3.2.0

