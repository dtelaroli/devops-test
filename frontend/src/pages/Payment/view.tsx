import { Button, Grid, List, ListItemText, TextField } from "@material-ui/core";
import React, { Fragment } from "react";
import { useStyles } from "./styles";
import { parseMoney } from "../../components";
import { PRICE } from "../Checkout/view";

export const PaymentView = ({ id, pay }: any) => {
  const classes = useStyles();

  const inputs = [
    {
      label: "Card Number",
      value: "5519 4301 4464 2164",
    },
    {
      label: "Card Holder",
      value: "Denilson Telaroli",
    },
    {
      label: "Expiration",
      value: "01/29",
    },
    {
      label: "CVV",
      value: "012",
    },
  ];

  return (
    <Fragment>
      <List>
        <ListItemText primary="Número do seu pedido" secondary={id} />
        <ListItemText primary="Total amount" secondary={parseMoney(PRICE * 2)} />
      </List>

      <Grid container spacing={4} className={classes.content}>
        {inputs.map((input: any) => {
          return (
            <Grid item xs={12} sm={4} md={3} key={input.label}>
              <TextField {...input} fullWidth />
            </Grid>
          );
        })}
      </Grid>

      <Button variant="contained" color="primary" onClick={pay}>
        Pay Order
      </Button>
    </Fragment>
  );
};
