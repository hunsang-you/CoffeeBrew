import tw from 'tailwind-styled-components';
import { useState } from 'react';
import Aroma from '../../components/info/Aroma';
import Taste from '../../components/info/Taste';
import Beans from '../../components/info/Beans';
import BodyGam from '../../components/info/BodyGam';
import Basic from '../../components/info/Basic';
import Roasting from '../../components/info/Roasting';

const CoffeeWord = () => {
  const [showComp, setShowComp] = useState('향');
  return (
    <Container>
      <div className="w-1000 ">
        {showComp === '향' && <Aroma />}
        {showComp === '맛' && <Taste />}
        {showComp === '원두' && <Beans />}
        {showComp === '바디감' && <BodyGam />}
        {showComp === '기본' && <Basic />}
        {showComp === '로스팅' && <Roasting />}
      </div>
      <div>
        <div className="fixed border-solid border-fotColor border-1 rounded-3xl flex flex-col cursor-default select-none p-5 mt-infoCustom bg-lightgray">
          <Choose
            className={`${showComp === '향' ? 'bg-red-400' : null}`}
            onClick={() => {
              setShowComp('향');
            }}
          >
            향 기
          </Choose>
          <Choose
            className={`${showComp === '맛' ? 'bg-orange-400' : null}`}
            onClick={() => {
              setShowComp('맛');
            }}
          >
            맛
          </Choose>
          <Choose
            className={`${showComp === '원두' ? 'bg-yellow-400' : null}`}
            onClick={() => {
              setShowComp('원두');
            }}
          >
            에스프레소
          </Choose>
          <Choose
            className={`${showComp === '바디감' ? 'bg-emerald-400' : null}`}
            onClick={() => {
              setShowComp('바디감');
            }}
          >
            바 디 감
          </Choose>
          <Choose
            className={`${showComp === '기본' ? 'bg-lime-300' : null}`}
            onClick={() => {
              setShowComp('기본');
            }}
          >
            원 두
          </Choose>
          <Choose
            className={`${showComp === '로스팅' ? 'bg-amber-700' : null}`}
            onClick={() => {
              setShowComp('로스팅');
            }}
          >
            로 스 팅
          </Choose>
        </div>
      </div>
    </Container>
  );
};
const Container = tw.div`flex flex-row m-12`;
const Choose = tw.div`border-1 rounded-2xl text-center px-4 my-2 font-bold text-mainColorBrown`;

export default CoffeeWord;
