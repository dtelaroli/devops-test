import { Button, IconButton, Snackbar } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import React, { Fragment } from "react";

export const NotificationView = ({ message, handleClose }: any) => {
  return (
    <Snackbar
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={message !== ""}
      onClose={handleClose}
      autoHideDuration={6000}
      message={message}
      action={
        <Fragment>
          <Button color="secondary" size="small" onClick={handleClose}>
            OK
          </Button>
          <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
            <Close fontSize="small" />
          </IconButton>
        </Fragment>
      }
    />
  );
};
