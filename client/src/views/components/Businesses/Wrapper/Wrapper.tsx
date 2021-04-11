import React from 'react';
import { Redirect, useLocation } from 'react-router-dom';

type Props = {
  children: React.ReactNode
}

const Wrapper = ({ children }: Props) => {
  const query = new URLSearchParams(useLocation().search);
  const search = query.get('search_query');
  const pages = 10;
  let currentPage = 1;
  if (query.get('page')) {
    currentPage = parseInt(query.get('page')!, 10);
  }
  let redirect = <Redirect to='/restaurants' />;
  if (search) {
    redirect = <Redirect to={`/restaurants?search_query=${search}`} />;
  }

  return (
    <>
      {
        currentPage > 0 && currentPage <= pages ? (
          <>
            {children}
          </>
        ) : (
          redirect
        )
      }
    </>
  );
};

export default Wrapper;
