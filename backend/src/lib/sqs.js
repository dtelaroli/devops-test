const AWS = require("./aws");
const { to } = require("await-to-js");
const sqs = new AWS.SQS();

const send = async (QueueUrl, Message) => {
  const params = {
    MessageBody: JSON.stringify(Message),
    QueueUrl,
    MessageAttributes: {
      contentType: {
        DataType: "String",
        StringValue: "application/json"
      }
    }
  };

  return to(sqs.sendMessage(params).promise());
};

module.exports = send;
