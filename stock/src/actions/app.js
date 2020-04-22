import { createAction } from "redux-actions";
import * as types from "../constants";
import {
  postTrackingStock,
  getTrackingStocks,
  getStockReport
} from "../api/api";

export const postWatchStock = createAction(
  types.POST_WATCH_STOCK,
  postTrackingStock
);

export const getWatchStocks = createAction(
  types.GET_WATCH_STOCK_LIST,
  getTrackingStocks
);

export const getWatchStock = createAction(
  types.GET_WATCH_STOCK,
  getStockReport
);
