import React from 'react';
import './Container.css';

type Props = {
  children: React.ReactNode;
};

const Container = ({ children }: Props) => (
  <div className='container wrapper'>
    {children}
  </div>
);

export default Container;
