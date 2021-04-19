import React from 'react';
import './Reviews.css';

type Props = {
  children: React.ReactElement | null;
  business: {
    reviews: Array<{
      _id: string;
      rating: number;
      comment: string;
    }>
  };
};

const Reviews = ({ children, business: { reviews } }: Props) => {
  const colOne = [];
  const colTwo = [];
  for (let i = 0; i < reviews.length; i += 1) {
    if (i % 2 === 0) {
      colOne.push(reviews[i]);
    } else {
      colTwo.push(reviews[i]);
    }
  }
  const tab = window.location.href.split('#');

  return (
    <div className={`tab-pane fade ${tab[1] === 'reviews' && 'show active'}`} id='reviews' role='tabpanel' aria-labelledby='reviews-tab'>
      {children}
      <div className='row pb-3 border-top'>
        {
          reviews.length > 0 ? (
            <>
              <div className='col-6'>
                {
                  colOne.length > 0 && colOne.map((item) => (
                    <div key={item._id} className='card border-bottom'>
                      <div className='card-body'>
                        <h5 className='card-title'>
                          <p className='starability-result' data-rating={item.rating}>
                            Rated:&nbsp;
                            {item.rating}
                            &nbsp;star
                          </p>
                        </h5>
                        <p className='card-text'>
                          {item.comment}
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
                        <h5 className='card-title'>
                          <p className='starability-result' data-rating={item.rating}>
                            Rated:&nbsp;
                            {item.rating}
                            &nbsp;star
                          </p>
                        </h5>
                        <p className='card-text'>
                          {item.comment}
                        </p>
                      </div>
                    </div>
                  ))
                }
              </div>
            </>
          ) : (
            <div className='mt-5 text-center'>
              There are no reviews.
            </div>
          )
        }
      </div>
    </div>
  );
};

export default Reviews;
