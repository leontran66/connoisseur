import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import './Settings.css';

const Settings = () => {
  const { user } = useAuth0();

  return (
    <div className='tab-pane fade' id='settings' role='tabpanel' aria-labelledby='settings-tab'>
      <table className='table table-borderless mt-3'>
        <tbody>
          <tr>
            <td>Email:</td>
            <td>{user.email}</td>
          </tr>
          <tr>
            <td>Password:</td>
            <td>●●●●●●●●</td>
          </tr>
        </tbody>
      </table>
      <div className='ms-2'>
        <button type='button' className='btn btn-dark me-2'>Change Password</button>
        <button type='button' className='btn btn-danger'>Delete Account</button>
      </div>
    </div>
  );
};

export default Settings;
