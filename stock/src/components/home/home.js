import React, { useState, useEffect } from "react";
import { trackingStock, trackingStockError } from "../common/formData";
import StockList from "./stockList";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import AddIcon from "@material-ui/icons/Add";
import Button from "@material-ui/core/Button";

import ProtoTypes from "prop-types";
const HomePage = props => {
  const { stock_list, stock, postWatchStock, getWatchStocks } = props;
  const [init, setInit] = useState(true);
  const [formData, setFormData] = useState(trackingStock);
  const [errors, setErrors] = useState(trackingStockError);
  const handleChange = event => {
    const { name, value } = event.target;
    formData[name] = value;
    setFormData(Object.assign({}, formData));
  };

  const handleSubmit = event => {
    var keys = Object.keys(errors);
    var validate = true;
    keys.forEach(key => {
      if (formData[key] === "") {
        errors[key] = true;
        validate = false;
      }
    });
    setErrors(Object.assign({}, errors));
    if (validate) {
      postWatchStock(formData);
    }
    event.preventDefault();
  };
  useEffect(() => {
    const fetchStockList = () => {
      const query = {
        set: "stock"
      };
      getWatchStocks(query);
    };
    if (init) {
      fetchStockList();
      setInit(false);
    }
  }, [stock_list, init]);
  return (
    <Grid container spacing={3}>
      <Grid item xs={2} sm={2} md={2} lg={2} xl={2}>
        <form noValidate>
          <TextField
            error={errors["stock_id"]}
            label="新增追蹤股票代碼"
            name="stock_id"
            type="number"
            value={formData["stock_id"]}
            onChange={handleChange}
            helperText={errors["stock_id"] ? "請填入股票代碼" : ""}
            required
          />
        </form>
      </Grid>
      <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
        <Button onClick={handleSubmit} size="large" startIcon={<AddIcon />}>
          新增
        </Button>
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
        <StockList stock_list={stock_list} />
      </Grid>
    </Grid>
  );
};

export default HomePage;

HomePage.protoTypes = {
  stock_list: ProtoTypes.array.isRequired,
  stock: ProtoTypes.object.isRequired,
  postWatchStock: ProtoTypes.func.isRequired,
  getWatchStocks: ProtoTypes.func.isRequired
};
