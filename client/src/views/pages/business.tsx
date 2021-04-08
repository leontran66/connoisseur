import React from 'react';
import Container from '../components/common/Container';
import Footer from '../components/common/Footer';
import Navbar from '../components/common/Navbar';

const BusinessPage = () => (
  <>
    <Navbar />
    <Container>
      Business Page
      <p>Display business name & average rating</p>
      <p>Display business details in side nav</p>
      <p>Display all menu items</p>
      <p>Display all reviews for business</p>
    </Container>
    <Footer />
  </>
);

export default BusinessPage;
