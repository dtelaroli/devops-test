const server = require("./src");

// The `listen` method launches a web server.
server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`🚀 Server ready ${url} ${subscriptionsUrl}`);
});
