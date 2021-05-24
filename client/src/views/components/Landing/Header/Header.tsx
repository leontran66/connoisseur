import React, { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import './Header.css';

type Props = {
  children: React.ReactElement;
};

const Header = ({ children }: Props) => {
  const { isAuthenticated, user } = useAuth0();

  useEffect(() => {
    const setUserRole = async () => {
      if (isAuthenticated && user && !user[`${process.env.REACT_APP_AUTH0_AUDIENCE}/roles`].includes('user')) {
        const data = {
          url: `https://${process.env.REACT_APP_AUTH0_DOMAIN}/api/v2/users/${user.sub}/roles`,
        };

        await axios.post(`${process.env.REACT_APP_API}/api/user`, data);
      }
    };

    setUserRole();
  }, []);

  return (
    <div className='header mx-auto text-center'>
      <h1 className='mb-3'>Connoisseur</h1>
      <h2 className='mb-5'>Brisbane restaurants and reviews.</h2>
      {children}
    </div>
  );
};

export default Header;
