import { useState } from 'react';
import tw from 'tailwind-styled-components';
import SelectCard from './SelectCard';

type objtype = {
  id: number;
  idx: number;
  title: string;
  img?: string;
};

interface PropsType {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  select: number[];
  setSelect: React.Dispatch<React.SetStateAction<number[]>>;
}

const Servey4 = ({ page, setPage, select, setSelect }: PropsType) => {
  const reason: objtype[] = [
    { id: 3, idx: 1, title: '향' },
    { id: 3, idx: 2, title: '산미' },
    { id: 3, idx: 3, title: '단맛' },
    { id: 3, idx: 4, title: '쓴맛' },
    { id: 3, idx: 5, title: '목넘김' },
  ];

  return (
    <OutDiv>
      <CardTitle>위에서 선택한 이유가 무엇인가요?</CardTitle>
      <Card>
        {reason.map((data: objtype, i) => {
          return (
            <SelectCard
              key={i}
              data={data}
              page={page}
              setPage={setPage}
              select={select}
              setSelect={setSelect}
            />
          );
        })}
      </Card>
    </OutDiv>
  );
};

export default Servey4;

const OutDiv = tw.div`w-full flex flex-col justify-center items-center`;
const CardTitle = tw.div`text-5xl font-bold flex justify-center my-10`;
const Card = tw.div`w-full flex justify-center items-center`;
