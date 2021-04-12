import React from 'react';
import BusinessForm from '../components/Forms/Business';
import Container from '../components/common/Container';
import Footer from '../components/common/Footer';
import Navbar from '../components/common/Navbar';

const NewBusinessPage = () => (
  <>
    <Navbar />
    <Container>
      <BusinessForm />
    </Container>
    <Footer />
  </>
);

export default NewBusinessPage;
