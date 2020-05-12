import { DocumentNode } from "graphql";
import { apolloClient, gql } from "../../components";

export const subscription = (document: DocumentNode, variables: object) => {
  return apolloClient.subscribe({ query: document, variables });
};
