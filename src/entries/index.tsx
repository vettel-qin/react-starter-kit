import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import bootstrap from '~/core/bootstrap';

import App from '../components/App';
import Home from '../routes/home';

const render = () => {
  ReactDOM.render(
    <App>
      <Router>
        <Switch>
          <Route path="/" exact={true} component={Home} />
        </Switch>
      </Router>
    </App>,
    document.getElementById('react-root'),
  );
};

bootstrap().then(render);
