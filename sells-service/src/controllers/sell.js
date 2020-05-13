const { stepFunctionsStart, parse } = require("../lib");

const sell = async (event) => {
  const results = Promise.all(
    event.Records.map((record) => {
      const body = parse(record.body);
      return stepFunctionsStart(body);
    })
  );

  return results;
};

module.exports = sell;
