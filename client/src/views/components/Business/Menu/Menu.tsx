import React from 'react';
import Chilli from './chilli.png';
import Leaf from './leaf.png';
import './Menu.css';

type Props = {
  business: {
    menu: Array<{
      _id: string;
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

const Menu = ({ business: { menu } }: Props) => {
  const colOne = [];
  const colTwo = [];
  for (let i = 0; i < menu.length; i += 1) {
    if (i % 2 === 0) {
      colOne.push(menu[i]);
    } else {
      colTwo.push(menu[i]);
    }
  }
  const tab = window.location.href.split('#');

  return (
    <div className={`tab-pane fade ${(tab[1] === 'menu' || tab[1] === undefined) && 'show active'}`} id='menu' role='tabpanel' aria-labelledby='menu-tab'>
      <div className='row pb-3'>
        <div className='col-6'>
          {
            colOne.length > 0 && colOne.map((item) => (
              <div key={item._id} className='card border-bottom'>
                <div className='card-body'>
                  <h5 className='card-title mb-1 text-capitalize'>
                    {item.name}
                    &nbsp;
                    <span>
                      {
                        item.spicy
                        && (
                        <>
                          <img src={Chilli} alt='Spicy' width={18} height={18} />
                          &nbsp;&nbsp;
                        </>
                        )
                      }
                      {
                        item.vegetarian
                        && <img src={Leaf} alt='Vegetarian' />
                      }
                    </span>
                    <span className='float-end'>
                      $
                      {item.price}
                    </span>
                  </h5>
                  <p className='card-text'>
                    <span className='text-capitalize'>{item.options}</span>
                    <br />
                    <em>{item.description}</em>
                  </p>
                </div>
              </div>
            ))
          }
        </div>
        <div className='col-6'>
          {
            colTwo.length > 0 && colTwo.map((item) => (
              <div key={item._id} className='card border-bottom'>
                <div className='card-body'>
                  <h5 className='card-title mb-1 text-capitalize'>
                    {item.name}
                    &nbsp;
                    <span>
                      {
                        item.spicy
                        && (
                        <>
                          <img src={Chilli} alt='Spicy' width={18} height={18} />
                          &nbsp;&nbsp;
                        </>
                        )
                      }
                      {
                        item.vegetarian
                        && <img src={Leaf} alt='Vegetarian' />
                      }
                    </span>
                    <span className='float-end'>
                      $
                      {item.price}
                    </span>
                  </h5>
                  <p className='card-text'>
                    <span className='text-capitalize'>{item.options}</span>
                    <br />
                    <em>{item.description}</em>
                  </p>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
};

export default Menu;
