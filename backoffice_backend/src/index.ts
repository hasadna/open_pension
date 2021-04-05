import { server } from './server/server';
import { getPort } from './utils/config';


// The `listen` method launches a web server.
server.listen({port: getPort()}).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});

