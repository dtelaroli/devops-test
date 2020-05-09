const { ApolloServer } = require("apollo-server");
const { typeDefs, resolvers, context } = require("./graphql");

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ typeDefs, resolvers, context });

module.exports = server;
