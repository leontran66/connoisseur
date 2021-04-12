/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import './Menu.css';

const Menu = () => {
  const onSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
  };

  return (
    <div className='menu-form m-3'>
      <form>
        <div className='mb-3'>
          <label htmlFor='name' className='form-label'>Name</label>
          <input type='text' className='form-control' id='name' name='name' />
        </div>
        <div className='mb-3 row'>
          <div className='col-6'>
            <label htmlFor='category' className='form-label'>Category</label>
            <input type='text' className='form-control' id='category' name='category' />
          </div>
          <div className='col-6'>
            <label htmlFor='price' className='form-label'>Price</label>
            <input type='text' className='form-control' id='price' name='price' />
          </div>
        </div>
        <div className='mb-3'>
          <label htmlFor='options' className='form-label'>Options</label>
          <input type='text' className='form-control' id='options' name='options' aria-describedby='optionsHelp' />
          <div id='optionsHelp' className='form-text'>Separate each option with a comma, eg. Large, Regular, Small</div>
        </div>
        <div className='mb-3'>
          <div className='form-check form-check-inline'>
            <input className='form-check-input' type='checkbox' id='spicy' value='spicy' />
            <label className='form-check-label' htmlFor='spicy'>Spicy</label>
          </div>
          <div className='form-check form-check-inline'>
            <input className='form-check-input' type='checkbox' id='vegetarian' value='vegetarian' />
            <label className='form-check-label' htmlFor='vegetarian'>Vegetarian</label>
          </div>
        </div>
        <div className='mb-3'>
          <label htmlFor='description' className='form-label'>Description</label>
          <textarea className='form-control' id='description' name='description' rows={3} />
        </div>
        <button type='submit' className='btn btn-dark' onClick={(e) => onSubmit(e)}>Submit</button>
      </form>
    </div>
  );
};

export default Menu;
