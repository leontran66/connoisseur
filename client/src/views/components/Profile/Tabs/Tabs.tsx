import React from 'react';

type Props = {
  children: React.ReactNode
}

const Tabs = ({ children }: Props) => (
  <>
    <ul className='nav nav-tabs pt-3' id='userTab' role='tablist'>
      <li className='nav-item' role='presentation'>
        <button className='nav-link active' id='profile-tab' data-bs-toggle='tab' data-bs-target='#profile' type='button' role='tab' aria-controls='profile' aria-selected='true'>Profile</button>
      </li>
      <li className='nav-item' role='presentation'>
        <button className='nav-link' id='business-tab' data-bs-toggle='tab' data-bs-target='#business' type='button' role='tab' aria-controls='business' aria-selected='false'>Business</button>
      </li>
    </ul>
    <div className='tab-content' id='userTabContent'>
      {children}
    </div>
  </>
);

export default Tabs;
