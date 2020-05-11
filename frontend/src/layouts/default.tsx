import { Container, CssBaseline } from "@material-ui/core";
import React from "react";

export const DefaultLayout = ({ children }: any) => {
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div>{children}</div>
    </Container>
  );
};
