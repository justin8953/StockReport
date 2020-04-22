import React, { useState, useEffect } from "react";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import { StyledTableCell } from "../common/general_class";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Link from "@material-ui/core/Link";

import moment from "moment";

import ProtoTypes from "prop-types";
import { trackingHeader } from "../common/tableHeader";
const StockList = props => {
  const { stock_list } = props;
  console.log(stock_list);
  useEffect(() => {}, [stock_list]);
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {trackingHeader.map(col => (
              <StyledTableCell key={col.fieldName}>
                {col.headerName}
              </StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {stock_list.map(row => (
            <TableRow key={row.stock_id}>
              {trackingHeader.map(col => (
                <TableCell
                  key={`${col.fieldName}_value`}
                  component="th"
                  scope="row"
                >
                  {col.type === "date" ? (
                    moment(new Date(row[col.fieldName])).format("YYYY-MM-D")
                  ) : col.fieldName === "stock_id" ? (
                    <Link href={`/stock/${row[col.fieldName]}`}>
                      {row[col.fieldName]}
                    </Link>
                  ) : (
                    row[col.fieldName]
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default StockList;

StockList.protoTypes = {
  stock_list: ProtoTypes.array.isRequired
};
