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

const Servey2 = ({ page, setPage, select, setSelect }: PropsType) => {
  const qweqw: objtype[] = [
    { id: 1, idx: 1, title: '10대' },
    { id: 1, idx: 2, title: '20대' },
    { id: 1, idx: 3, title: '30대' },
    { id: 1, idx: 4, title: '40대' },
    { id: 1, idx: 5, title: '50대' },
  ];

  return (
    <OutDiv>
      <CardTitle>연령대</CardTitle>
      <Card>
        {qweqw.map((data: objtype, i) => {
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

export default Servey2;

const OutDiv = tw.div`w-full flex flex-col justify-center items-center`;
const CardTitle = tw.div`text-5xl font-bold flex justify-center my-10`;
const Card = tw.div`w-full flex justify-center items-center`;
