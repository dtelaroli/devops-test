const GraphQLJSON = require("graphql-type-json");
const uuid = require("uuid/v4");

const messages = [];

const findMessage = id => {
  return messages.filter(m => m.id === id)[0];
};

const createMessage = (root, { input }, context) => {
  if (!input.id) {
    input.id = uuid();
  }

  messages.push(input);

  return findMessage(input.id);
};

const updateMessage = (root, { input }, context) => {
  const index = messages.findIndex(obj => obj.id === input.id);

  if (index < 0) {
    throw new Error("ID not found");
  }

  for (let i in input) {
    messages[index][i] = input[i];
  }

  return messages[index];
};

const resolvers = {
  JSON: GraphQLJSON,
  Query: {
    listMessages: () => messages,
    getMessage: (root, { id }, context) => {
      return findMessage(id);
    }
  },
  Mutation: {
    createMessage,
    updateMessage
  }
};

module.exports = {
  resolvers
};