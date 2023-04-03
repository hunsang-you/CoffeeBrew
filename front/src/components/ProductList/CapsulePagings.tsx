import Pagination from 'react-js-pagination';
import { useState } from 'react';
import './Paging.css';
import { CapsuleResponseType } from './CapsuleList';
import { listAPI } from '../../api/api';

interface PropsTypes {
  pagination: CapsuleResponseType;
  setPagination: React.Dispatch<
    React.SetStateAction<CapsuleResponseType | null>
  >;
  setWords: React.Dispatch<React.SetStateAction<Array<string>>>;
  words: string[];
}

const CapsulePaging = ({
  pagination,
  setPagination,
  setWords,
  words,
}: PropsTypes) => {
  const handlePageChange = (page: number) => {
    const getPages = async (words: string[]) => {
      await listAPI
        .getCapsules(...words)
        .then((request) => {
          setPagination(request.data.value);
          console.log(request.data.value);
        })
        .catch((e) => console.log(e));
    };
    setWords((prevWords) => {
      const newWords = [`page=${page - 1}`, ...prevWords.slice(1)];
      getPages(newWords);
      console.log(newWords);
      return newWords;
    });
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

export default CapsulePaging;
