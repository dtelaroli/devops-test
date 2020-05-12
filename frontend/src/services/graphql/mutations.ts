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

// query list {
//   listOrders {
//     items {
//       id
//       value
//       status
//       createdAt
//       updatedAt
//       updateLogs
//     }
//     nextToken
//     total
//   }
// }

// query get {
//   getOrder(id: "a60a15b8-52d5-47c5-bd52-07386cf4ab04") {
//     id
//     value
//     status
//     createdAt
//     updatedAt
//     updateLogs
//   }
// }

// # Write your query or mutation here
// subscription sub {
//   onUpdateOrder {
//     id
//     value
//     status
//     createdAt
//     updatedAt
//   }
// }
