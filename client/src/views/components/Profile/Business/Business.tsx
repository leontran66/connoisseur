import React from 'react';
import './Business.css';

type Props = {
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

const Business = ({ business }: Props) => {
  const {
    name, abn, phone, fax, streetAddress, suburb, state, postCode,
  } = business;

  return (
    <div className='tab-pane fade' id='business' role='tabpanel' aria-labelledby='business-tab'>
      { business.abn !== '' ? (
        <>
          <a href='/profile/edit' className='btn btn-dark mt-3 ms-2'>Edit Business Profile</a>
          <table className='table table-borderless mt-3 ms-2 text-capitalize'>
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
        </>
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
