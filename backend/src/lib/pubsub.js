const { RedisPubSub } = require("graphql-redis-subscriptions");
const Redis = require("ioredis");
const config = require("./config");

const options = {
  host: config.REDIS_DOMAIN_NAME,
  port: config.REDIS_PORT_NUMBER,
  retryStrategy: times => {
    // reconnect after
    return Math.min(times * 50, 2000);
  }
};

const pubsub = new RedisPubSub({
  publisher: new Redis(options),
  subscriber: new Redis(options)
});

module.exports = pubsub;
