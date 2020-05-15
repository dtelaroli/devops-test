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

export const OrderView = ({ id, rows }: any) => {
  const parseDate = (date: string) => {
    return new Date(date).toLocaleString("pt-BR");
  };

  return (
    <Fragment>
      <Typography>Thank you for shop with us.</Typography>
      <Typography>Keep calm and wait herem, we are processing you order.</Typography>

      <List>
        <ListItemText primary="Order number" secondary={id} />
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
            {rows.map((row: any) => (
              <TableRow key={row.name}>
                <TableCell>{row.status}</TableCell>
                <TableCell>{parseDate(row.date)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Fragment>
  );
};
