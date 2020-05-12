import ApolloClient from "apollo-client";import { InMemoryCache } from "apollo-cache-inmemory";

import { link } from "./link";
export const cache = new InMemoryCache();

export const apolloClient = new ApolloClient({
  link,
  cache
});
