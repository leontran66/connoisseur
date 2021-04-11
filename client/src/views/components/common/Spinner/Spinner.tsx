import React from 'react';
import { ScaleLoader } from 'react-spinners';
import './Spinner.css';

const Redirect = () => (
  <div className='spinner text-center'>
    <ScaleLoader color='#36d7b7' width={6} height={52.5} radius={3} margin={3} />
  </div>
);

export default Redirect;
