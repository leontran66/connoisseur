import React from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import './DeleteBusiness.css';

const DeleteBusiness = () => {
  const { getAccessTokenSilently } = useAuth0();
  const history = useHistory();

  const deleteBusiness = async () => {
    const token = await getAccessTokenSilently({
      audience: process.env.REACT_APP_AUTH0_AUDIENCE,
      scope: 'write:business',
    });
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    await axios.delete(`${process.env.REACT_APP_API_LOCAL}/api/business`, config);
    history.push('/profile#business');
    history.go(0);
  };

  return (
    <div className='modal fade' id='deleteBusiness' aria-labelledby='deleteBusinessLabel' aria-hidden='true'>
      <div className='modal-dialog'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h5 className='modal-title' id='deleteBusinessLabel'>Delete Business</h5>
            <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close' />
          </div>
          <div className='modal-body'>
            Once you delete your business, there is no going back. Are you sure you wish to delete
            your business?
          </div>
          <div className='modal-footer'>
            <button type='button' className='btn btn-dark' data-bs-dismiss='modal'>Close</button>
            <button type='button' className='btn btn-danger' onClick={() => deleteBusiness()}>Delete Business</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteBusiness;
