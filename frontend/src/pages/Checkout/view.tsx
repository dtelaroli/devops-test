import { Button, List, ListItemText } from "@material-ui/core";
import React, { Fragment } from "react";

export const CheckoutView = ({ buy }: any) => {
  const productDetails = [
    {
      primary: "Product",
      secondary: "Awesome Product",
    },
    {
      primary: "Quantity",
      secondary: "2",
    },
    {
      primary: "Unit Price",
      secondary: "R$ 1.000,00",
    },
    {
      primary: "Total Price",
      secondary: "R$ 2.000,00",
    },
  ];
  return (
    <Fragment>
      <List>
        {productDetails.map((p: any) => {
          return <ListItemText {...p} key={p.primary} />;
        })}
      </List>
      <Button variant="contained" color="primary" onClick={buy}>
        Buy
      </Button>
    </Fragment>
  );
};
