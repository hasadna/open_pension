import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: process.env.API_ADDRESS,
  cache: new InMemoryCache(),
});

console.log(process.env.API_ADDRESS);

export default client;
