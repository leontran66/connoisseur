import React from 'react';
import Business from '../components/Profile/Business';
import Container from '../components/common/Container';
import Footer from '../components/common/Footer';
import Navbar from '../components/common/Navbar';
import Profile from '../components/Profile/Profile';
import Tabs from '../components/Profile/Tabs';
import Wrapper from '../components/Profile/Wrapper';

const ProfilePage = () => (
  <>
    <Navbar />
    <Container>
      <Wrapper>
        <Tabs>
          <Profile />
          <Business />
        </Tabs>
      </Wrapper>
    </Container>
    <Footer />
  </>
);

export default ProfilePage;
