import React, { Fragment } from 'react';

type Props = {
  children: React.ReactElement[];
  business: {
    name: string;
    abn: string;
    phone: string;
    fax: string;
    streetAddress: string;
    suburb: string;
    state: string;
    postCode: string;
  }
}

const Tabs = ({ children, business }: Props) => {
  let key = 0;

  return (
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
        {
          children.map((child: React.ReactElement) => {
            key += 1;
            return (
              <Fragment key={key}>
                {React.cloneElement(child, { business })}
              </Fragment>
            );
          })
        }
      </div>
    </>
  );
};

export default Tabs;
