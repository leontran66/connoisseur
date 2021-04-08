import React from 'react';
import Browse from '../components/Landing/Browse';
import ContainerFluid from '../components/common/ContainerFluid';
import Footer from '../components/common/Footer';
import Header from '../components/common/Navbar';
import Landing from '../components/Landing';
import Restaurants from '../components/Landing/Restaurants';
import Search from '../components/common/Search';

const IndexPage = () => (
  <>
    <Header />
    <ContainerFluid>
      <Landing>
        <Search />
      </Landing>
      <Restaurants />
      <Browse />
    </ContainerFluid>
    <Footer />
  </>
);

export default IndexPage;
