import {
  List,
  ListItemText,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";
import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { Order } from "../../services/models/order";
import { useStyles } from "./styles";
import { Notification } from "../../components/Notification";

interface OrderParam {
  order: Order;
  status: any[];
  message: any;
  setMessage: any;
}

export const OrderView = ({ order, status, setMessage, message }: OrderParam) => {
  const classes = useStyles();
  const parseDate = (date: string) => {
    return new Date(date).toLocaleString("pt-BR");
  };

  return (
    <Fragment>
      <Notification {...{ setMessage, message }} />
      <Typography>Thank you for shop with us.</Typography>
      <Typography>Keep calm and wait herem, we are processing you payment and shippment.</Typography>

      <List>
        <ListItemText primary="Order number" secondary={order.id} />
      </List>

      <TableContainer component={Paper} className={classes.content}>
        <Table aria-label="order history">
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>Status</strong>
              </TableCell>
              <TableCell>
                <strong>Last update</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {status.map((row: any) => (
              <TableRow key={row.updatedAt}>
                <TableCell>{row.status}</TableCell>
                <TableCell>{parseDate(row.updatedAt)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Link color="primary" to="/">
        Back to product
      </Link>
    </Fragment>
  );
};
