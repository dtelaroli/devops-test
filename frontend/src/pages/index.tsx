import React from "react";
import { Checkout } from "./Checkout";
import { Payment } from "./Payment";
import { Order } from "./Order";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { DefaultLayout } from "../layouts/default";
import { Orders } from "./Orders";

export const MainRouter = () => {
  return (
    <Router>
      <DefaultLayout>
        <Switch>
          <Route exact path="/">
            <Orders />
          </Route>
          <Route path="/order/:id">
            <Order />
          </Route>
          <Route exact path="/checkout">
            <Checkout />
          </Route>
          <Route path="/checkout/payment">
            <Payment />
          </Route>
          <Route path="/checkout/order">
            <Order />
          </Route>
        </Switch>
      </DefaultLayout>
    </Router>
  );
};
