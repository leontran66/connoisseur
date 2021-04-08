import React from 'react';
import Container from '../components/common/Container';
import Footer from '../components/common/Footer';
import Header from '../components/common/Navbar';

const NotFoundPage = () => (
  <>
    <Header />
    <Container>
      Not Found Page
      <p>Display error 404</p>
      <p>Display error & links to go back</p>
    </Container>
    <Footer />
  </>
);

export default NotFoundPage;
