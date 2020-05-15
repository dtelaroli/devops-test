import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles(theme => ({
  title: {
    margin: theme.spacing(2, 0)
  },
  content: {
    margin: theme.spacing(2, 0),
    padding: theme.spacing(2)
  }
}));
