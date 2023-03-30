import * as S from '../components/useageStyle';
import { useState, useEffect } from 'react';
import {
  Servey1,
  Servey2,
  Servey3,
  Servey4,
  Servey5,
  Servey6,
  Servey7,
  Servey8,
} from '../components/servey';
import tw from 'tailwind-styled-components';

interface IsFooterType {
  setIsFooter: React.Dispatch<React.SetStateAction<boolean>>;
}

const Survey = ({ setIsFooter }: IsFooterType) => {
  const [page, setPage] = useState<number>(1);
  const [select, setSelect] = useState<number[]>([0, 0, 0, 0, 0, 0, 0, 0]);

  const before = () => {
    if (1 < page && page <= 8) {
      setPage(page - 1);
    }
  };

  useEffect(() => {
    setPage(1);
  }, []);

  useEffect(() => {
    setIsFooter(true);
  }, [setIsFooter]);
  return (
    <S.ContentContainer>
      <ButDiv>
        <SerButton
          onClick={() => {
            before();
          }}
        >
          이전
        </SerButton>
        <SerButton>다음</SerButton>
      </ButDiv>
      {page === 1 ? (
        <Servey1
          page={page}
          setPage={setPage}
          select={select}
          setSelect={setSelect}
        />
      ) : page === 2 ? (
        <Servey2
          page={page}
          setPage={setPage}
          select={select}
          setSelect={setSelect}
        />
      ) : page === 3 ? (
        <Servey3
          page={page}
          setPage={setPage}
          select={select}
          setSelect={setSelect}
        />
      ) : page === 4 ? (
        <Servey4
          page={page}
          setPage={setPage}
          select={select}
          setSelect={setSelect}
        />
      ) : page === 5 ? (
        <Servey5
          page={page}
          setPage={setPage}
          select={select}
          setSelect={setSelect}
        />
      ) : page === 6 ? (
        <Servey6
          page={page}
          setPage={setPage}
          select={select}
          setSelect={setSelect}
        />
      ) : page === 7 ? (
        <Servey7
          page={page}
          setPage={setPage}
          select={select}
          setSelect={setSelect}
        />
      ) : page === 8 ? (
        <Servey8
          page={page}
          setPage={setPage}
          select={select}
          setSelect={setSelect}
        />
      ) : null}
    </S.ContentContainer>
  );
};

export default Survey;

const ButDiv = tw.div`w-full flex justify-between my-10`;
const SerButton = tw.button`text-3xl border mx-5 border-mainOrige py-3 px-5 rounded-lg`;
