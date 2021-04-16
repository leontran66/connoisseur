import React from 'react';
import MenuForm from '../components/Forms/Menu/Menu';
import Container from '../components/common/Container/Container';
import Footer from '../components/common/Footer/Footer';
import Navbar from '../components/common/Navbar/Navbar';

const EditMenuPage = () => (
  <>
    <Navbar />
    <Container>
      <MenuForm isNew={false} />
    </Container>
    <Footer />
  </>
);

export default EditMenuPage;
