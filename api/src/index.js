const { ApolloServer } = require("apollo-server-express");
const { typeDefs, resolvers, pubsub } = require("./graphql");
const express = require("express");
const bodyParser = require("body-parser");

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  cors: true,
  typeDefs,
  resolvers
});

const app = express();
// Additional middleware can be mounted at this point to run before Apollo.
app.use(bodyParser.json());
app.use(bodyParser.text());

app.use("/notify", (req, res, next) => {
  const body = JSON.parse(req.body);
  const { event, method } = body;
  console.log(body);
  pubsub.publish(event, method);
  res.redirect(body.SubscribeURL);
});

server.applyMiddleware({ app, path: "/graphql" });

module.exports = app;
