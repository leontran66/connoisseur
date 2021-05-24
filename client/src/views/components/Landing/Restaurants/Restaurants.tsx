import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NoImage from '../../../../images/no-image.png';
import './Restaurants.css';

type Businesses = {
  businesses: Array<{
    _id: string;
    name: string;
    abn: string;
    phone: string;
    fax: string;
    streetAddress: string;
    suburb: string;
    state: string;
    postCode: string;
    reviews: Array<{
      rating: number;
    }>
  }>;
};

const Restaurants = () => {
  useEffect(() => {
    async function getBusinesses() {
      await axios.get(`${process.env.REACT_APP_API}/api/business`)
        .then((res) => {
          const { businesses } = res.data;
          setBusinessData({
            ...businessData,
            businesses,
          });
        });
    }
    getBusinesses();
  }, []);

  const [businessData, setBusinessData] = useState<Businesses>({
    businesses: [],
  });

  const { businesses } = businessData;
  if (businesses && businesses.length > 0) {
    businesses.sort((a, b) => {
      let firstRating = 0;
      let secondRating = 0;
      if (a.reviews.length > 0) {
        a.reviews.forEach((review) => {
          firstRating += review.rating;
        });
        firstRating /= a.reviews.length;
      }
      if (b.reviews.length > 0) {
        b.reviews.forEach((review) => {
          secondRating += review.rating;
        });
        secondRating /= b.reviews.length;
      }
      return firstRating - secondRating;
    });
  }

  return (
    <div className='restaurants' id='restaurants'>
      <div className='row gx-0'>
        {
          businesses && businesses.length > 0 && businesses.slice(0, 3).map((business) => {
            let rating = 0;
            if (business.reviews.length > 0) {
              business.reviews.forEach((review) => {
                rating += review.rating;
              });
              rating /= business.reviews.length;
            }

            return (
              <div key={business._id} className='card text-white bg-dark restaurant col-3'>
                <div className='card-body'>
                  <img src={NoImage} className='card-img-top' alt='Teriyaki Tokyo' />
                  <div className='card-text text-capitalize'>
                    <h4 className='card-title mb-3'>
                      {business.name}
                      <span>
                        {rating}
                        &nbsp;
                        <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='#f5bd23' className='bi bi-star-fill' viewBox='0 0 16 16'>
                          <path d='M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256' />
                        </svg>
                        &nbsp;
                        <i className='num-reviews'>
                          (
                          {business.reviews.length}
                          )
                        </i>
                      </span>
                    </h4>
                    <p className='mb-1'>
                      <b>Address</b>
                      <br />
                      {
                        business.streetAddress
                          ? (
                            <>
                              {business.streetAddress}
                              <br />
                              {business.suburb}
                              ,&nbsp;
                              {business.state}
                              ,&nbsp;
                              {business.postCode}
                            </>
                          ) : (
                            <>
                              N/A
                            </>
                          )
                      }
                    </p>
                    <p className='mb-1'>
                      <b>Phone</b>
                      <br />
                      {business.phone}
                    </p>
                    <p>
                      <b>Fax</b>
                      <br />
                      {business.fax}
                    </p>
                    <a href={`/restaurants/${business._id}`} className='btn btn-light'>Read More</a>
                  </div>
                </div>
              </div>
            );
          })
        }
      </div>
    </div>
  );
};

export default Restaurants;
