import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Container from "@material-ui/core/Container";
import { useStyles } from "./components/common/general_class";
import Home from "./containers/home";
import Report from "./containers/report";

import moment from "moment";
import "moment/locale/zh-tw";
moment.locale("zh-tw");

function App() {
  const classes = useStyles();
  return (
    <Container className={classes.root}>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/stock/:stockId" component={Report} />
        </Switch>
      </Router>
    </Container>
  );
}

export default App;
