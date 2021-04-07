import React from 'react';
import Footer from '../components/common/Footer';
import Header from '../components/common/Navbar';

const BusinessesPage = () => (
  <>
    <Header />
    <div className='container'>
      Businesses Page
      <p>Display search bar for businesses</p>
      <p>Display all businesses, paginated, limit 20</p>
    </div>
    <Footer />
  </>
);

export default BusinessesPage;
