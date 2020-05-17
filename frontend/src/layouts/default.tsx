import { Container, CssBaseline, Paper, Typography } from "@material-ui/core";
import React from "react";
import { DialogDisplay } from "../components";
import { useStyles } from "./styles";

export const DefaultLayout = ({ children }: any) => {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="md">
      <DialogDisplay />
      <CssBaseline />
      <Typography component="h1" variant="h5" className={classes.title}>
        Awesome E-Commerce
      </Typography>
      
      <Paper variant="outlined" className={classes.content}>
        {children}
      </Paper>
    </Container>
  );
};
