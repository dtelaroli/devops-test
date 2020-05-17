import { Typography } from "@material-ui/core";
import React, { Fragment } from "react";
import { Wizard } from "../../components";

export const Confirm = () => {
  return (
    <Fragment>
      <Wizard activeStep={2} />
      <Typography>Thank you for shop with us.</Typography>
      <Typography>Keep calm and wait herem, we are processing you payment and shippment.</Typography>
    </Fragment>
  );
};
