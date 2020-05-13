const axios = require("axios");
const { to } = require("await-to-js");
const JSON_HEADER = "application/json";

const http = axios.create({ timeout: 60000, headers: { "Content-Type": JSON_HEADER } });

const get = (url, params) => {
  return to(http.get(url, params));
};

const post = (url, body) => {
  return to(http.post(url, body));
};

module.exports = { get, post };
