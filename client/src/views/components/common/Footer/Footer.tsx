import React from 'react';
import './Footer.css';

const Footer = () => (
  <div className='footer py-3 card-footer bg-dark'>
    <div className='container text-center'>
      <span className='text-white'>&copy; Leon Tran 2021</span>
    </div>
    <div className='footer-hidden'>
      Icons made by&nbsp;
      <a href='https://www.freepik.com' title='Freepik'>Freepik</a>
      &nbsp;&&nbsp;
      <a href='https://www.flaticon.com/authors/pixel-perfect' title='Pixel perfect'>Pixel perfect</a>
      &nbsp;from&nbsp;
      <a href='https://www.flaticon.com/' title='Flaticon'>www.flaticon.com</a>
    </div>
  </div>
);

export default Footer;
