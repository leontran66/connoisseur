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
  const tab = window.location.href.split('#');
  let key = 0;

  return (
    <>
      <ul className='nav nav-tabs pt-3' id='userTab' role='tablist'>
        <li className='nav-item' role='presentation'>
          <button className={`nav-link ${tab[1] === 'profile' || tab[1] === undefined ? 'active' : ''}`} id='profile-tab' data-bs-toggle='tab' data-bs-target='#profile' type='button' role='tab' aria-controls='profile' aria-selected='true'>Profile</button>
        </li>
        <li className='nav-item' role='presentation'>
          <button className={`nav-link ${tab[1] === 'business' && 'active'}`} id='business-tab' data-bs-toggle='tab' data-bs-target='#business' type='button' role='tab' aria-controls='business' aria-selected='false'>Business</button>
        </li>
        {
          business.abn !== ''
          && (
          <li className='nav-item' role='presentation'>
            <button className={`nav-link ${tab[1] === 'menu' && 'active'}`} id='menu-tab' data-bs-toggle='tab' data-bs-target='#menu' type='button' role='tab' aria-controls='menu' aria-selected='false'>Menu</button>
          </li>
          )
        }
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
