import React, { Fragment } from "react";
import { Button } from "@material-ui/core";

export const PaymentView = ({ pay }: any) => {
  return (
    <Fragment>
      <Button variant="contained" color="primary" onClick={pay}>
        Pay Order
      </Button>
    </Fragment>
  );
};
