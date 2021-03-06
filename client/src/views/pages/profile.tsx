import React from 'react';
import Business from '../components/Profile/Business';
import DeleteBusinessForm from '../components/Forms/DeleteBusiness';
import Container from '../components/common/Container';
import Footer from '../components/common/Footer';
import Menu from '../components/Profile/Menu';
import Navbar from '../components/common/Navbar';
import Profile from '../components/Profile/Profile';
import Tabs from '../components/Profile/Tabs';
import Wrapper from '../components/Profile/Wrapper';

const ProfilePage = () => {
  const businessDefault = {
    name: '',
    abn: '',
    phone: '',
    fax: '',
    streetAddress: '',
    suburb: '',
    state: '',
    postCode: '',
    menu: [],
  };

  return (
    <>
      <Navbar />
      <Container>
        <Wrapper>
          <Tabs business={businessDefault}>
            <Profile />
            <Business business={businessDefault}>
              <DeleteBusinessForm />
            </Business>
            <Menu business={businessDefault} />
          </Tabs>
        </Wrapper>
      </Container>
      <Footer />
    </>
  );
};

export default ProfilePage;
