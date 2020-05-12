import { Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import React, { Fragment } from "react";
import { Loading } from "../Loading";
import { useStyles } from "./styles";

type DialogViewProps = {
  error: boolean | string;
  success: boolean | string;
  setSuccess: Function;
  setError: Function;
};

const SnackbarCustom = ({ open, handleClose, autoHideDuration, children }: any) => {
  const classes = useStyles();

  return (
    <Snackbar
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      className={classes.snack}
    >
      {children}
    </Snackbar>
  );
};

export const DialogView = ({ setSuccess, setError, success, error }: DialogViewProps) => {
  const handleClose = () => {
    setSuccess(false);
    setError(false);
  };

  const parseMessage = (message: any) => {
    switch (typeof message) {
      case "object":
        if (message.graphQLErrors) {
          message = message.graphQLErrors.map((error: any) => ({
            path: error.path,
            message: error.message.substr(0, 140)
          }));
        }
        return JSON.stringify(message, null, 2);
      default:
        return message;
    }
  };

  return (
    <Fragment>
      <Loading />
      <SnackbarCustom open={!!success} handleClose={handleClose} autoHideDuration={5000}>
        <Alert onClose={handleClose} severity="success">
          {parseMessage(success)}
        </Alert>
      </SnackbarCustom>
      <SnackbarCustom open={!!error} handleClose={handleClose} autoHideDuration={12000}>
        <Alert onClose={handleClose} severity="error">
          {parseMessage(error)}
        </Alert>
      </SnackbarCustom>
    </Fragment>
  );
};
