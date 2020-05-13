const { config, stepFunctions } = require("../lib");

const sell = async (event) => {
  const results = Promise.all(
    event.Records.map((record) => {
      const body = JSON.parse(record.body);
      const params = {
        name: body.id,
        stateMachineArn: config.STATE_MACHINE_ARN,
        input: JSON.stringify(body),
      };

      return stepFunctions.startExecution(params).promise();
    })
  );

  return results;
};

module.exports = sell;
