import React from 'react';
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';
import Spinner from '../../common/Spinner/Spinner';

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
          <Spinner />
        )
      }
    </>
  );
};

export default withAuthenticationRequired(Wrapper, {
  onRedirecting: () => (<Spinner />),
});
