import React, { useEffect } from "react";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import { StyledTableCell } from "../common/general_class";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import moment from "moment";
import { useStyles } from "./report_class";
import ProtoTypes from "prop-types";
import { stockReportHeader } from "../common/tableHeader";
const ReportList = props => {
  const { stock_report } = props;
  const classes = useStyles();

  const standardColour = value => {
    switch (value) {
      case 2:
        return classes.first;
      case 1:
        return classes.second;
      case 0:
        return classes.fifth;
      case -1:
        return classes.third;
      case -2:
        return classes.forth;
    }
  };
  useEffect(() => {}, [stock_report]);
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {stockReportHeader.map(col => (
              <StyledTableCell key={col.fieldName}>
                {col.headerName}
              </StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {stock_report.map((row, index) => (
            <TableRow key={index}>
              {stockReportHeader.map(col => (
                <TableCell
                  key={`${col.fieldName}_value`}
                  component="th"
                  className={
                    col.fieldName === "price"
                      ? standardColour(row.fluctuation)
                      : null
                  }
                  scope="row"
                >
                  {col.type === "date" ? (
                    moment(new Date(row[col.fieldName])).format("YYYY-MM-D")
                  ) : col.fieldName === "stock_id" ? (
                    <a href={`/stock/${row[col.fieldName]}`}>
                      {row[col.fieldName]}
                    </a>
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

export default ReportList;

ReportList.protoTypes = {
  stock_report: ProtoTypes.array.isRequired
};
