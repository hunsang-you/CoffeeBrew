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

const Servey5 = ({ page, setPage, select, setSelect }: PropsType) => {
  const cafeimg: objtype[] = [
    { id: 4, idx: 1, title: '아메리카노' },
    { id: 4, idx: 2, title: '카페라떼' },
    { id: 4, idx: 3, title: '바닐라라떼' },
    { id: 4, idx: 4, title: '티' },
  ];

  return (
    <OutDiv>
      <CardTitle>어떤 음료를 좋아하시나요?</CardTitle>
      <Card>
        {cafeimg.map((data: objtype, i) => {
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

export default Servey5;

const OutDiv = tw.div`w-full flex flex-col justify-center items-center`;
const CardTitle = tw.div`text-5xl font-bold flex justify-center my-10`;
const Card = tw.div`w-full flex justify-center items-center`;
