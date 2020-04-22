import React, { useState, useEffect } from "react";
import ProtoTypes from "prop-types";
import ReportList from "./reportList";
import Grid from "@material-ui/core/Grid";
import Badge from "@material-ui/core/Badge";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import ShowChartIcon from "@material-ui/icons/ShowChart";
const ReportPage = props => {
  const { stock_report, getWatchStock } = props;
  const { stockId } = props.match.params;
  const [init, setInit] = useState(true);
  useEffect(() => {
    const fetchReport = () => {
      const form = { stock_id: stockId };
      getWatchStock(form);
    };
    if (init) {
      fetchReport();
      setInit(false);
    }
  }, [stock_report, init]);
  return (
    <Grid container spacing={3}>
      <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
        <Badge>
          {" "}
          <ShowChartIcon />
          股票代碼:
        </Badge>
        <Badge>
          <Typography color="primary" variant="subtitle1">
            {stockId}
          </Typography>
        </Badge>
      </Grid>
      <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
        <Link href="/">回上一頁</Link>
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
        <ReportList stock_report={stock_report} />
      </Grid>
    </Grid>
  );
};

export default ReportPage;

ReportPage.protoTypes = {
  stock_report: ProtoTypes.array.isRequired,
  getWatchStock: ProtoTypes.func.isRequired
};
