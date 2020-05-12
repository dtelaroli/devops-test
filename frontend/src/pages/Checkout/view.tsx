import { Button } from "@material-ui/core";
import React, { Fragment } from "react";

export const CheckoutView = ({ buy }: any) => {
  return (
    <Fragment>
      <Button variant="contained" color="primary" onClick={buy}>
        Buy Awesome Product
      </Button>
    </Fragment>
  );
};
