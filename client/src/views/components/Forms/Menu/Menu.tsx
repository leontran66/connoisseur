import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import Spinner from '../../common/Spinner';
import './Menu.css';

type Props = {
  isNew: boolean;
}

type Params = {
  id: string;
}

const Menu = ({ isNew }: Props) => {
  const { getAccessTokenSilently } = useAuth0();
  const history = useHistory();
  const [dataLoaded, setDataLoaded] = useState(false);
  let id = '';
  if (!isNew) {
    id = useParams<Params>().id;
  }

  useEffect(() => {
    async function getMenu() {
      const token = await getAccessTokenSilently({
        audience: process.env.REACT_APP_AUTH0_AUDIENCE,
        scope: 'read:business',
      });
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      await axios.get(`${process.env.REACT_APP_API_LOCAL}/api/menu/${id}`, config)
        .then((res) => {
          const {
            name, category, price, options, spicy, vegetarian, description,
          } = res.data.menu;
          setFormData({
            ...formData,
            name,
            category,
            price,
            options,
            spicy,
            vegetarian,
            description,
          });
          setDataLoaded(true);
        })
        .catch(() => {
          history.replace('/404');
        });
    }
    if (!isNew) {
      getMenu();
    } else {
      setDataLoaded(true);
    }
  }, [getAccessTokenSilently]);

  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    options: '',
    spicy: false,
    vegetarian: false,
    description: '',
  });

  const {
    name, category, price, options, spicy, vegetarian, description,
  } = formData;

  const goBack = () => {
    history.goBack();
  };

  const onChange = (e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.currentTarget.name]: e.currentTarget.value });
  };

  const onCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    let check = false;
    if (e.currentTarget.checked) {
      check = true;
    }
    setFormData({ ...formData, [e.currentTarget.name]: check });
  };

  const onSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const token = await getAccessTokenSilently({
      audience: process.env.REACT_APP_AUTH0_AUDIENCE,
      scope: 'write:menu',
    });
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const body = {
      name,
      category,
      price,
      options,
      spicy,
      vegetarian,
      description,
    };
    if (!isNew) {
      await axios.patch(`${process.env.REACT_APP_API_LOCAL}/api/menu/${id}`, body, config)
        .then(() => history.push('/profile'))
        .catch((err) => console.log(err.response.data));
    } else {
      await axios.post(`${process.env.REACT_APP_API_LOCAL}/api/menu`, body, config)
        .then(() => history.push('/profile'))
        .catch((err) => console.log(err.response.data));
    }
  };

  return (
    <>
      {
      dataLoaded
        ? (
          <div className='menu-form mx-auto'>
            <h1>Add New Menu Item</h1>
            <form>
              <div className='mb-3'>
                <label htmlFor='name' className='form-label'>Name</label>
                <input type='text' className='form-control' id='name' name='name' value={name} onChange={(e) => onChange(e)} />
              </div>
              <div className='mb-3 row'>
                <div className='col-6'>
                  <label htmlFor='category' className='form-label'>Category</label>
                  <input type='text' className='form-control' id='category' name='category' value={category} onChange={(e) => onChange(e)} />
                </div>
                <div className='col-6'>
                  <label htmlFor='price' className='form-label'>Price</label>
                  <input type='text' className='form-control' id='price' name='price' value={price} onChange={(e) => onChange(e)} />
                </div>
              </div>
              <div className='mb-3'>
                <label htmlFor='options' className='form-label'>Options</label>
                <input type='text' className='form-control' id='options' name='options' aria-describedby='optionsHelp' value={options} onChange={(e) => onChange(e)} />
                <div id='optionsHelp' className='form-text'>Separate each option with a comma, eg. Large, Regular, Small</div>
              </div>
              <div className='mb-3'>
                <div className='form-check form-check-inline'>
                  <input className='form-check-input' type='checkbox' id='spicy' name='spicy' checked={spicy} onChange={(e) => onCheck(e)} />
                  <label className='form-check-label' htmlFor='spicy'>Spicy</label>
                </div>
                <div className='form-check form-check-inline'>
                  <input className='form-check-input' type='checkbox' id='vegetarian' name='vegetarian' checked={vegetarian} onChange={(e) => onCheck(e)} />
                  <label className='form-check-label' htmlFor='vegetarian'>Vegetarian</label>
                </div>
              </div>
              <div className='mb-3'>
                <label htmlFor='description' className='form-label'>Description</label>
                <textarea className='form-control' id='description' name='description' rows={3} value={description} onChange={(e) => onChange(e)} />
              </div>
              <a href='#!' className='btn btn-dark me-2' onClick={() => goBack()}>Cancel</a>
              <button type='submit' className='btn btn-dark' onClick={(e) => onSubmit(e)}>Submit</button>
            </form>
          </div>
        ) : (
          <Spinner />
        )
      }
    </>
  );
};

export default Menu;
