const server = require("./src");

// The `listen` method launches a web server.
server.listen({ port: 4000 }, () => {
  console.log(`🚀  Server ready`);
});
