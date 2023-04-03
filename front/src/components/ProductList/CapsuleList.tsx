import tw from 'tailwind-styled-components';
import { useState, useEffect } from 'react';
import CapsuleSearchBar from './CapsuleSearchBar';
import CapsuleListShow from './CapsuleListShow';
import CapsulePaging from './CapsulePagings';
import { listAPI } from '../../api/api';
const AllListBg = tw.div`flex-col bg-background select-none`;

export interface CapsuleResponseType {
  content: CapsuleType[];
  pageable: {
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    offset: number;
    pageNumber: number;
    pageSize: number;
    paged: boolean;
    unpaged: boolean;
  };
  totalPages: number;
  totalElements: number;
  last: boolean;
  size: number;
  number: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  numberOfElements: number;
  first: boolean;
  empty: boolean;
}

export interface CapsuleType {
  idx: number;
  nameKo: string;
  nameEn: string;
  summary: string;
  thumbnail: string | null;
  userGrade: number | null;
}

const CapsuleList = () => {
  const [pagination, setPagination] = useState<CapsuleResponseType | null>(
    null,
  );
  const [words, setWords] = useState<string[]>(['page=0']);
  useEffect(() => {
    const getLists = async () => {
      await listAPI
        .getCapsules(...words)
        .then((request) => {
          console.log(request.data.value);
          setPagination(request.data.value);
        })
        .catch((e) => console.log(e));
    };
    getLists();
  }, []);

  return (
    <AllListBg>
      <CapsuleSearchBar
        pagination={pagination}
        setPagination={setPagination}
        setWords={setWords}
        words={words}
      />
      {pagination ? <CapsuleListShow listDatas={pagination?.content} /> : null}
      {pagination ? (
        <CapsulePaging
          pagination={pagination}
          setPagination={setPagination}
          setWords={setWords}
          words={words}
        />
      ) : null}
    </AllListBg>
  );
};

export default CapsuleList;
