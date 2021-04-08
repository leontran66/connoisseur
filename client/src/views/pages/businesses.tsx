import React from 'react';
import Container from '../components/common/Container';
import Footer from '../components/common/Footer';
import Navbar from '../components/common/Navbar';
import Pagination from '../components/Businesses/Pagination';
import Result from '../components/Businesses/Result';
import Search from '../components/common/Search';

const BusinessesPage = () => (
  <>
    <Navbar />
    <Container>
      <Search />
      <Result />
      <Result />
      <Result />
      <Result />
      <Pagination />
    </Container>
    <Footer />
  </>
);

export default BusinessesPage;
