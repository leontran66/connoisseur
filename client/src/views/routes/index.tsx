import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';
import business from '../pages/business';
import businesses from '../pages/businesses';
import index from '../pages/index';
import profile from '../pages/profile';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.esm.min.js';

const App = () => {
  useEffect(() => {

  }, []);

  return (
    <Auth0Provider
      audience={process.env.REACT_APP_AUTH0_AUDIENCE!}
      domain={process.env.REACT_APP_AUTH0_DOMAIN!}
      clientId={process.env.REACT_APP_AUTH0_CLIENT_ID!}
      redirectUri={window.location.origin}
      scope='read:current_user update:current_user_metadata'
    >
      <Router>
        <Switch>
          <Route exact path='/' component={index} />
          <Route exact path='/restaurants' component={businesses} />
          <Route exact path='/restaurants/:id' component={business} />
          <Route exact path='/profile' component={profile} />
        </Switch>
      </Router>
    </Auth0Provider>
  );
};

export default App;
