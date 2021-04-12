import React from 'react';
import './Business.css';

const Business = () => (
  <div className='tab-pane fade' id='business' role='tabpanel' aria-labelledby='business-tab'>
    <div className='mt-4 ms-2'>
      You current do not have a business profile.
      <br />
      <a href='/profile/new' className='btn btn-dark mt-3'>Create Business</a>
    </div>
  </div>
);

export default Business;
