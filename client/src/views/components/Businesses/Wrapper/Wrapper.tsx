import React from 'react';
import { Redirect, useLocation } from 'react-router-dom';

type Props = {
  children: React.ReactNode
}

const Wrapper = ({ children }: Props) => {
  const query = new URLSearchParams(useLocation().search);
  const pages = 10;
  let currentPage = 1;
  if (query.get('page')) {
    currentPage = parseInt(query.get('page')!, 10);
  }

  return (
    <>
      {
        currentPage > 0 && currentPage <= pages ? (
          <>
            {children}
          </>
        ) : (
          <Redirect to='/404' />
        )
      }
    </>
  );
};

export default Wrapper;
