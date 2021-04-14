import React, { Fragment, useEffect, useState } from 'react';
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';
import axios from 'axios';
import Spinner from '../../common/Spinner/Spinner';

type Props = {
  children: React.ReactElement
}

const Wrapper = ({ children }: Props) => {
  const { isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();
  const [dataLoaded, setDataLoaded] = useState(false);

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

      await axios.get(`${process.env.REACT_APP_API_LOCAL}/api/business/me`, config)
        .then((res) => {
          const {
            name, abn, phone, fax, streetAddress, suburb, state, postCode, menu, reviews,
          } = res.data.business;
          setBusinessData({
            ...businessData,
            name,
            abn,
            phone,
            fax,
            streetAddress,
            suburb,
            state,
            postCode,
            menu,
            reviews,
          });
          setDataLoaded(true);
        })
        .catch(() => {
          setDataLoaded(true);
        });
    };

    getBusiness();
  }, [getAccessTokenSilently]);

  const [businessData, setBusinessData] = useState({
    name: '',
    abn: '',
    phone: '',
    fax: '',
    streetAddress: '',
    suburb: '',
    state: '',
    postCode: '',
    menu: [],
    reviews: [],
  });

  return (
    <>
      {
        !isLoading && isAuthenticated && dataLoaded ? (
          React.cloneElement(children, { business: businessData })
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
