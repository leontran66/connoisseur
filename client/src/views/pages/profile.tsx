import React from 'react';
import Container from '../components/common/Container';
import Footer from '../components/common/Footer';
import Header from '../components/common/Navbar';
import Profile from '../components/Profile';

const ProfilePage = () => (
  <>
    <Header />
    <Container>
      Profile Page
      <p>Display business details (if applicable)</p>
      <p>Display menu items (if applicable)</p>
      <p>Display password settings</p>
      <Profile />
    </Container>
    <Footer />
  </>
);

export default ProfilePage;
