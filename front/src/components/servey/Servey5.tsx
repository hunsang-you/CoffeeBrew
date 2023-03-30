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

const Servey5 = () => {
  const cafeimg: objtype[] = [
    { title: '아메리카노' },
    { title: '카페라떼' },
    { title: '바닐라라떼' },
    { title: '티' },
  ];

  return (
    <OutDiv>
      <CardTitle>어떤 음료를 좋아하시나요?</CardTitle>
      <Card>
        {cafeimg.map((data: objtype, idx) => {
          return <SelectCard key={idx} data={data} />;
        })}
      </Card>
    </OutDiv>
  );
};

export default Servey5;

const OutDiv = tw.div`w-full flex flex-col justify-center items-center`;
const CardTitle = tw.div`text-5xl font-bold flex justify-center my-10`;
const Card = tw.div`w-full flex justify-center items-center`;
