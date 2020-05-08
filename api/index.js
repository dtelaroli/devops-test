const api = require("./src");

// The `listen` method launches a web server.
api.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
