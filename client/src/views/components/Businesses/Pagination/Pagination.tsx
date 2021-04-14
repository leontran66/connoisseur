import React from 'react';
import { useLocation } from 'react-router-dom';
import './Pagination.css';

type Props = {
  pages: number;
}

const Pagination = ({ pages }: Props) => {
  const query = new URLSearchParams(useLocation().search);
  const search = query.get('search_query');
  let currentPage = 1;
  if (query.get('page')) {
    currentPage = parseInt(query.get('page')!, 10);
  }
  const pageArray = [];
  for (let i = 0; i < pages; i += 1) {
    if (i >= 5) {
      break;
    }
    if (currentPage <= 3) {
      pageArray.push(i + 1);
    } else if (currentPage >= pages - 2) {
      pageArray.push(pages - (4 - i));
    } else {
      pageArray.push(currentPage + (i - 2));
    }
  }

  return (
    <nav aria-label='Businesses pagination'>
      <ul className='pagination justify-content-center mt-3 pb-3'>
        <li className={`page-item ${currentPage <= 1 && 'disabled'}`}>
          <a
            className='page-link'
            href={
              search
                ? `/restaurants?search_query=${search}&page=${currentPage - 1}`
                : `/restaurants?page=${currentPage - 1}`
            }
            aria-label='Previous'
          >
            <span aria-hidden='true'>&laquo;</span>
          </a>
        </li>
        {
          pageArray.map((page) => (
            <li key={page} className={`page-item ${page === currentPage && 'active'}`}>
              <a
                className='page-link'
                href={
                search
                  ? `restaurants?search_query=${search}&page=${page}`
                  : `restaurants?page=${page}`
                }
              >
                {page}
              </a>
            </li>
          ))
        }
        <li className={`page-item ${currentPage >= pages && 'disabled'}`}>
          <a
            className='page-link'
            href={
              search
                ? `/restaurants?search_query=${search}&page=${currentPage + 1}`
                : `/restaurants?page=${currentPage + 1}`
            }
            aria-label='Next'
          >
            <span aria-hidden='true'>&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
