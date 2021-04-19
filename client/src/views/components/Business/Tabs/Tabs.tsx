import React, { Fragment } from 'react';

type Props = {
  children: React.ReactElement[];
  business: {
    menu: Array<{
      name: string;
      category: string;
      price: number;
      options: string;
      spicy: boolean;
      vegetarian: boolean;
      description: string;
    }>;
  };
};

const Tabs = ({ children, business }: Props) => {
  const tab = window.location.href.split('#');
  let key = 0;

  return (
    <>
      <ul className='nav nav-tabs' id='businessTab' role='tablist'>
        <li className='nav-item' role='presentation'>
          <button className={`nav-link ${(tab[1] === 'menu' || tab[1] === undefined) && 'active'}`} id='menu-tab' data-bs-toggle='tab' data-bs-target='#menu' type='button' role='tab' aria-controls='menu' aria-selected='true'>Menu</button>
        </li>
        <li className='nav-item' role='presentation'>
          <button className={`nav-link ${tab[1] === 'reviews' && 'active'}`} id='reviews-tab' data-bs-toggle='tab' data-bs-target='#reviews' type='button' role='tab' aria-controls='reviews' aria-selected='false'>Reviews</button>
        </li>
      </ul>
      <div className='tab-content' id='businessTabContent'>
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
