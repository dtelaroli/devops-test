const { gql } = require("apollo-server");

const typeDefs = gql`
  scalar JSON

  type Log {
    id: ID
    body: String
  }

  type Message {
    id: ID
    to: String
    subject: String
    content: String
    logs: JSON
  }

  type Query {
    listMessages: [Message]
    getMessage(id: ID!): Message
  }

  input CreateMessageInput {
    id: ID
    to: String!
    subject: String!
    content: String!
    logs: JSON
  }

  input UpdateMessageInput {
    id: ID!
    to: String
    subject: String
    content: String
    logs: JSON
  }

  type Mutation {
    createMessage(input: CreateMessageInput!): Message
    updateMessage(input: UpdateMessageInput!): Message
  }
`;

module.exports = {
  typeDefs
};
