import { connect } from "react-redux";
import ReportPage from "../components/report/report";
import * as actions from "../actions";

const mapStateToProps = state => {
  const stock_report = state.app.stock_report;
  //   const stock_list = state.app.stock_list;
  return {
    stock_report
  };
};

const mapDispatchToProps = dispatch => ({
  getWatchStock: form => dispatch(actions.getWatchStock(form))
  //   getWatchStocks: query => dispatch(actions.getWatchStocks(query))
});

const Report = connect(mapStateToProps, mapDispatchToProps)(ReportPage);

export default Report;
