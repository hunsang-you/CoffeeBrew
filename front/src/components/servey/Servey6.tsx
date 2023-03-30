import { useState } from 'react';
import tw from 'tailwind-styled-components';
import SelectCard from './SelectCard';

import fruittart from '../../assets/servey/3/Fruit Tart.jpg';
import chocolatecake from '../../assets/servey/3/Chocolate Cake.jpg';
import walnutpie from '../../assets/servey/3/Walnut Pie.jpg';

type objtype = {
  title: string;
  img?: string;
};

const Servey6 = () => {
  const reason: objtype[] = [
    { title: '과일타르트', img: fruittart },
    { title: '초코케이크', img: chocolatecake },
    { title: '호두파이', img: walnutpie },
  ];

  return (
    <OutDiv>
      <CardTitle>어떤 디저트를 좋아하시나요?</CardTitle>
      <Card>
        {reason.map((data: objtype, idx) => {
          return <SelectCard key={idx} data={data} />;
        })}
      </Card>
    </OutDiv>
  );
};

export default Servey6;

const OutDiv = tw.div`w-full flex flex-col justify-center items-center`;
const CardTitle = tw.div`text-5xl font-bold flex justify-center my-10`;
const Card = tw.div`w-full flex justify-center items-center`;
