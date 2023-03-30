import { useState } from 'react';
import tw from 'tailwind-styled-components';
import SelectCard from './SelectCard';

type objtype = {
  title: string;
  img?: string;
};

const Servey7 = () => {
  const sex: objtype[] = [
    { title: '사과, 배' },
    { title: '체리, 복숭아' },
    { title: '딸기, 블루베리' },
    { title: '오렌지, 레몬' },
    { title: '망고, 바나나' },
  ];

  return (
    <OutDiv>
      <CardTitle>성별</CardTitle>
      <Card>
        {sex.map((data: objtype, idx) => {
          return <SelectCard key={idx} data={data} />;
        })}
      </Card>
    </OutDiv>
  );
};

export default Servey7;

const OutDiv = tw.div`w-full flex flex-col justify-center items-center`;
const CardTitle = tw.div`text-5xl font-bold flex justify-center my-10`;
const Card = tw.div`w-full flex justify-center items-center`;
