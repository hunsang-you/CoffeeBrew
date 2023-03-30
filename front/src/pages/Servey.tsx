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
  const [page, setPage] = useState<number>(2);
  const [select, setSelect] = useState<number[]>([
    -1, -1, -1, -1, -1, -1, -1, -1,
  ]);

  const before = () => {
    if (1 < page && page <= 8) {
      setPage(page - 1);
    }
  };
  const after = () => {
    if (1 <= page && page < 8) {
      setPage(page + 1);
    }
  };

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
        <SerButton
          onClick={() => {
            after();
          }}
        >
          다음
        </SerButton>
      </ButDiv>
      {page === 1 ? (
        <Servey1 select={select} setSelect={setSelect} />
      ) : page === 2 ? (
        <Servey2 />
      ) : page === 3 ? (
        <Servey3 />
      ) : page === 4 ? (
        <Servey4 />
      ) : page === 5 ? (
        <Servey5 />
      ) : page === 6 ? (
        <Servey6 />
      ) : page === 7 ? (
        <Servey7 />
      ) : page === 8 ? (
        <Servey8 />
      ) : null}
    </S.ContentContainer>
  );
};

export default Survey;

const ButDiv = tw.div`w-full flex justify-between my-10`;
const SerButton = tw.button`text-3xl border mx-5 border-mainOrige py-3 px-5 rounded-lg`;
