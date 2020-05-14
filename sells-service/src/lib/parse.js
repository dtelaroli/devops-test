const stringify = (obj) => {
  return JSON.stringify(obj, null, 2);
};

const toMap = async (list, callback) => {
  const results = await Promise.all(
    list.map((item) => {
      return callback(item);
    })
  );

  const errors = results.filter(([error, result]) => error);

  if (errors.length > 0) {
    throw new Error(stringify(errors));
  }
  return results;
}

module.exports = {
  parse: JSON.parse,
  stringify,
  toMap
};
