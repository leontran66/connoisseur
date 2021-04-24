import React, { useEffect, useState } from 'react';
import { Redirect, useLocation } from 'react-router-dom';
import axios from 'axios';
import Pagination from '../Pagination';
import Result from '../Result';
import Spinner from '../../common/Spinner/Spinner';

type Props = {
  children: React.ReactElement;
};

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
    reviews: Array<{
      rating: number;
    }>;
  }>;
  pages: number;
};

const Wrapper = ({ children }: Props) => {
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
      await axios.get(`${process.env.REACT_APP_API_LOCAL}/api/business`)
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
  }, []);

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
