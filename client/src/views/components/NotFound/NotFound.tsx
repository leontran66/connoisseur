import React from 'react';
import { useHistory } from 'react-router';
import './NotFound.css';

const NotFound = () => {
  const history = useHistory();

  const goBack = () => {
    history.goBack();
  };

  return (
    <div className='not-found mx-auto'>
      <h1>404</h1>
      <span>Page not found</span>
      <p className='mt-1'>
        The page you are looking for doesn&apos;t exist or other error occurred.
        {' '}
        <a href='#!' onClick={() => goBack()}>Go back</a>
        , or head over to the
        {' '}
        <a href='/'>Connoisseur</a>
        {' '}
        &nbsp;homepage to choose a new direction.
      </p>
    </div>
  );
};

export default NotFound;
