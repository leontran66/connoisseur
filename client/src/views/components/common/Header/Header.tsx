import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const Header = () => {
  const {
    isAuthenticated, isLoading, loginWithRedirect, logout,
  } = useAuth0();

  return (
    <>
      <button type='button' onClick={() => loginWithRedirect()}>Login</button>
      {
        !isLoading && isAuthenticated
        && <button type='button' onClick={() => logout()}>Logout</button>
      }
    </>
  );
};

export default Header;
