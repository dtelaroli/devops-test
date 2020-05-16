import gql from "graphql-tag";

export const onCreateOrder = gql`
  subscription OnCreateOrder {
    onCreateOrder {
      id
      value
      status
      createdAt
      updatedAt
      updateLogs
    }
  }
`;

export const onUpdateOrder = gql`
  subscription OnUpdateOrder {
    onUpdateOrder {
      id
      value
      status
      createdAt
      updatedAt
      updateLogs
    }
  }
`;
