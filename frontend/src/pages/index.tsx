import React from "react";
import { Checkout } from "./Checkout";
import { Payment } from "./Payment";
import { Order } from "./Order";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { DefaultLayout } from "../layouts/default";

export const MainRouter = () => {
  return (
    <Router>
      <DefaultLayout>
        <Switch>
          <Route exact path="/">
            <Checkout />
          </Route>
          <Route path="/payment/:id">
            <Payment />
          </Route>
          <Route path="/order/:id">
            <Order />
          </Route>
        </Switch>
      </DefaultLayout>
    </Router>
  );
};
