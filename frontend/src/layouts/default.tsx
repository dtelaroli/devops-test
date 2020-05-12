import { Container, CssBaseline } from "@material-ui/core";
import React from "react";
import { DialogDisplay } from "../components";

export const DefaultLayout = ({ children }: any) => {
  return (
    <Container component="main" maxWidth="xs">
      <DialogDisplay />
      <CssBaseline />
      <div>{children}</div>
    </Container>
  );
};
