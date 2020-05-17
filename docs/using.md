# Documentation

1. [Home](../README.md)
1. [Arquitecture](architecture.md)
1. Using
1. [Screens](screens.md)
1. [GraphQL API](graphql.md)
1. [Observability and Monitoring](monitoring.md)
1. [Roadmap](roadmap.md)

# Running Local

## Authentication

```
# Using aws-vault cli
$aws-vault exec <profile-name> -s -d 12h

# Using aws-cli
$ aws configure
# Select options
```

## Backend

Services:

- GraphQL API and Playground: http://localhost:4000
- WebSocket Service: ws://localhost:4000/graphql
- SQS Background Worker

### GraphQL API

```
# Installation
$ brew install yarn

# Requires Authentication and Redis

$ cd api
$ source .env
$ yarn
$ yarn start
```

### Sells Service

Endpoint: http://localhost:3000/v1

```
# Installation
$ brew tap aws/tap
$ brew install aws-sam-cli

# Requires Authentication

$ cd sells-service
$ am local start-api
```

### Redis

```
# Installation
$ brew install redis

# Initialization
$ redis-server
```

## Frontend

Endpoint: http://localhost:5000

```
$ cd frontend
$ source .env
$ yarn
$ yarn start
```

## Running at Cloud

Frontend: https://www.vixcommerce.com.br

The checkout have been built with asyncronous architecture, therefore two actions to execute out of the app.

1. Payment: It's posted to the mock gateway url and the app wait a postback to notify the customer and proceed to shipment
1. Shipment: It's posted to the mock courier url and the app wait a postback to notify the customer that the product were received
1. The workflow it's managed by AWS Step Functions, explained above
1. All data it's load from websocket, you don't need refrash the page

### The URLs:

#### Payment:

- Gateway: https://denilson.free.beeceptor.com/v1/payment
- Postback: https://sells-service.vixcommerce.com.br/v1/shipment/confirmation

#### Shipment

- Gateway: https://denilson.free.beeceptor.com/v1/shipment
- Postback: https://sells-service.vixcommerce.com.br/v1/shipment/confirmation

[Next page](screens.md)
