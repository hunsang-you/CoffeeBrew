import { useState } from 'react';
import tw from 'tailwind-styled-components';
import SelectCard from './SelectCard';

import photo1 from '../../assets/servey/1/STARBUCKS.png';
import photo2 from '../../assets/servey/1/A TWOSOME PLACE_W.png';
import photo3 from '../../assets/servey/1/CAFFE PASCUCCI.png';
import photo4 from '../../assets/servey/1/EDIYA.png';
import photo5 from '../../assets/servey/1/COFFEE.jpg';

interface datatype {}

const Servey2 = () => {
  const five: number[] = [0, 1, 2, 3, 4];
  const cafe: number[] = [0, 1, 2, 3, 4];
  const cafeimg: string[] = [photo1, photo2, photo3, photo4, photo5];
  const cafereason: number[] = [0, 1, 2, 3, 4];

  return (
    <OutDiv>
      <CardTitle>어떤 카페를 많이 가세요?</CardTitle>
      <Card>
        {cafe.map((i: number) => {
          return <SelectCard key={i} i={i} />;
        })}
      </Card>
      <CardTitle>위에서 선택한 이유가 무엇인가요?</CardTitle>
      <Card>
        {cafereason.map((i: number) => {
          return <SelectCard key={i} i={i} />;
        })}
      </Card>
      <ButDiv>
        <SerButton>이전</SerButton>
        <SerButton>다음</SerButton>
      </ButDiv>
    </OutDiv>
  );
};

export default Servey2;

const OutDiv = tw.div`w-full flex flex-col justify-center items-center my-1/10`;
const CardTitle = tw.div`text-6xl font-bold flex justify-center my-10`;
const Card = tw.div`flex mx-1/10`;
const ButDiv = tw.div`w-full flex justify-between my-10`;
const SerButton = tw.button`text-7xl border border-mainOrige py-3 px-5 rounded-lg`;
