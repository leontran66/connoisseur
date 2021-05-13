import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import './Reviews.css';

type Props = {
  children: React.ReactElement | null;
  business: {
    reviews: Array<{
      _id: string;
      user: string;
      rating: number;
      comment: string;
    }>
  };
};

type Params = {
  id: string;
};

const Reviews = ({ children, business: { reviews } }: Props) => {
  const { isAuthenticated, user, getAccessTokenSilently } = useAuth0();
  const history = useHistory();
  const { id } = useParams<Params>();
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

  const onClick = async (reviewID: string) => {
    const token = await getAccessTokenSilently({
      audience: process.env.REACT_APP_AUTH0_AUDIENCE,
      scope: 'write:reviews',
    });
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    await axios.delete(`${process.env.REACT_APP_API_LOCAL}/api/review/${reviewID}`, config)
      .then(() => {
        history.push(`/restaurants/${id}#reviews`);
        history.go(0);
      });
  };

  return (
    <div className={`tab-pane fade ${tab[1] === 'reviews' && 'show active'}`} id='reviews' role='tabpanel' aria-labelledby='reviews-tab'>
      {isAuthenticated && !reviews.some((review) => review.user === user.sub) && children}
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
                        {
                          isAuthenticated && item.user === user.sub
                          && (
                          <p className='card-text'>
                            <button type='button' className='btn btn-danger' onClick={() => onClick(item._id)}>Delete Review</button>
                          </p>
                          )
                        }
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
                        {
                          isAuthenticated && item.user === user.sub
                          && (
                          <p className='card-text'>
                            <button type='button' className='btn btn-danger' onClick={() => onClick(item._id)}>Delete Review</button>
                          </p>
                          )
                        }
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
