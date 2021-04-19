import React from 'react';
import './Header.css';

type Props = {
  children: React.ReactElement;
};

const Header = ({ children }: Props) => (
  <div className='header mx-auto text-center'>
    <h1 className='mb-3'>Connoisseur</h1>
    <h2 className='mb-5'>Brisbane restaurants and reviews.</h2>
    {children}
  </div>
);

export default Header;
