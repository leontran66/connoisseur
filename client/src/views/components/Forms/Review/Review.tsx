/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { Fragment, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import './Review.css';

type Params = {
  id: string;
};

const Review = () => {
  const { user, getAccessTokenSilently } = useAuth0();
  const history = useHistory();
  const { id } = useParams<Params>();
  const ratings = [1, 2, 3, 4, 5];

  const [formData, setFormData] = useState({
    rating: 0,
    comment: '',
  });

  const { rating, comment } = formData;

  const onChange = (e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.currentTarget.name]: e.currentTarget.value });
  };

  const onSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const token = await getAccessTokenSilently({
      audience: process.env.REACT_APP_AUTH0_AUDIENCE,
      scope: 'write:reviews',
    });
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const body = {
      id,
      user: user && user.sub,
      rating,
      comment,
    };
    await axios.post(`${process.env.REACT_APP_API_LOCAL}/api/review`, body, config)
      .then(() => {
        history.push(`/restaurants/${id}#reviews`);
        history.go(0);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  return (
    <div className='review-form m-3'>
      <form>
        <div className='rating-input'>
          <label htmlFor='rating' className='form-label'>Rating</label>
          <fieldset id='rating' className='starability-grow'>
            <input type='radio' id='rating-0' className='input-no-rate' name='rating' value={0} defaultChecked aria-label='No rating' />
            {
              ratings.map((rate, i) => (
                <Fragment key={rate}>
                  <input type='radio' id={`rating-${i + 1}`} name='rating' value={i + 1} onChange={(e) => onChange(e)} />
                  <label htmlFor={`rating-${i + 1}`}>
                    {i + 1}
                  &nbsp;star
                  </label>
                </Fragment>
              ))
            }
          </fieldset>
        </div>
        <div className='mb-2 review-input'>
          <label htmlFor='comment' className='form-label'>Comment</label>
          <textarea className='form-control' id='comment' name='comment' onChange={(e) => onChange(e)} rows={6} />
        </div>
        <button type='submit' className='btn btn-dark' onClick={(e) => onSubmit(e)}>Submit</button>
      </form>
    </div>
  );
};

export default Review;
