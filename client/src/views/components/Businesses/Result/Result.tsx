import React from 'react';
import NoImage from '../../../../images/no-image.png';
import './Result.css';

type Props = {
  business: {
    _id: string;
    name: string;
    phone: string;
    fax: string;
    streetAddress: string;
    suburb: string;
    state: string;
    postCode: string;
    reviews: Array<{
      rating: number;
    }>;
  };
};

const Result = ({
  business: {
    _id, name, phone, fax, streetAddress, suburb, state, postCode, reviews,
  },
}: Props) => {
  let rating = 0;
  if (reviews.length > 0) {
    reviews.forEach((review) => {
      rating += review.rating;
    });
    rating /= reviews.length;
  }

  return (
    <div className='result card'>
      <div className='card-body border-bottom'>
        <img src={NoImage} className='card-img-top' alt='Teriyaki Tokyo' />
        <div className='card-text text-capitalize'>
          <h4 className='card-title'>
            <a href={`/restaurants/${_id}`} className='card-link'>{name}</a>
            <span>
              {rating}
              &nbsp;
              <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='#f5bd23' className='bi bi-star-fill' viewBox='0 0 16 16'>
                <path d='M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256' />
              </svg>
              &nbsp;
              <i className='num-reviews'>
                (
                {reviews.length}
                )
              </i>
            </span>
          </h4>
          <p className='mb-1'>
            <b>Address:&nbsp;</b>
            <br />
            {
              streetAddress
                ? (
                  <>
                    {streetAddress}
                    <br />
                    {suburb}
                    ,&nbsp;
                    {state}
                    ,&nbsp;
                    {postCode}
                  </>
                ) : (
                  <>
                    N/A
                  </>
                )
            }
          </p>
          <p className='mb-1'>
            <b>Phone:&nbsp;</b>
            {phone}
          </p>
          <p>
            <b>Fax:&nbsp;</b>
            {fax}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Result;
