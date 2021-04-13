import React, {
  Fragment, useEffect, useState,
} from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import Spinner from '../common/Spinner/Spinner';

type Props = {
  children: any;
}

type Params = {
  id: string;
}

const Wrapper = ({ children }: Props) => {
  const { getAccessTokenSilently } = useAuth0();
  const history = useHistory();
  const { id } = useParams<Params>();
  const [dataLoaded, setDataLoaded] = useState(false);
  let key = 0;

  useEffect(() => {
    const getBusiness = async () => {
      const token = await getAccessTokenSilently({
        audience: `https://${process.env.REACT_APP_AUTH0_DOMAIN}/api/v2/`,
        scope: 'read:business',
      });

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      await axios.get(`http://localhost:5000/api/business/${id}`, config)
        .then((res) => {
          const {
            name, phone, fax, streetAddress, suburb, state, postCode, menu, reviews,
          } = res.data.business;
          setBusinessData({
            ...businessData,
            name,
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
          history.push('/404');
        });
    };

    getBusiness();
  }, [getAccessTokenSilently]);

  const [businessData, setBusinessData] = useState({
    name: '',
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
        dataLoaded ? (
          children.map((child: React.ReactElement) => {
            key += 1;
            return (
              <Fragment key={key}>
                {React.cloneElement(child, { business: businessData })}
              </Fragment>
            );
          })
        ) : (
          <Spinner />
        )
      }
    </>
  );
};

export default Wrapper;
