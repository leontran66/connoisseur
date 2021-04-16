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
    menu: Array<{
      _id: string;
      name: string;
      category: string;
      price: number;
      options: Array<string>;
      spicy: boolean;
      vegetarian: boolean;
      description: string;
    }>
  }
}

const Business = ({ children, business }: Props) => {
  const {
    name, abn, phone, fax, streetAddress, suburb, state, postCode, menu,
  } = business;

  return (
    <div className='tab-pane fade' id='business' role='tabpanel' aria-labelledby='business-tab'>
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
          <a href='/menu/new' className='btn btn-dark'>Add New Menu Item</a>
          <table className='table align-middle'>
            <thead>
              <tr>
                <th>Name</th>
                <th>Category</th>
                <th>Options</th>
                <th className='text-center'>Spicy</th>
                <th className='text-center'>Vegetarian</th>
                <th>Price</th>
                <th className='text-center'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {
                menu.map((item) => (
                  <tr key={item._id} className='text-capitalize'>
                    <td>
                      {item.name}
                    </td>
                    <td>
                      {item.category}
                    </td>
                    <td>
                      {item.options}
                    </td>
                    <td className='text-center'>
                      {item.spicy && (
                        <>
                          <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' className='bi bi-check2' viewBox='0 0 16 16'>
                            <path d='M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z' />
                          </svg>
                        </>
                      )}
                    </td>
                    <td className='text-center'>
                      {item.vegetarian && (
                        <>
                          <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' className='bi bi-check2' viewBox='0 0 16 16'>
                            <path d='M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z' />
                          </svg>
                        </>
                      )}
                    </td>
                    <td>
                      $
                      {item.price}
                    </td>
                    <td className='text-center'>
                      <a href={`/menu/${item._id}/edit`} className='btn btn-dark ms-2'>Edit</a>
                      <button type='button' className='btn btn-dark ms-2'>Delete</button>
                    </td>
                  </tr>
                ))
              }
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
