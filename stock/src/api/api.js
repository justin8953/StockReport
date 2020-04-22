import { API } from "./index";
import axios from "axios";

export const postTrackingStock = formData => {
  const promise = axios({
    method: "POST",
    url: `${API}/api/tracking/`,
    data: formData
  });
  return promise;
};

export const getTrackingStocks = query => {
  const promise = axios({
    method: "GET",
    url: `${API}/api/tracking/`,
    params: query
  });
  return promise;
};

export const getStockReport = query => {
  const promise = axios({
    method: "GET",
    url: `${API}/api/stock/`,
    params: query
  });
  return promise;
};
