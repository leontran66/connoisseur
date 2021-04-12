/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { Fragment } from 'react';
import './Review.css';

const Review = () => {
  const onSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
  };

  const ratings = [1, 2, 3, 4, 5];

  return (
    <div className='review-form m-3'>
      <form>
        <div className='rating-input'>
          <label htmlFor='rating' className='form-label'>Rating</label>
          <fieldset id='rating' className='starability-grow'>
            <input type='radio' id='rating-0' className='input-no-rate' name='rating' value={0} defaultChecked aria-label='No rating' />
            {
              ratings.map((rating, i) => (
                <Fragment key={rating}>
                  <input type='radio' id={`rating-${i + 1}`} name='rating' value={i + 1} />
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
          <label htmlFor='review' className='form-label'>Review</label>
          <textarea className='form-control' id='review' name='review' rows={6} />
        </div>
        <button type='submit' className='btn btn-dark' onClick={(e) => onSubmit(e)}>Submit</button>
      </form>
    </div>
  );
};

export default Review;
