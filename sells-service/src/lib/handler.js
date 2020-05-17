const { to } = require("await-to-js");
const { stringify } = require("./parse");

const lambdaHandler = async (event, context, handler) => {
  console.log("Event: ", stringify(event));

  const [error, result] = await to(handler(event));

  if (error) {
    console.error("Error: ", stringify(error));
    return context.fail(error);
  }

  console.log("Results: ", stringify(result));
  return context.succeed(result);
};

module.exports = lambdaHandler;
