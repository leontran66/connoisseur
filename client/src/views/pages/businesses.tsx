import React from 'react';
import Container from '../components/common/Container';
import Footer from '../components/common/Footer';
import Navbar from '../components/common/Navbar';
import Pagination from '../components/Businesses/Pagination';

const BusinessesPage = () => (
  <>
    <Navbar />
    <Container>
      Businesses Page
      <p>Display search bar for businesses</p>
      <p>Display all businesses, paginated, limit 20</p>
      <Pagination />
    </Container>
    <Footer />
  </>
);

export default BusinessesPage;
