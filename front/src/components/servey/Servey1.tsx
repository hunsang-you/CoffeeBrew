import tw from 'tailwind-styled-components';
import SelectCard from './SelectCard';

const Servey1 = () => {
  const cafe = [0, 1, 2, 3, 4];

  return (
    <OutDiv>
      <CardTitle>내가 자주가는 카페는?</CardTitle>
      <Card>
        {cafe.map((i: number) => {
          return <SelectCard i={i} />;
        })}
      </Card>
      <ButDiv>
        <SerButton>이전</SerButton>
        <SerButton>다음</SerButton>
      </ButDiv>
    </OutDiv>
  );
};

export default Servey1;

const OutDiv = tw.div`w-full flex flex-col justify-center items-center my-1/10`;
const CardTitle = tw.div`text-9xl flex justify-center mb-10`;
const Card = tw.div`flex mx-1/10`;
const ButDiv = tw.div`w-full flex justify-between mt-10`;
const SerButton = tw.button`text-7xl border border-mainOrige py-3 px-5 rounded-lg`;
