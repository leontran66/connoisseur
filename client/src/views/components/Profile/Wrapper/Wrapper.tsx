import React from 'react';
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';
import Redirect from '../../common/Redirect/Redirect';

type Props = {
  children: React.ReactNode
}

const Wrapper = ({ children }: Props) => {
  const { isAuthenticated, isLoading } = useAuth0();

  return (
    <>
      {
        !isLoading && isAuthenticated ? (
          <>
            {children}
          </>
        ) : (
          <div>Loading...</div>
        )
      }
    </>
  );
};

export default withAuthenticationRequired(Wrapper, {
  onRedirecting: () => (<Redirect />),
});
