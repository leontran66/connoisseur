import React from 'react';
import MenuForm from '../components/Forms/Menu';
import Container from '../components/common/Container';
import Footer from '../components/common/Footer';
import Navbar from '../components/common/Navbar';

const NewMenuPage = () => (
  <>
    <Navbar />
    <Container>
      <MenuForm />
    </Container>
    <Footer />
  </>
);

export default NewMenuPage;
