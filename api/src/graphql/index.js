const resolvers = require("./resolvers");
const schema = require("./schema");

module.exports = {
  ...resolvers,
  ...schema
};
