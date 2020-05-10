const { PubSub } = require("apollo-server");

const pubsub = new PubSub();

const eventNames = {
  ON_CREATE_MESSAGE: "ON_CREATE_MESSAGE",
  ON_UPDATE_MESSAGE: "ON_UPDATE_MESSAGE"
};

module.exports = { eventNames, pubsub };
