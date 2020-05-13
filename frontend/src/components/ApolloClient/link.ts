import { ApolloLink, split } from "apollo-link";
import { onError } from "apollo-link-error";
import { HttpLink } from "apollo-link-http";
import { WebSocketLink } from "apollo-link-ws";
import { getMainDefinition } from "apollo-utilities";

// const HOST = "denilson-alb-1886319303.us-east-1.elb.amazonaws.com";

const HOST = "localhost:4000";
// Create an http link:
const httpLink = new HttpLink({
  uri: `http://${HOST}`,
});

// Create a WebSocket link:
const wsLink = new WebSocketLink({
  uri: `ws://${HOST}/graphql`,
  options: {
    reconnect: true,
  },
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.map(({ message, locations, path }) =>
      console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`)
    );

  if (networkError) console.log(`[Network error]: ${networkError}`);
});

// using the ability to split links, you can send data to each link
// depending on what kind of operation is being sent
const splitLink = split(
  // split based on operation type
  ({ query }) => {
    const definition = getMainDefinition(query);
    return definition.kind === "OperationDefinition" && definition.operation === "subscription";
  },
  wsLink,
  httpLink
);

export const link = ApolloLink.from([errorLink, splitLink]);
