import React from 'react';
import './Business.css';

type Props = {
  children: React.ReactElement;
  business: {
    name: string;
    abn: string;
    phone: string;
    fax: string;
    streetAddress: string;
    suburb: string;
    state: string;
    postCode: string;
  }
}

const Business = ({ children, business }: Props) => {
  const tab = window.location.href.split('#');
  const {
    name, abn, phone, fax, streetAddress, suburb, state, postCode,
  } = business;

  return (
    <div className={`tab-pane fade ${tab[1] === 'business' && 'show active'}`} id='business' role='tabpanel' aria-labelledby='business-tab'>
      { business.abn !== '' ? (
        <div className='mt-4 mx-2'>
          <a href='/profile/edit' className='btn btn-dark ms-1'>Edit Business Profile</a>
          <table className='business-details table table-borderless mt-3 text-capitalize'>
            <tbody>
              <tr>
                <th>Name:</th>
                <td>{name}</td>
              </tr>
              <tr>
                <th>ABN:</th>
                <td>{abn}</td>
              </tr>
              <tr>
                <th>Phone:</th>
                <td>{phone}</td>
              </tr>
              <tr>
                <th>Fax:</th>
                <td>{fax}</td>
              </tr>
              <tr>
                <th>Address:</th>
                <td>
                  {streetAddress}
                  <br />
                  {suburb}
                  ,&nbsp;
                  {state}
                  ,&nbsp;
                  {postCode}
                </td>
              </tr>
            </tbody>
          </table>
          <div className='fixed-bottom card text-dark bg-light border-danger'>
            <div className='card-body p-2'>
              <div className='card-text'>
                <p className='d-inline-block m-2'>Delete Business</p>
                <span className='float-end'>
                  <button type='button' className='btn btn-danger' data-bs-toggle='modal' data-bs-target='#deleteBusiness'>Delete</button>
                </span>
              </div>
            </div>
          </div>
          {children}
        </div>
      ) : (
        <div className='mt-4 ms-2'>
          You current do not have a business profile.
          <br />
          <a href='/profile/new' className='btn btn-dark mt-3'>Create Business</a>
        </div>
      )}
    </div>
  );
};

export default Business;
