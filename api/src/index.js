const { ApolloServer } = require("apollo-server");
const { typeDefs, resolvers } = require("./graphql");

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  cors: true,
  typeDefs,
  resolvers
});

module.exports = server;
