import { handleActions } from "redux-actions";
import * as types from "../constants";

export const initialState = {
  stock: {},
  stock_list: [],
  stock_report: []
};

const app = handleActions(
  {
    [types.POST_WATCH_STOCK]: (state, action) => {
      var resp = action.payload;
      return resp;
    },
    [types.GET_WATCH_STOCK_LIST]: (state, action) => {
      var resp = action.payload.data;
      return resp;
    },
    [types.GET_WATCH_STOCK]: (state, action) => {
      var resp = action.payload.data;
      return resp;
    }
  },
  initialState
);

export default app;
