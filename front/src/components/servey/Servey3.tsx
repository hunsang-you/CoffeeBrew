import { useState } from 'react';
import tw from 'tailwind-styled-components';
import SelectCard from './SelectCard';

import photo1 from '../../assets/servey/2/STARBUCKS.png';
import photo2 from '../../assets/servey/2/A TWOSOME PLACE_W.png';
import photo3 from '../../assets/servey/2/CAFFE PASCUCCI.png';
import photo4 from '../../assets/servey/2/EDIYA.png';
import photo5 from '../../assets/servey/2/COFFEE.jpg';

type objtype = {
  title: string;
  img?: string;
};

const Servey3 = () => {
  const cafeimg: objtype[] = [
    { title: '스타벅스', img: photo1 },
    { title: '투썸플레이스', img: photo2 },
    { title: '파스쿠찌', img: photo3 },
    { title: '이디야', img: photo4 },
    { title: '기타등등', img: photo5 },
  ];

  return (
    <OutDiv>
      <CardTitle>어떤 카페를 많이 가시나요?</CardTitle>
      <Card>
        {cafeimg.map((data: objtype, idx) => {
          return <SelectCard key={idx} data={data} />;
        })}
      </Card>
    </OutDiv>
  );
};

export default Servey3;

const OutDiv = tw.div`w-full flex flex-col justify-center items-center`;
const CardTitle = tw.div`text-5xl font-bold flex justify-center my-10`;
const Card = tw.div`w-full flex justify-center items-center`;
