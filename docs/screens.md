# Documentation

1. [Home](../README.md)
1. [Architecture](architecture.md)
2. [Pipelines](pipelines.md)
3. [Using](using.md)
4. Screens
5. [GraphQL API](graphql.md)
6. [Observability and Monitoring](monitoring.md)
7. [Roadmap](roadmap.md)

## Screens and Sale Workflow

Before show the screens, it's time to present AWS Step Function, with it you can manage workflows without manage the state transitions. See more on AWS docs.

## Orders

https://www.vixcommerce.com.br

<img src="images/orders-page.png" width="600" alt="orders page" />

### Checkout page

https://www.vixcommerce.com.br/checkout

<img src="images/product-page.png" width="400" alt="product page" />

### Payment page

https://www.vixcommerce.com.br/checkout/payment

<img src="images/payment-page.png" width="400" alt="payment page" />

### Order page

https://www.vixcommerce.com.br/checkout/order

<img src="images/order-page.png" width="400" alt="order page" />

### Beeceptor gateway post page and ReqBin postback

After order confirmation, the platform start a Step Function execution. The first step it's send the payment request to Gateway API (mocked by Beeceptor).

https://beeceptor.com/console/denilson

<p>
  <img src="images/step-start.svg" width="400" alt="step start" />
  <img src="images/payment-gateway.png" width="400" alt="beeceptor gateway post page" />
</p>

To confirm payment, set payload field status equals PAID or REJECTED to approve or cancel the order. Sending the request with ReqBin, the app wil be notified and show the payment confirmation.

https://reqbin.com
https://www.vixcommerce.com.br/order/:id

<p>
  <img src="images/reqbin-postback.png" width="400" alt="reqbin postback page" />
  <img src="images/payment-confirmation.png" width="400" alt="payment confirm" />
</p>
<hr />

### Rejected payment page

The payment can be rejected by timeout, if it does not receive the postback in 240 seconds or when gateway returns status REJECTED or CANCELED.

https://www.vixcommerce.com.br/order/:id

<p>
  <img src="images/reject-page.png" width="400" alt="rejected page" />
  <img src="images/step-rejected.svg" width="400" alt="rejected step" />
</p>
<img src="images/step-rejected-timeout.svg" width="400" alt="rejected step timeout" />
<hr />

### Shipment Postback

After payment confirmation, the Step Functions sent a shipment request (mocked in Beeceptor) and wait a postback shipping confirmation.

<p>
  <img src="images/shipment-courier.png" width="400" alt="shipment courier" />
  <img src="images/reqbin-shipment-confirm.png" width="400" alt="reqbin shipment confirm" />
</p>
<hr />

### Confirm payment page

https://www.vixcommerce.com.br/order/:id

<p>
  <img src="images/shipment-complete.png" width="400" alt="shipment complete" />
  <img src="images/step-complete.svg" width="400" alt="step complete" />
</p>
<hr />

### Logs and Errors

The Step Functions logs all inputs, outputs and exceptions.

<p>
  <img src="images/step-inputs.png" width="400" alt="step inputs" />
  <img src="images/step-fail.svg" width="400" alt="step fail" />
</p>
<hr />

[Next page](graphql.md)

