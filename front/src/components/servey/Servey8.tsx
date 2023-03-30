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
  select: number[];
  setSelect: React.Dispatch<React.SetStateAction<number[]>>;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

const Servey8 = ({ page, setPage, select, setSelect }: PropsType) => {
  const qweqw: objtype[] = [
    { id: 7, idx: 1, title: '나무의 우디한 향' },
    { id: 7, idx: 2, title: '감귤의 시트러스 향' },
    { id: 7, idx: 3, title: '허브 향' },
    { id: 7, idx: 4, title: '꽃향' },
    { id: 7, idx: 5, title: '달달한 향' },
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

export default Servey8;

const OutDiv = tw.div`w-full flex flex-col justify-center items-center`;
const CardTitle = tw.div`text-5xl font-bold flex justify-center my-10`;
const Card = tw.div`w-full flex justify-center items-center`;
