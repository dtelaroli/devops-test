const { stepFunctionsStart, parse } = require("../lib");

const sell = async (records) => {
  const results = Promise.all(
    records.map((record) => {
      const { id } = parse(record.body);
      return stepFunctionsStart({ name: id, input: record.body });
    })
  );

  return results;
};

module.exports = {
  sell,
};
