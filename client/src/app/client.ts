import ApolloClient, {createBatchingNetworkInterface} from 'apollo-client';
import { Client } from 'subscriptions-transport-ws';

import { addGraphQLSubscriptions } from './subscriptions';

// Polyfill fetch
import 'whatwg-fetch';

interface Result {
  id?: string;
  __typename?: string;
}

const wsClient: Client = new Client('ws://localhost:8080');

const networkInterface: any = createBatchingNetworkInterface({
  uri: '/graphql',
  batchInterval: 10,
  opts: {
    credentials: 'same-origin',
  }
});

const networkInterfaceWithSubscriptions: any = addGraphQLSubscriptions(
  networkInterface,
  wsClient,
);

const client: ApolloClient = new ApolloClient({
  networkInterface: networkInterfaceWithSubscriptions,
  dataIdFromObject: (result: Result) => {
    if (result.id && result.__typename) {
      return result.__typename + result.id;
    }
    return null;
  }
});

export {
  client
}
