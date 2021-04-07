import React from 'react';
import Footer from '../components/common/Footer';
import Header from '../components/common/Navbar';

const BusinessPage = () => (
  <>
    <Header />
    <div className='container'>
      Business Page
      <p>Display business name & average rating</p>
      <p>Display business details in side nav</p>
      <p>Display all menu items</p>
      <p>Display all reviews for business</p>
    </div>
    <Footer />
  </>
);

export default BusinessPage;
