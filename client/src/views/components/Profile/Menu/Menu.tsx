import React, { Fragment } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import './Menu.css';

type Props = {
  business: {
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
  };
};

const Business = ({ business }: Props) => {
  const tab = window.location.href.split('#');
  const { menu } = business;
  const { getAccessTokenSilently } = useAuth0();
  const history = useHistory();

  const onClick = async (id: string) => {
    const token = await getAccessTokenSilently({
      audience: process.env.REACT_APP_AUTH0_AUDIENCE,
      scope: 'write:menu',
    });
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    await axios.delete(`${process.env.REACT_APP_API}/api/menu/${id}`, config)
      .then(() => {
        history.push('/profile#menu');
        history.go(0);
      });
  };

  return (
    <div className={`tab-pane fade ${tab[1] === 'menu' && 'show active'}`} id='menu' role='tabpanel' aria-labelledby='menu-tab'>
      <div className='mt-4 mx-2'>
        <a href='/menu/new' className='btn btn-dark'>Add New Menu Item</a>
        <div className='table-responsive mt-3'>
          <table className='table table-sm align-middle'>
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
                  <Fragment key={item._id}>
                    <tr className='text-capitalize'>
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
                        <button type='button' className='btn btn-dark ms-2' onClick={() => onClick(item._id)}>Delete</button>
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={7}>
                        <em>{item.description}</em>
                      </td>
                    </tr>
                  </Fragment>
                ))
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Business;
