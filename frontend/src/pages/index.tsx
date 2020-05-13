import React from "react";
import { Checkout } from "./Checkout";
import { Payment } from "./Payment";
import { Order } from "./Order";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

export const MainRouter = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Checkout />
        </Route>
        <Route path="/payment/:id">
          <Payment />
        </Route>
        <Route path="/order">
          <Order />
        </Route>
      </Switch>
    </Router>
  );
};
