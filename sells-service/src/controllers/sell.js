const { config, stepFunctionsStart, stringify, parse } = require("../lib");

const sell = async (event) => {
  const results = Promise.all(
    event.Records.map((record) => {
      const body = parse(record.body);
      const params = {
        name: body.id,
        stateMachineArn: config.STATE_MACHINE_ARN,
        input: stringify(body),
      };

      return stepFunctionsStart(params);
    })
  );

  return results;
};

module.exports = sell;
