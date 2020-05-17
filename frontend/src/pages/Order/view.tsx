import { List, ListItemText, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@material-ui/core";
import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { Notification, parseDate, parseMoney } from "../../components";
import { Order } from "../../services/models/order";
import { Confirm } from "./confirm";
import { useStyles } from "./styles";

interface OrderParam {
  order: Order;
  status: any[];
  message: any;
  setMessage: any;
  isCart: boolean;
}

export const OrderView = ({ order, status, setMessage, message, isCart }: OrderParam) => {
  const classes = useStyles();

  return (
    <Fragment>
      <Notification {...{ setMessage, message }} />
      {isCart ? <Confirm /> : null}
      <List>
        <ListItemText primary="Número do seu pedido" secondary={order.id} />
        <ListItemText primary="Total amount" secondary={parseMoney(order.value)} />
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

      <Link to="/">
        Back to list
      </Link>
    </Fragment>
  );
};
