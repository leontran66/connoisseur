import React from 'react';
import Container from '../components/common/Container';
import Footer from '../components/common/Footer';
import Navbar from '../components/common/Navbar';
import NotFound from '../components/NotFound';

const NotFoundPage = () => (
  <>
    <Navbar />
    <Container>
      <NotFound />
    </Container>
    <Footer />
  </>
);

export default NotFoundPage;
