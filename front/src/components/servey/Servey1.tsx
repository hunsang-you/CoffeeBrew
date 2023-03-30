import { useState } from 'react';
import tw from 'tailwind-styled-components';
import SelectCard from './SelectCard';

type objtype = {
  title: string;
  img?: string;
};

interface PropsType {
  select: number[];
  setSelect: React.Dispatch<React.SetStateAction<number[]>>;
}

const Servey1 = ({ select, setSelect }: PropsType) => {
  const sex: objtype[] = [{ title: '남자' }, { title: '여자' }];
  console.log(select);
  return (
    <OutDiv>
      <CardTitle
        onClick={() => {
          setSelect([1, 1, 11, 1, 1, 1]);
        }}
      >
        성별
      </CardTitle>
      <Card>
        {sex.map((data: objtype, idx) => {
          return <SelectCard key={idx} data={data} />;
        })}
      </Card>
    </OutDiv>
  );
};

export default Servey1;

const OutDiv = tw.div`w-full flex flex-col justify-center items-center`;
const CardTitle = tw.div`text-5xl font-bold flex justify-center my-10`;
const Card = tw.div`w-full flex justify-center items-center`;
