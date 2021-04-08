import React from 'react';
import './ContainerFluid.css';

type Props = {
  children: React.ReactNode;
};

const Container = ({ children }: Props) => (
  <div className='container-fluid p-0'>
    {children}
  </div>
);

export default Container;
