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

# Documentation

[Home](../README.md)

[Arquitecture](architecture.md)

[Using](using.md)

[Screens](screens.md)

**GraphQL API**
