import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import bootstrap from '~/core/bootstrap';

import App from '../components/App';
import Home from '../routes/home';
import Result from '../routes/result';

const render = () => {
  ReactDOM.render(
    <App>
      <Router>
        <Switch>
          <Route path="/" exact={true} component={Home} />
          <Route path="/result" exact={true} component={Result} />
        </Switch>
      </Router>
    </App>,
    document.getElementById('react-root'),
  );
};

bootstrap().then(render);
