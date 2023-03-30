import { useState } from 'react';
import tw from 'tailwind-styled-components';
import SelectCard from './SelectCard';

type objtype = {
  title: string;
  img?: string;
};

const Servey8 = () => {
  const qweqw: objtype[] = [
    { title: '나무의 우디한 향' },
    { title: '감귤의 시트러스 향' },
    { title: '허브 향' },
    { title: '꽃향' },
    { title: '달달한 향' },
  ];

  return (
    <OutDiv>
      <CardTitle>연령대</CardTitle>
      <Card>
        {qweqw.map((data: objtype, idx) => {
          return <SelectCard key={idx} data={data} />;
        })}
      </Card>
    </OutDiv>
  );
};

export default Servey8;

const OutDiv = tw.div`w-full flex flex-col justify-center items-center`;
const CardTitle = tw.div`text-5xl font-bold flex justify-center my-10`;
const Card = tw.div`w-full flex justify-center items-center`;
