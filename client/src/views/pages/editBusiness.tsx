import React from 'react';
import BusinessForm from '../components/Forms/Business';
import Container from '../components/common/Container';
import Footer from '../components/common/Footer';
import Navbar from '../components/common/Navbar';

const EditBusinessPage = () => (
  <>
    <Navbar />
    <Container>
      <BusinessForm isNew={false} />
    </Container>
    <Footer />
  </>
);

export default EditBusinessPage;
