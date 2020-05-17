import {
  Button,
  ButtonGroup,
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
import { Link, useHistory } from "react-router-dom";
import { Notification, parseDate, parseMoney } from "../../components";
import { useStyles } from "./styles";

export const OrdersView = ({ orders, message, setMessage, nextToken, loadMore }: any) => {
  const classes = useStyles();
  const history = useHistory();

  const buy = () => {
    history.push("/checkout");
  };

  return (
    <Fragment>
      <Notification {...{ setMessage, message }} />

      <Typography>My Orders</Typography>

      <TableContainer component={Paper} className={classes.content}>
        <Table aria-label="order history">
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>Number</strong>
              </TableCell>
              <TableCell>
                <strong>Value</strong>
              </TableCell>
              <TableCell>
                <strong>Status</strong>
              </TableCell>
              <TableCell>
                <strong>Date</strong>
              </TableCell>
              <TableCell>
                <strong>Last update</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((row: any) => (
              <TableRow key={row.id}>
                <TableCell>
                  <Link to={`/order/${row.id}`} className={classes.link}>{row.id}</Link>
                </TableCell>
                <TableCell>{parseMoney(row.value)}</TableCell>
                <TableCell>{row.status}</TableCell>
                <TableCell>{parseDate(row.createdAt)}</TableCell>
                <TableCell>{parseDate(row.updatedAt)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <ButtonGroup>
        <Button onClick={loadMore} disabled={!nextToken}>
          Load More
        </Button>
        <Button onClick={buy}>New Order</Button>
      </ButtonGroup>
    </Fragment>
  );
};
