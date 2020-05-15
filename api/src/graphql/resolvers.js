const GraphQLJSON = require("graphql-type-json");
const { GraphQLDateTime } = require("graphql-iso-date");

const { ordersController } = require("../resolvers");

const resolvers = {
  JSON: GraphQLJSON,
  DateTime: GraphQLDateTime,
  Query: {
    ...ordersController.queries
  },
  Mutation: {
    ...ordersController.mutations
  },
  Subscription: {
    ...ordersController.subscriptions
  }
};

module.exports = resolvers;
