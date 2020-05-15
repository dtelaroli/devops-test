import { Container, CssBaseline, Paper, Typography } from "@material-ui/core";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { DialogDisplay } from "../components";
import { Wizard } from "../components/Wizard";
import { useStyles } from "./styles";


export const DefaultLayout = ({ children }: any) => {
  const classes = useStyles();
  const steps = ["Product detail", "Payment", "Progress"];
  const urls: any = {
    "/": 0,
    "/payment": 1,
    "/order": 2,
  };

  const getActual = ({ pathname }: any) => {
    // eslint-disable-next-line
    const actual: string = pathname.replace(/(^(\/[^\/]+)).*/, "$1");
    return urls[actual];
  };
  const history = useHistory();
  const [activeStep, setActive] = useState(getActual(history.location));

  history.listen((location: any) => {
    setActive(getActual(location));
  });

  return (
    <Container component="main" maxWidth="md">
      <DialogDisplay />
      <CssBaseline />
      <Typography component="h1" variant="h5" className={classes.title}>
        Awesome Checkout
      </Typography>
      
      <Wizard activeStep={activeStep} steps={steps} />
      
      <Paper variant="outlined" className={classes.content}>
        {children}
      </Paper>
    </Container>
  );
};
