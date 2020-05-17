import { Button, Grid, List, ListItemText, TextField } from "@material-ui/core";
import React, { Fragment } from "react";
import { parseMoney, Wizard } from "../../components";
import { useStyles } from "./styles";

export const PaymentView = ({ order, pay }: any) => {
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
      <Wizard activeStep={1} />

      <List>
        <ListItemText primary="Número do seu pedido" secondary={order.id} />
        <ListItemText primary="Total amount" secondary={parseMoney(order.value)} />
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

      <Button variant="outlined" onClick={pay}>
        Pay Order
      </Button>
    </Fragment>
  );
};
