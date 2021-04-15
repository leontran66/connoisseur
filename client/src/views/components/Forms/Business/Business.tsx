import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import Spinner from '../../common/Spinner';
import './Business.css';

type Props = {
  isNew: boolean;
}

const Business = ({ isNew }: Props) => {
  const { user, getAccessTokenSilently } = useAuth0();
  const history = useHistory();
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    async function getBusiness() {
      const token = await getAccessTokenSilently({
        audience: process.env.REACT_APP_AUTH0_AUDIENCE,
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
            name, abn, phone, fax, streetAddress, suburb, state, postCode,
          } = res.data.business;
          setFormData({
            ...formData,
            name,
            abn,
            phone,
            fax,
            streetAddress,
            suburb,
            state,
            postCode,
          });
          setDataLoaded(true);
        })
        .catch(() => {
          history.replace('/404');
        });
    }
    if (!isNew) {
      getBusiness();
    } else {
      setDataLoaded(true);
    }
  }, [getAccessTokenSilently]);

  const [formData, setFormData] = useState({
    name: '',
    abn: '',
    phone: '',
    fax: '',
    streetAddress: '',
    suburb: '',
    state: '',
    postCode: '',
  });

  const {
    name, abn, phone, fax, streetAddress, suburb, state, postCode,
  } = formData;

  const goBack = () => {
    history.goBack();
  };

  const onChange = (e: React.FormEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.currentTarget.name]: e.currentTarget.value });
  };

  const onSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const token = await getAccessTokenSilently({
      audience: process.env.REACT_APP_AUTH0_AUDIENCE,
      scope: 'write:business',
    });
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const body = {
      user: user.sub,
      name,
      abn,
      phone,
      fax,
      streetAddress,
      suburb,
      state,
      postCode,
    };
    if (!isNew) {
      await axios.patch(`${process.env.REACT_APP_API_LOCAL}/api/business`, body, config)
        .then(() => history.push('/profile'))
        .catch((err) => console.log(err.response.data));
    } else {
      await axios.post(`${process.env.REACT_APP_API_LOCAL}/api/business`, body, config)
        .then(() => history.push('/profile'))
        .catch((err) => console.log(err.response.data));
    }
  };

  return (
    <>
      {
      dataLoaded
        ? (
          <div className='business-form mx-auto text-capitalize'>
            <h1>{`${isNew ? 'Create' : 'Edit'} Restaurant Profile`}</h1>
            <form>
              <div className='mb-3'>
                <label htmlFor='name' className='form-label'>Name</label>
                <input type='text' className='form-control' id='name' name='name' value={name} onChange={(e) => onChange(e)} />
              </div>
              <div className='mb-3'>
                <label htmlFor='abn' className='form-label'>ABN</label>
                <input type='text' className='form-control' id='abn' name='abn' value={abn} onChange={(e) => onChange(e)} />
              </div>
              <div className='mb-3 row'>
                <div className='col-6'>
                  <label htmlFor='phone' className='form-label'>Phone</label>
                  <input type='text' className='form-control' id='phone' name='phone' value={phone} onChange={(e) => onChange(e)} />
                </div>
                <div className='col-6'>
                  <label htmlFor='fax' className='form-label'>Fax</label>
                  <input type='text' className='form-control' id='fax' name='fax' value={fax} onChange={(e) => onChange(e)} />
                </div>
              </div>
              <div className='mb-3'>
                <label htmlFor='streetAddress' className='form-label'>Street Address</label>
                <input type='text' className='form-control' id='streetAddress' name='streetAddress' value={streetAddress} onChange={(e) => onChange(e)} />
              </div>
              <div className='mb-3 row'>
                <div className='col-6'>
                  <label htmlFor='suburb' className='form-label'>Suburb</label>
                  <input type='text' className='form-control' id='suburb' name='suburb' value={suburb} onChange={(e) => onChange(e)} />
                </div>
                <div className='col-3'>
                  <label htmlFor='state' className='form-label'>State</label>
                  <select className='form-select' id='state' name='state' value={state} aria-label='State select' onChange={(e) => onChange(e)}>
                    <option defaultChecked value=''>Select...</option>
                    <option value='ACT'>ACT</option>
                    <option value='NSW'>NSW</option>
                    <option value='NT'>NT</option>
                    <option value='QLD'>QLD</option>
                    <option value='SA'>SA</option>
                    <option value='TAS'>TAS</option>
                    <option value='VIC'>VIC</option>
                    <option value='WA'>WA</option>
                  </select>
                </div>
                <div className='col-3'>
                  <label htmlFor='postCode' className='form-label'>Postcode</label>
                  <input type='text' className='form-control' id='postCode' name='postCode' value={postCode} onChange={(e) => onChange(e)} />
                </div>
              </div>
              <button type='submit' className='btn btn-dark me-2' onClick={(e) => onSubmit(e)}>Submit</button>
              <button type='button' className='btn btn-dark' onClick={() => goBack()}>Cancel</button>
            </form>
          </div>
        ) : (
          <Spinner />
        )
    }
    </>
  );
};

export default Business;
