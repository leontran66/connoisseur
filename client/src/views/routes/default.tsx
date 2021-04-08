import React from 'react';
import Browse from '../components/Landing/Browse';
import ContainerFluid from '../components/common/ContainerFluid';
import Footer from '../components/common/Footer';
import Navbar from '../components/common/Navbar';
import Header from '../components/Landing/Header';
import Restaurants from '../components/Landing/Restaurants';
import Search from '../components/common/Search';

const IndexPage = () => (
  <>
    <Navbar />
    <ContainerFluid>
      <Header>
        <Search />
      </Header>
      <Restaurants />
      <Browse />
    </ContainerFluid>
    <Footer />
  </>
);

export default IndexPage;
