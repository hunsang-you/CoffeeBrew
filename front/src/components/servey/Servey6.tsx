import { useState } from 'react';
import tw from 'tailwind-styled-components';
import SelectCard from './SelectCard';

import fruittart from '../../assets/servey/6/Fruit Tart.jpg';
import chocolatecake from '../../assets/servey/6/Chocolate Cake.jpg';
import walnutpie from '../../assets/servey/6/Walnut Pie.jpg';

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

const Servey6 = ({ page, setPage, select, setSelect }: PropsType) => {
  const reason: objtype[] = [
    { id: 5, idx: 1, title: '과일타르트', img: fruittart },
    { id: 5, idx: 2, title: '초코케이크', img: chocolatecake },
    { id: 5, idx: 3, title: '호두파이', img: walnutpie },
  ];

  return (
    <OutDiv>
      <CardTitle>어떤 디저트를 좋아하시나요?</CardTitle>
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

export default Servey6;

const OutDiv = tw.div`w-full flex flex-col justify-center items-center`;
const CardTitle = tw.div`text-5xl font-bold flex justify-center my-10`;
const Card = tw.div`w-full flex justify-center items-center`;
