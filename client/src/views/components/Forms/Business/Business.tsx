/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import './Business.css';

const Business = () => {
  const { user, getAccessTokenSilently } = useAuth0();
  const history = useHistory();

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
      audience: `https://${process.env.REACT_APP_AUTH0_DOMAIN}/api/v2/`,
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
    await axios.post('http://localhost:5000/api/business', body, config);
    history.push('/profile');
  };

  return (
    <div className='business-form mx-auto'>
      <h1>Create Restaurant Profile</h1>
      <form>
        <div className='mb-3'>
          <label htmlFor='name' className='form-label'>Name</label>
          <input type='text' className='form-control' id='name' name='name' onChange={(e) => onChange(e)} />
        </div>
        <div className='mb-3'>
          <label htmlFor='abn' className='form-label'>ABN</label>
          <input type='text' className='form-control' id='abn' name='abn' onChange={(e) => onChange(e)} />
        </div>
        <div className='mb-3 row'>
          <div className='col-6'>
            <label htmlFor='phone' className='form-label'>Phone</label>
            <input type='text' className='form-control' id='phone' name='phone' onChange={(e) => onChange(e)} />
          </div>
          <div className='col-6'>
            <label htmlFor='fax' className='form-label'>Fax</label>
            <input type='text' className='form-control' id='fax' name='fax' onChange={(e) => onChange(e)} />
          </div>
        </div>
        <div className='mb-3'>
          <label htmlFor='streetAddress' className='form-label'>Street Address</label>
          <input type='text' className='form-control' id='streetAddress' name='streetAddress' onChange={(e) => onChange(e)} />
        </div>
        <div className='mb-3 row'>
          <div className='col-6'>
            <label htmlFor='suburb' className='form-label'>Suburb</label>
            <input type='text' className='form-control' id='suburb' name='suburb' onChange={(e) => onChange(e)} />
          </div>
          <div className='col-3'>
            <label htmlFor='state' className='form-label'>State</label>
            <select className='form-select' id='state' name='state' aria-label='State select' onChange={(e) => onChange(e)}>
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
            <input type='text' className='form-control' id='postCode' name='postCode' onChange={(e) => onChange(e)} />
          </div>
        </div>
        <button type='button' className='btn btn-dark me-2' onClick={() => goBack()}>Cancel</button>
        <button type='submit' className='btn btn-dark' onClick={(e) => onSubmit(e)}>Submit</button>
      </form>
    </div>
  );
};

export default Business;
