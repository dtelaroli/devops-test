import gql from "graphql-tag";

export const createOrder = gql`
  mutation CreateOrder($input: CreateOrderInput!) {
    createOrder(input: $input) {
      id
      value
      status
      createdAt
      updatedAt
      updateLogs
    }
  }
`;

export const updateOrder = gql`
  mutation UpdateOrder($input: UpdateOrderInput!) {
    updateOrder(input: $input) {
      id
      value
      status
      createdAt
      updatedAt
      updateLogs
    }
  }
`;

export const payOrder = gql`
  mutation PayOrder($input: PayOrderInput!) {
    payOrder(input: $input)
  }
`;
