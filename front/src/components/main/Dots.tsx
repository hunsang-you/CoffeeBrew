import tw from 'tailwind-styled-components';

interface DotPrope {
  num: number;
  scrollIndex: number;
}

interface DotsProps {
  scrollIndex: number;
  pushIndex: (N: number) => void;
}

const Dot = ({ num, scrollIndex }: DotPrope) => {
  return <div>{num === scrollIndex ? <DotDivOringe /> : <DotDivW />}</div>;
};

const Dots = ({ scrollIndex, pushIndex }: DotsProps) => {
  return (
    <DotsDiv>
      <DotsInner>
        <div
          onClick={() => {
            pushIndex(1);
          }}
        >
          <Dot num={1} scrollIndex={scrollIndex} />
        </div>
        <div
          onClick={() => {
            pushIndex(2);
          }}
        >
          <Dot num={2} scrollIndex={scrollIndex} />
        </div>
        <div
          onClick={() => {
            pushIndex(3);
          }}
        >
          <Dot num={3} scrollIndex={scrollIndex} />
        </div>
      </DotsInner>
    </DotsDiv>
  );
};

export default Dots;

const DotDivOringe = tw.div`w-16 h-4 mx-1 border-solid rounded-full duration-1000 bg-mainOrige	`;
const DotDivW = tw.div`w-4 h-4 mx-1 border-solid rounded-full duration-1000 bg-white`;
const DotsDiv = tw.div`fixed left-47 top-1/10 z-30`;
const DotsInner = tw.div`flex justify-between items-center w-2.5 h-2.5`;
