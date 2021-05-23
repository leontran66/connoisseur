import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import './Profile.css';

const Profile = () => {
  const { user } = useAuth0();
  const tab = window.location.href.split('#');

  return (
    <div className={`tab-pane fade ${tab[1] === 'profile' || tab[1] === undefined ? 'show active' : ''}`} id='profile' role='tabpanel' aria-labelledby='profile-tab'>
      <table className='table table-borderless mt-3 ms-2'>
        <tbody>
          <tr>
            <th>Name:</th>
            <td>{user && user.name}</td>
          </tr>
          <tr>
            <th>Email:</th>
            <td>{user && user.email}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Profile;
