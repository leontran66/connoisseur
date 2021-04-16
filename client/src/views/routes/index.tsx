import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';
import business from '../pages/business';
import businesses from '../pages/businesses';
import editBusiness from '../pages/editBusiness';
import editMenu from '../pages/editMenu';
import newBusiness from '../pages/newBusiness';
import newMenu from '../pages/newMenu';
import notfound from '../pages/notfound';
import profile from '../pages/profile';
import defaultRoute from './default';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.esm.min.js';
import 'starability/starability-minified/starability-grow.min.css';

const App = () => (
  <Auth0Provider
    audience={process.env.REACT_APP_AUTH0_AUDIENCE!}
    domain={process.env.REACT_APP_AUTH0_DOMAIN!}
    clientId={process.env.REACT_APP_AUTH0_CLIENT_ID!}
    redirectUri={window.location.origin}
    scope='openid read:current_user update:current_user_metadata read:business write:business read:menu write:menu read:reviews write:reviews'
  >
    <Router>
      <Switch>
        <Route exact path='/menu/new' component={newMenu} />
        <Route exact path='/menu/:id/edit' component={editMenu} />
        <Route exact path='/profile' component={profile} />
        <Route exact path='/profile/new' component={newBusiness} />
        <Route exact path='/profile/edit' component={editBusiness} />
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
