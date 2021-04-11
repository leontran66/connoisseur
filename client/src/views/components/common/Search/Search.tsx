import React from 'react';

const Search = () => (
  <div className='search pt-3 mb-3'>
    <form method='GET' action='/restaurants'>
      <div className='input-group'>
        <input type='text' className='form-control' id='search_query' name='search_query' placeholder='Search' />
        <input type='hidden' className='form-control' id='page' name='page' value={1} />
        <button type='submit' className='btn btn-dark'>
          <svg xmlns='http://www.w3.org/2000/svg' width='80' height='16' fill='currentColor' className='bi bi-search search-button' viewBox='0 0 16 16'>
            <path d='M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z' />
          </svg>
        </button>
      </div>
    </form>
  </div>
);

export default Search;
