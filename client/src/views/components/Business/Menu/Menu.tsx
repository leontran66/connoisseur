import React from 'react';
import Chilli from './chilli.png';
import Leaf from './leaf.png';
import './Menu.css';

const Menu = () => (
  <div className='tab-pane fade show active' id='menu' role='tabpanel' aria-labelledby='menu-tab'>
    <div className='row pb-3'>
      <div className='col-6'>
        <div className='card border-bottom'>
          <div className='card-body'>
            <h5 className='card-title mb-1'>
              Menu Item&nbsp;
              <span>
                <img src={Chilli} alt='Spicy' width={18} height={18} />
                &nbsp;&nbsp;
                <img src={Leaf} alt='Vegetarian' />
              </span>
              <span className='float-end'>
                $12.45
              </span>
            </h5>
            <p className='card-text'>
              Small, Regular, Large
              <br />
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec placerat tortor tortor.
            </p>
          </div>
        </div>
        <div className='card border-bottom'>
          <div className='card-body'>
            <h5 className='card-title mb-1'>
              Menu Item&nbsp;
              <span>
                <img src={Chilli} alt='Spicy' width={18} height={18} />
                &nbsp;&nbsp;
                <img src={Leaf} alt='Vegetarian' />
              </span>
              <span className='float-end'>
                $12.45
              </span>
            </h5>
            <p className='card-text'>
              Small, Regular, Large
              <br />
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec placerat tortor tortor.
            </p>
          </div>
        </div>
        <div className='card border-bottom'>
          <div className='card-body'>
            <h5 className='card-title mb-1'>
              Menu Item&nbsp;
              <span>
                <img src={Chilli} alt='Spicy' width={18} height={18} />
                &nbsp;&nbsp;
                <img src={Leaf} alt='Vegetarian' />
              </span>
              <span className='float-end'>
                $12.45
              </span>
            </h5>
            <p className='card-text'>
              Small, Regular, Large
              <br />
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec placerat tortor tortor.
            </p>
          </div>
        </div>
      </div>
      <div className='col-6'>
        <div className='card border-bottom'>
          <div className='card-body'>
            <h5 className='card-title mb-1'>
              Menu Item&nbsp;
              <span>
                <img src={Chilli} alt='Spicy' width={18} height={18} />
                &nbsp;&nbsp;
                <img src={Leaf} alt='Vegetarian' />
              </span>
              <span className='float-end'>
                $12.45
              </span>
            </h5>
            <p className='card-text'>
              Small, Regular, Large
              <br />
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec placerat tortor tortor.
            </p>
          </div>
        </div>
        <div className='card border-bottom'>
          <div className='card-body'>
            <h5 className='card-title mb-1'>
              Menu Item&nbsp;
              <span>
                <img src={Chilli} alt='Spicy' width={18} height={18} />
                &nbsp;&nbsp;
                <img src={Leaf} alt='Vegetarian' />
              </span>
              <span className='float-end'>
                $12.45
              </span>
            </h5>
            <p className='card-text'>
              Small, Regular, Large
              <br />
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec placerat tortor tortor.
            </p>
          </div>
        </div>
        <div className='card border-bottom'>
          <div className='card-body'>
            <h5 className='card-title mb-1'>
              Menu Item&nbsp;
              <span>
                <img src={Chilli} alt='Spicy' width={18} height={18} />
                &nbsp;&nbsp;
                <img src={Leaf} alt='Vegetarian' />
              </span>
              <span className='float-end'>
                $12.45
              </span>
            </h5>
            <p className='card-text'>
              Small, Regular, Large
              <br />
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec placerat tortor tortor.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Menu;
