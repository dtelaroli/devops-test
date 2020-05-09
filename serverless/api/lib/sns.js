const AWS = require("./aws");
const config = require("./config");

const sns = new AWS.SNS({ region: config.REGION });

const publish = async (TopicArn, Message) => {
  const params = {
    Message: JSON.stringify(Message),
    MessageStructure: "json",
    TopicArn
  };

  try {
    const result = await sns.publish(params).promise();
    return [null, result];
  } catch (e) {
    return [e, null];
  }
};

module.exports = publish;
