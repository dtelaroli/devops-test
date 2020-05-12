import { Backdrop, CircularProgress } from "@material-ui/core";
import React from "react";
import { useStyles } from "./styles";

interface LoadingViewProps {
  loading: boolean;
  handleClick?(event: any): void;
}

export const LoadingView = ({ loading = false, handleClick }: LoadingViewProps) => {
  const classes = useStyles();

  const _handleClick = handleClick ? handleClick : (e: any) => {};

  return (
    <Backdrop className={classes.backdrop} open={loading} onClick={_handleClick}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};
