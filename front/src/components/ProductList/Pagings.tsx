import Pagination from 'react-js-pagination';
import { useState } from 'react';
import './Paging.css';
import { BeanResponseType } from './AllList';
import { listAPI } from '../../api/api';

interface PropsTypes {
  pagination: BeanResponseType;
  setPagination: React.Dispatch<React.SetStateAction<BeanResponseType | null>>;
}

const Paging = ({ pagination, setPagination }: PropsTypes) => {
  const handlePageChange = (page: number) => {
    const getPages = async () => {
      await listAPI
        .getBeans(`page=${page - 1}`)
        .then((request) => {
          setPagination(request.data.value);
          console.log(request.data.value);
        })
        .catch((e) => console.log(e));
    };
    getPages();
  };
  return (
    <Pagination
      activePage={pagination.number + 1}
      itemsCountPerPage={pagination.size}
      totalItemsCount={pagination?.totalElements}
      pageRangeDisplayed={5}
      prevPageText={'‹'}
      nextPageText={'›'}
      onChange={handlePageChange}
      hideDisabled={true}
    />
  );
};

export default Paging;
