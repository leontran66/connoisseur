import React from 'react';

type Props = {
  children: React.ReactNode
}

const Tabs = ({ children }: Props) => (
  <>
    <ul className='nav nav-tabs' id='businessTab' role='tablist'>
      <li className='nav-item' role='presentation'>
        <button className='nav-link active' id='menu-tab' data-bs-toggle='tab' data-bs-target='#menu' type='button' role='tab' aria-controls='menu' aria-selected='true'>Menu</button>
      </li>
      <li className='nav-item' role='presentation'>
        <button className='nav-link' id='reviews-tab' data-bs-toggle='tab' data-bs-target='#reviews' type='button' role='tab' aria-controls='reviews' aria-selected='false'>Reviews</button>
      </li>
    </ul>
    <div className='tab-content' id='businessTabContent'>
      {children}
    </div>
  </>
);

export default Tabs;
