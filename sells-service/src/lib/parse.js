const stringify = (obj) => {
  return JSON.stringify(obj, null, 2);
};

module.exports = {
  parse: JSON.parse,
  stringify,
};
