import { useState } from 'react';
import tw from 'tailwind-styled-components';
import SelectCard from './SelectCard';

import photo1 from '../../assets/servey/3/STARBUCKS.png';
import photo2 from '../../assets/servey/3/A TWOSOME PLACE_W.png';
import photo3 from '../../assets/servey/3/CAFFE PASCUCCI.png';
import photo4 from '../../assets/servey/3/EDIYA.png';
import photo5 from '../../assets/servey/3/COFFEE.jpg';

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

const Servey3 = ({ page, setPage, select, setSelect }: PropsType) => {
  const cafeimg: objtype[] = [
    { id: 2, idx: 1, title: '스타벅스', img: photo1 },
    { id: 2, idx: 2, title: '투썸플레이스', img: photo2 },
    { id: 2, idx: 3, title: '파스쿠찌', img: photo3 },
    { id: 2, idx: 4, title: '이디야', img: photo4 },
    { id: 2, idx: 5, title: '기타등등', img: photo5 },
  ];

  return (
    <OutDiv>
      <CardTitle>어떤 카페를 많이 가시나요?</CardTitle>
      <Card>
        {cafeimg.map((data: objtype, i) => {
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

export default Servey3;

const OutDiv = tw.div`w-full flex flex-col justify-center items-center`;
const CardTitle = tw.div`text-5xl font-bold flex justify-center my-10`;
const Card = tw.div`w-full flex justify-center items-center`;
