import { useState } from 'react';
import tw from 'tailwind-styled-components';
import SelectCard from './SelectCard';

import woody from '../../assets/servey/8/woody.jpg';
import cidrus from '../../assets/servey/8/cidrus.jpg';
import herb from '../../assets/servey/8/herb.jpg';
import flower from '../../assets/servey/8/flower.jpg';
import honey from '../../assets/servey/8/honey.jpg';

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
    { id: 7, idx: 1, title: '우디', img: woody },
    { id: 7, idx: 2, title: '시트러스', img: cidrus },
    { id: 7, idx: 3, title: '허브', img: herb },
    { id: 7, idx: 4, title: '꽃', img: flower },
    { id: 7, idx: 5, title: '달달한 꿀', img: honey },
  ];

  return (
    <OutDiv>
      <CardTitle>좋아하는 향이 무엇인가요</CardTitle>
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
