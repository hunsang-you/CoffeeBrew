import Pagination from 'react-js-pagination';
import { useState } from 'react';
import './Paging.css';

const Paging = () => {
  const [page, setPage] = useState(1);
  const handlePageChange = (page: number) => {
    setPage(page);
    console.log(page);
  };
  return (
    <Pagination
      activePage={page}
      itemsCountPerPage={10}
      totalItemsCount={450}
      pageRangeDisplayed={5}
      prevPageText={'‹'}
      nextPageText={'›'}
      onChange={handlePageChange}
    />
  );
};

export default Paging;
