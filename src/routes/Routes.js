import React from "react";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import Login from "../pages/Login";
function Routes() {
  return (
<BrowserRouter>
  <Switch>
    <Route exact path="/" component={Login}>

    </Route>
  </Switch>
</BrowserRouter>
  );
}

export default Routes;
