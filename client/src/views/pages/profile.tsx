import React from 'react';
import Footer from '../components/common/Footer';
import Header from '../components/common/Navbar';
import Profile from '../components/Profile';

const ProfilePage = () => (
  <>
    <Header />
    <div className='container'>
      Profile Page
      <p>Display business details (if applicable)</p>
      <p>Display menu items (if applicable)</p>
      <p>Display password settings</p>
      <Profile />
    </div>
    <Footer />
  </>
);

export default ProfilePage;
