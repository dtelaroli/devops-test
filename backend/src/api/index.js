const api = require("./api");

// The `listen` method launches a web server.
api.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`🚀 Server ready ${url} ${subscriptionsUrl}`);
});
