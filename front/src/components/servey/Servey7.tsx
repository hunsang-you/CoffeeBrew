import { useState } from 'react';
import tw from 'tailwind-styled-components';
import SelectCard from './SelectCard';

import apple from '../../assets/servey/7/apple.jpg';
import peachcherry from '../../assets/servey/7/peachcherry.jpg';
import berry from '../../assets/servey/7/berry.jpg';
import orange from '../../assets/servey/7/orange.jpg';
import bananamango from '../../assets/servey/7/bananamango.jpg';

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

const Servey7 = ({ page, setPage, select, setSelect }: PropsType) => {
  const fruit: objtype[] = [
    { id: 6, idx: 1, title: '사과, 배', img: apple },
    { id: 6, idx: 2, title: '체리, 복숭아', img: peachcherry },
    { id: 6, idx: 3, title: '딸기, 블루베리', img: berry },
    { id: 6, idx: 4, title: '오렌지, 레몬', img: orange },
    { id: 6, idx: 5, title: '바나나, 망고', img: bananamango },
  ];

  return (
    <OutDiv>
      <CardTitle>좋아하는 과일이 무엇인가요?</CardTitle>
      <Card>
        {fruit.map((data: objtype, i) => {
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

export default Servey7;

const OutDiv = tw.div`w-full flex flex-col justify-center items-center`;
const CardTitle = tw.div`text-5xl font-bold flex justify-center my-10`;
const Card = tw.div`w-full flex justify-center items-center`;
