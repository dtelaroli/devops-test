const { ApolloServer } = require("apollo-server-express");
const { typeDefs, resolvers, context } = require("./graphql");
const express = require("express");
const bodyParser = require("body-parser");

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  cors: true,
  typeDefs,
  resolvers,
  context,
  trace: false
});

const app = express();
// Additional middleware can be mounted at this point to run before Apollo.
app.use(bodyParser.text());

server.applyMiddleware({ app, path: "/" });

module.exports = app;
