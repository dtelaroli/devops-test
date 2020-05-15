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
import { Order } from "../../services/models/order";

interface OrderParam {
  order: Order;
  status: any[]
}

export const OrderView = ({ order, status }: OrderParam) => {
  const parseDate = (date: string) => {
    return new Date(date).toLocaleString("pt-BR");
  };

  return (
    <Fragment>
      <Typography>Thank you for shop with us.</Typography>
      <Typography>Keep calm and wait herem, we are processing you order.</Typography>

      <List>
        <ListItemText primary="Order number" secondary={order.id} />
      </List>

      <TableContainer component={Paper}>
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
              <TableRow key={row.name}>
                <TableCell>{row.status}</TableCell>
                <TableCell>{parseDate(row.date || row.updatedAt)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Fragment>
  );
};
