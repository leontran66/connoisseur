import React from 'react';
import './Landing.css';

type Props = {
  children: React.ReactNode
}

const Landing = ({ children }: Props) => (
  <div className='landing mx-auto'>
    <h1 className='mb-5 text-center'>Connoisseur</h1>
    {children}
  </div>
);

export default Landing;
