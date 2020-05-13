import React, { Fragment } from "react";
import { Button, Typography, List, ListItem, ListItemText } from "@material-ui/core";

export const PaymentView = ({ id, pay }: any) => {
  return (
    <Fragment>
      <List>
        <ListItemText primary="Número do seu pedido" secondary={id}/>
      </List>
      <Button variant="contained" color="primary" onClick={pay}>
        Pay Order
      </Button>
    </Fragment>
  );
};
