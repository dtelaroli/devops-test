const { gql } = require("apollo-server");

const typeDefs = gql`
  scalar JSON
  scalar DateTime

  type StatusLog {
    id: ID
    body: String
  }

  enum Status {
    NEW
    PAID
    SHIPPING
    FINISHED
  }

  type Order {
    id: ID
    productId: String!
    value: Float!
    status: Status!
    createdAt: DateTime
    updatedAt: DateTime
  }

  type Query {
    listOrders: [Order]
    getOrder(id: ID!): Order
  }

  input CreateOrderInput {
    id: ID
    productId: String!
    value: Float!
  }

  input UpdateOrderInput {
    id: ID!
    productId: String
    value: Float
    status: Status
  }

  type Mutation {
    createOrder(input: CreateOrderInput!): Order
    updateOrder(input: UpdateOrderInput!): Order
  }

  type Subscription {
    onCreateOrder: Order
    onUpdateOrder: Order
  }
`;

module.exports = typeDefs;
