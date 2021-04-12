import React from 'react';
import './Reviews.css';

type Props = {
  children: React.ReactNode
}

const Reviews = ({ children }: Props) => (
  <div className='tab-pane fade' id='reviews' role='tabpanel' aria-labelledby='reviews-tab'>
    {children}
    <div className='row pb-3 border-top'>
      <div className='col-6'>
        <div className='card border-bottom'>
          <div className='card-body'>
            <h5 className='card-title'>
              <p className='starability-result' data-rating='3'>
                Rated: 3 star
              </p>
            </h5>
            <p className='card-text'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec placerat tortor tortor.
            </p>
          </div>
        </div>
        <div className='card border-bottom'>
          <div className='card-body'>
            <h5 className='card-title'>
              <p className='starability-result' data-rating='3'>
                Rated: 3 star
              </p>
            </h5>
            <p className='card-text'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec placerat tortor tortor.
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec placerat tortor tortor.
            </p>
          </div>
        </div>
        <div className='card border-bottom'>
          <div className='card-body'>
            <h5 className='card-title'>
              <p className='starability-result' data-rating='3'>
                Rated: 3 star
              </p>
            </h5>
            <p className='card-text'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec placerat tortor tortor.
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec placerat tortor tortor.
            </p>
          </div>
        </div>
        <div className='card border-bottom'>
          <div className='card-body'>
            <h5 className='card-title'>
              <p className='starability-result' data-rating='3'>
                Rated: 3 star
              </p>
            </h5>
            <p className='card-text'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec placerat tortor tortor.
            </p>
          </div>
        </div>
      </div>
      <div className='col-6'>
        <div className='card border-bottom'>
          <div className='card-body'>
            <h5 className='card-title'>
              <p className='starability-result' data-rating='3'>
                Rated: 3 star
              </p>
            </h5>
            <p className='card-text'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec placerat tortor tortor.
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec placerat tortor tortor.
            </p>
          </div>
        </div>
        <div className='card border-bottom'>
          <div className='card-body'>
            <h5 className='card-title'>
              <p className='starability-result' data-rating='3'>
                Rated: 3 star
              </p>
            </h5>
            <p className='card-text'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec placerat tortor tortor.
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec placerat tortor tortor.
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec placerat tortor tortor.
            </p>
          </div>
        </div>
        <div className='card border-bottom'>
          <div className='card-body'>
            <h5 className='card-title'>
              <p className='starability-result' data-rating='3'>
                Rated: 3 star
              </p>
            </h5>
            <p className='card-text'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec placerat tortor tortor.
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec placerat tortor tortor.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Reviews;
