# Documentation

1. [Home](../README.md)
2. [Architecture](architecture.md)
3. [Pipelines](pipelines.md)
4. [Using](using.md)
5. [Screens](screens.md)
6. GraphQL API
7. [Observability and Monitoring](monitoring.md)
8. [Roadmap](roadmap.md)

# GraphQL Queries, Mutations and Subscriptions

Backend: https://api.vixcommerce.com.br

```
query ListOrders {
  listOrders {
    items {
      id
      value
      status
      createdAt
      updatedAt
      updateLogs
    }
    nextToken
    total
  }
}

query GetOrder($id: ID!) {
  getOrder(id: $id) {
    id
    value
    status
    createdAt
    updatedAt
    updateLogs
  }
}

mutation CreateOrder($input: CreateOrderInput!) {
  createOrder(input: $input) {
    id
    value
    status
    createdAt
    updatedAt
    updateLogs
  }
}

mutation UpdateOrder($input: UpdateOrderInput!) {
  updateOrder(input: $input) {
    id
    value
    status
    createdAt
    updatedAt
    updateLogs
  }
}

mutation PayOrder($input: PayOrderInput!) {
  payOrder(input: $input)
}

subscription OnCreateOrder {
  onCreateOrder {
    id
    value
    status
    createdAt
    updatedAt
    updateLogs
  }
}

subscription OnUpdateOrder {
  onUpdateOrder {
    id
    value
    status
    createdAt
    updatedAt
    updateLogs
  }
}
```

[Next page](monitoring.md)
