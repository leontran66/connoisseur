import React from 'react';
import Container from '../components/common/Container';
import Footer from '../components/common/Footer';
import Heading from '../components/Business/Heading';
import Menu from '../components/Business/Menu';
import Navbar from '../components/common/Navbar';
import Reviews from '../components/Business/Reviews';
import ReviewForm from '../components/Forms/Review';
import Tabs from '../components/Business/Tabs';
import Wrapper from '../components/Business/Wrapper';

const BusinessPage = () => (
  <>
    <Navbar />
    <Container>
      <Wrapper>
        <Heading />
        <Tabs>
          <Menu />
          <Reviews>
            <ReviewForm />
          </Reviews>
        </Tabs>
      </Wrapper>
    </Container>
    <Footer />
  </>
);

export default BusinessPage;
