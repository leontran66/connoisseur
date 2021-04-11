import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';
import business from '../pages/business';
import businesses from '../pages/businesses';
import notfound from '../pages/notfound';
import profile from '../pages/profile';
import defaultRoute from './default';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.esm.min.js';

const App = () => (
  <Auth0Provider
    audience={process.env.REACT_APP_AUTH0_AUDIENCE!}
    domain={process.env.REACT_APP_AUTH0_DOMAIN!}
    clientId={process.env.REACT_APP_AUTH0_CLIENT_ID!}
    redirectUri={window.location.origin}
    scope='read:current_user update:current_user_metadata'
  >
    <Router>
      <Switch>
        <Route exact path='/profile' component={profile} />
        <Route exact path='/restaurants/:id' component={business} />
        <Route exact path='/restaurants' component={businesses} />
        <Route exact path='/' component={defaultRoute} />
        <Route exact path='/index.html' component={defaultRoute} />
        <Route component={notfound} />
      </Switch>
    </Router>
  </Auth0Provider>
);

export default App;
