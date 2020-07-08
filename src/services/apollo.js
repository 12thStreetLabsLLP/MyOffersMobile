import { WebSocketLink } from "apollo-link-ws";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";

const makeApolloClient = (token) => {
  // create an apollo link instance, a network interface for apollo client
  const link = new WebSocketLink({
    uri: `http://139.59.71.93/v1/graphql`,
    options: {
      reconnect: true,
      connectionParams: {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInJvbGUiOiJhZG1pbiIsImh0dHBzOi8vaGFzdXJhLmlvL2p3dC9jbGFpbXMiOnsieC1oYXN1cmEtYWxsb3dlZC1yb2xlcyI6WyJhZG1pbiJdLCJ4LWhhc3VyYS1kZWZhdWx0LXJvbGUiOiJhZG1pbiIsIngtaGFzdXJhLXVzZXItaWQiOiIxIiwieC1oYXN1cmEtb3JnLWlkIjoiMTIzIiwieC1oYXN1cmEtY3VzdG9tIjoiY3VzdG9tLXZhbHVlIn0sImlhdCI6MTU5Mzk2ODA4N30.Wyl0khmTXhhEJM-Qvlq6FLFSLBbYLAS1Telp_bzS1ZA`,
        },
      },
    },
  });

  // create an inmemory cache instance for caching graphql data
  const cache = new InMemoryCache();

  // instantiate apollo client with apollo link instance and cache instance
  const client = new ApolloClient({
    link,
    cache,
  });

  return client;
};

export default makeApolloClient;
