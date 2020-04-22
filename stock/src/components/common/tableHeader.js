export const trackingHeader = [
  { headerName: "股票代碼", fieldName: "stock_id", type: "number" },
  { headerName: "前一工作日", fieldName: "date", type: "date" },
  { headerName: "前一工作日開盤價", fieldName: "open", type: "number" },
  { headerName: "前一工作日收盤價", fieldName: "price", type: "number" },
  { headerName: "前一工作日最高價", fieldName: "high", type: "number" },
  { headerName: "前一工作日最低價", fieldName: "low", type: "number" }
];

export const stockReportHeader = [
  { headerName: "工作日", fieldName: "date", type: "date" },
  { headerName: "收盤價", fieldName: "price", type: "number" }
];
