import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import './Profile.css';

const Profile = () => {
  const { user } = useAuth0();

  return (
    <div className='tab-pane fade show active' id='profile' role='tabpanel' aria-labelledby='profile-tab'>
      <table className='table table-borderless mt-3 ms-2'>
        <tbody>
          <tr>
            <th>Name:</th>
            <td>{user.name}</td>
          </tr>
          <tr>
            <th>Email:</th>
            <td>{user.email}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Profile;
