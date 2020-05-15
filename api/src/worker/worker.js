const { Consumer } = require("sqs-consumer");
const { config } = require("../lib");
const { ordersController } = require("../resolvers");

const app = Consumer.create({
  queueUrl: config.SQS_NOTIFY_ORDER_URL,
  visibilityTimeout: config.SQS_NOTIFY_ORDER_VISIBILITY_TIMEOUT,
  region: config.REGION,
  batchSize: 10,
  handleMessage: async message => {
    console.log(message)
    const input = JSON.parse(message.Body);
    await ordersController.mutations.updateOrder({}, input);
  }
});

app.on("error", e => {
  console.error("error", e);
});

app.on("processing_error", e => {
  console.error(e);
});

module.exports = app;
