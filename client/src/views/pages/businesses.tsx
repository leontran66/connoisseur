import React from 'react';
import Container from '../components/common/Container';
import Footer from '../components/common/Footer';
import Navbar from '../components/common/Navbar';
import Search from '../components/common/Search';
import Wrapper from '../components/Businesses/Wrapper';

const BusinessesPage = () => (
  <>
    <Navbar />
    <Container>
      <Wrapper>
        <Search />
      </Wrapper>
    </Container>
    <Footer />
  </>
);

export default BusinessesPage;
