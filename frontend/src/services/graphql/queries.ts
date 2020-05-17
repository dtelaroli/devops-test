import gql from "graphql-tag";

export const listOrders = gql`
  query ListOrders($nextToken: ID) {
    listOrders(nextToken: $nextToken) {
      items {
        id
        value
        status
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;

export const getOrder = gql`
  query GetOrder($id: ID!) {
    getOrder(id: $id) {
      id
      value
      status
      createdAt
      updatedAt
      updateLogs
    }
  }
`;
