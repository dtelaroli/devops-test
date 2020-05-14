const { stepFunctionsStart, parse, toMap } = require("../lib");

const sell = async (records) => {
  return toMap(records, (record) => {
    const { input } = parse(record.body);
    return stepFunctionsStart({ name: input.id, input: record.body });
  });
};

module.exports = {
  sell,
};
