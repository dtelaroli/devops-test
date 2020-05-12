import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles(theme => ({
  snack: {
    top: 70,
    [theme.breakpoints.up("sm")]: {
      top: 80
    }
  }
}));
