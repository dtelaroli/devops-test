const { to } = require("await-to-js");
const { stringify } = require("./parse");

const handler = async (event, context, handler) => {
  console.log("Event: ", stringify(event));

  const [error, results] = await to(handler(event));

  if (error) {
    console.log("Error: ", stringify(error));
    return context.fail(error);
  }

  console.log("Results: ", stringify(results));
  return context.succeed(results);
};

module.exports = handler;
