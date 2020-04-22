import { connect } from "react-redux";
import HomePage from "../components/home/home";
import * as actions from "../actions";

const mapStateToProps = state => {
  const stock = state.app.stock;
  const stock_list = state.app.stock_list;

  return {
    stock,
    stock_list
  };
};

const mapDispatchToProps = dispatch => ({
  postWatchStock: form => dispatch(actions.postWatchStock(form)),
  getWatchStocks: query => dispatch(actions.getWatchStocks(query))
});

const Home = connect(mapStateToProps, mapDispatchToProps)(HomePage);

export default Home;
