const { sell } = require("../controllers");
const { handler } = require("../lib");

exports.handler = async (event, context) => {
  return await handler(event, context, sell);
};
