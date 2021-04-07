import React from 'react';
import Container from '../components/common/Container';
import Footer from '../components/common/Footer';
import Header from '../components/common/Navbar';

const IndexPage = () => (
  <>
    <Header />
    <Container>
      Index Page
      <p>Display search bar on landing</p>
      <p>Display top 5 most popular businesses</p>
      <p>Display search bar at bottom</p>
    </Container>
    <Footer />
  </>
);

export default IndexPage;
