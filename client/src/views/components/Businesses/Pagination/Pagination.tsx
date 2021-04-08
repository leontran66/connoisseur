import React from 'react';
import './Pagination.css';

const Pagination = () => {
  const currentPage = 1;

  return (
    <nav aria-label='Businesses pagination'>
      <ul className='pagination justify-content-center mt-3 pb-3'>
        <li className={`page-item ${currentPage === 1 && 'disabled'}`}>
          <a className='page-link' href={`/businesses?page=${currentPage - 1}`} aria-label='Previous'>
            <span aria-hidden='true'>&laquo;</span>
          </a>
        </li>
        <li className='page-item active'><a className='page-link' href='/businesses?page=1'>1</a></li>
        <li className='page-item'><a className='page-link' href='/businesses?page=2'>2</a></li>
        <li className='page-item'><a className='page-link' href='/businesses?page=3'>3</a></li>
        <li className='page-item'>
          <a className='page-link' href={`/businesses?page=${currentPage + 1}`} aria-label='Next'>
            <span aria-hidden='true'>&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
