import React from 'react';
import './Restaurants.css';

const Restaurants = () => (
  <div className='restaurants' id='restaurants'>
    <div className='row gx-0'>
      <div className='card text-white bg-dark restaurant col-3 border-end'>
        <div className='card-body'>
          <img src='https://static.wikia.nocookie.net/wowwiki/images/e/ee/WoW_Companion_App_icon-Google_Play.png' className='card-img-top' alt='WoW' />
          <div className='card-text'>
            <h4 className='card-title mb-3'>
              Business Name
              <span>
                5.0&nbsp;
                <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='yellow' className='bi bi-star-fill' viewBox='0 0 16 16'>
                  <path d='M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256' />
                </svg>
                &nbsp;
                <i className='num-reviews'>(50)</i>
              </span>
            </h4>
            <p className='mb-1'>
              <b>Address</b>
              <br />
              1 Hello Street
              <br />
              World, QLD, 4123
            </p>
            <p className='mb-1'>
              <b>Phone</b>
              <br />
              31231231
            </p>
            <p>
              <b>Fax</b>
              <br />
              31231231
            </p>
            <a href='/restaurants?search_query=WoW' className='btn btn-primary'>Read More</a>
          </div>
        </div>
      </div>
      <div className='card text-white bg-dark restaurant col-3'>
        <div className='card-body'>
          <img src='https://static.wikia.nocookie.net/wowwiki/images/e/ee/WoW_Companion_App_icon-Google_Play.png' className='card-img-top' alt='WoW' />
          <div className='card-text'>
            <h4 className='card-title mb-3'>
              Business Name&nbsp;
              <span>
                5.0&nbsp;
                <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='yellow' className='bi bi-star-fill' viewBox='0 0 16 16'>
                  <path d='M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256' />
                </svg>
                &nbsp;
                <i className='num-reviews'>(50)</i>
              </span>
            </h4>
            <p className='mb-1'>
              <b>Address</b>
              <br />
              1 Hello Street
              <br />
              World, QLD, 4123
            </p>
            <p className='mb-1'>
              <b>Phone</b>
              <br />
              31231231
            </p>
            <p>
              <b>Fax</b>
              <br />
              31231231
            </p>
            <a href='/restaurants?search_query=WoW' className='btn btn-primary'>Read More</a>
          </div>
        </div>
      </div>
      <div className='card text-white bg-dark restaurant col-3 border-start'>
        <div className='card-body'>
          <img src='https://static.wikia.nocookie.net/wowwiki/images/e/ee/WoW_Companion_App_icon-Google_Play.png' className='card-img-top' alt='WoW' />
          <div className='card-text'>
            <h4 className='card-title mb-3'>
              Business Name&nbsp;
              <span>
                5.0&nbsp;
                <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='yellow' className='bi bi-star-fill' viewBox='0 0 16 16'>
                  <path d='M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256' />
                </svg>
                &nbsp;
                <i className='num-reviews'>(50)</i>
              </span>
            </h4>
            <p className='mb-1'>
              <b>Address</b>
              <br />
              1 Hello Street
              <br />
              World, QLD, 4123
            </p>
            <p className='mb-1'>
              <b>Phone</b>
              <br />
              31231231
            </p>
            <p>
              <b>Fax</b>
              <br />
              31231231
            </p>
            <a href='/restaurants?search_query=WoW' className='btn btn-primary'>Read More</a>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Restaurants;
