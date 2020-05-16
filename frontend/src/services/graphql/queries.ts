import gql from "graphql-tag";

export const listOrder = gql`
  query ListOrder {
    listOrders {
      items {
        id
        value
        status
        createdAt
        updatedAt
        updateLogs
      }
      nextToken
      total
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
