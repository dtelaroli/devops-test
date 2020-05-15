import gql from "graphql-tag";

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
