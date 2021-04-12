/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { useHistory } from 'react-router-dom';
import './Business.css';

const Business = () => {
  const history = useHistory();

  const goBack = () => {
    history.goBack();
  };

  const onSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
  };

  return (
    <div className='business-form mx-auto'>
      <h1>Create Restaurant Profile</h1>
      <form>
        <div className='mb-3'>
          <label htmlFor='name' className='form-label'>Name</label>
          <input type='text' className='form-control' id='name' name='name' />
        </div>
        <div className='mb-3'>
          <label htmlFor='abn' className='form-label'>ABN</label>
          <input type='text' className='form-control' id='abn' name='abn' />
        </div>
        <div className='mb-3 row'>
          <div className='col-6'>
            <label htmlFor='phone' className='form-label'>Phone</label>
            <input type='text' className='form-control' id='phone' name='phone' />
          </div>
          <div className='col-6'>
            <label htmlFor='fax' className='form-label'>Fax</label>
            <input type='text' className='form-control' id='fax' name='fax' />
          </div>
        </div>
        <div className='mb-3'>
          <label htmlFor='streetAddress' className='form-label'>Street Address</label>
          <input type='text' className='form-control' id='streetAddress' name='streetAddress' />
        </div>
        <div className='mb-3 row'>
          <div className='col-6'>
            <label htmlFor='suburb' className='form-label'>Suburb</label>
            <input type='text' className='form-control' id='suburb' name='suburb' />
          </div>
          <div className='col-3'>
            <label htmlFor='state' className='form-label'>State</label>
            <select className='form-select' id='state' name='state' aria-label='State select'>
              <option defaultChecked>Select...</option>
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
            <input type='text' className='form-control' id='postCode' name='postCode' />
          </div>
        </div>
        <a href='#!' className='btn btn-dark me-2' onClick={() => goBack()}>Cancel</a>
        <button type='submit' className='btn btn-dark' onClick={(e) => onSubmit(e)}>Submit</button>
      </form>
    </div>
  );
};

export default Business;
