import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import App from "./App";
import store from "./store";
import LoginPage from "./components/loginPage/loginPage";

render(
  <Provider store={store}>
    <BrowserRouter>
      <App>
        <Switch>
          <Route exact path='/login' component={LoginPage} />
          <Route exact path='/register' component={LoginPage} />
          <Route path='*' component={Error} />
        </Switch>
      </App>
    </BrowserRouter>
  </Provider>, document.getElementById("root")
);