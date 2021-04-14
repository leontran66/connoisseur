import React, { useEffect, useState } from 'react';
import { Redirect, useLocation } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import Pagination from '../Pagination';
import Result from '../Result';
import Spinner from '../../common/Spinner/Spinner';

type Props = {
  children: React.ReactNode
}

type Business = {
  businesses: Array<{
    _id: string;
    name: string;
    abn: string;
    phone: string;
    fax: string;
    streetAddress: string;
    suburb: string;
    state: string;
    postCode: string;
  }>;
  pages: number;
}

const Wrapper = ({ children }: Props) => {
  const { getAccessTokenSilently } = useAuth0();
  const [dataLoaded, setDataLoaded] = useState(false);
  const query = new URLSearchParams(useLocation().search);
  const search = query.get('search_query');
  let currentPage = 1;
  if (query.get('page')) {
    currentPage = parseInt(query.get('page')!, 10);
  }
  let redirect = <Redirect to='/restaurants' />;
  if (search) {
    redirect = <Redirect to={`/restaurants?search_query=${search}`} />;
  }

  useEffect(() => {
    const getBusiness = async () => {
      const token = await getAccessTokenSilently({
        audience: `${process.env.REACT_APP_AUTH0_AUDIENCE}`,
        scope: 'read:business',
      });

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      await axios.get(`${process.env.REACT_APP_API_LOCAL}/api/business`, config)
        .then((res) => {
          const { businesses } = res.data;
          setBusinessData({
            ...businessData,
            businesses,
            pages: businesses.length,
          });
          setDataLoaded(true);
        })
        .catch(() => {
          setDataLoaded(true);
        });
    };

    getBusiness();
  }, [getAccessTokenSilently]);

  const [businessData, setBusinessData] = useState<Business>({
    businesses: [],
    pages: 1,
  });

  const { businesses, pages } = businessData;

  return (
    <>
      {
        dataLoaded ? (
          <>
            {
              businesses.length > 0 ? (
                <>
                  {
                    currentPage > 0 && currentPage <= pages ? (
                      <>
                        {children}
                        {businesses.map((business) => (
                          <Result key={business._id} business={business} />
                        ))}
                        <Pagination pages={pages} />
                      </>
                    ) : (
                      redirect
                    )
                  }
                </>
              ) : (
                <>
                  {children}
                  <p>Not found</p>
                </>
              )
            }
          </>
        ) : (
          <Spinner />
        )
      }
    </>
  );
};

export default Wrapper;
