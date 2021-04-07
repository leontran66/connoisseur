import React from 'react';
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';
import Redirect from '../common/Redirect';

const Profile = () => {
  const {
    isAuthenticated, isLoading, user,
  } = useAuth0();

  return (
    <>
      {
        !isLoading && isAuthenticated ? (
          <div>
            <h2>{user.name}</h2>
            <p>{user.email}</p>
          </div>
        ) : (
          <div>Loading...</div>
        )
      }
    </>
  );
};

export default withAuthenticationRequired(Profile, {
  onRedirecting: () => (<Redirect />),
});
