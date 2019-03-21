import React from "react";
import ReactDOM from "react-dom";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../store/configureStore";
import bootstrap from "~/core/bootstrap";

import App from "../components/App";
import Home from "../routes/home";

const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <App>
        <Router>
          <Switch>
            <Route path="/" exact={true} component={Home} />
          </Switch>
        </Router>
      </App>
    </Provider>,
    document.getElementById("react-root")
  );
};

bootstrap().then(render);
