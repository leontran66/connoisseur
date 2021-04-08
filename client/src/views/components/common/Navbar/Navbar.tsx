import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import './Navbar.css';

const Navbar = () => {
  const {
    isAuthenticated, isLoading, loginWithRedirect, logout,
  } = useAuth0();

  const guestLinks = (
    <ul className='navbar-nav mr-auto'>
      <li className='nav-item'>
        <a className='nav-link' href='#!' onClick={() => loginWithRedirect()}>Login</a>
      </li>
    </ul>
  );

  const authLinks = (
    <ul className='navbar-nav mr-auto'>
      <li className='nav-item'>
        <a className='nav-link' href='/profile'>Profile</a>
      </li>
      <li className='nav-item'>
        <a className='nav-link' href='#!' onClick={() => logout({ returnTo: window.location.origin })}>Logout</a>
      </li>
    </ul>
  );

  return (
    <div className='navbar navbar-expand-md navbar-dark bg-dark mb-3'>
      <div className='container'>
        <a className='navbar-brand' href='/'>Connoisseur</a>
        <button className='navbar-toggler' type='button' data-bs-toggle='collapse' data-bs-target='#navbarSupportedContent' aria-controls='navbarSupportedContent' aria-expanded='false' aria-label='Toggle navigation'>
          <span className='navbar-toggler-icon' />
        </button>
        <div className='collapse navbar-collapse' id='navbarSupportedContent'>
          <ul className='navbar-nav me-auto'>
            <li className='nav-item'>
              <a className='nav-link' href='/restaurants'>Restaurants</a>
            </li>
          </ul>
          {
            !isLoading && isAuthenticated ? authLinks : guestLinks
          }
        </div>
      </div>
    </div>
  );
};

export default Navbar;
