import tw from 'tailwind-styled-components';
import CardComponent from '../../components/info/Card';
import { useState } from 'react';
import Aroma from '../../components/info/Aroma';
import Taste from '../../components/info/Taste';
import Beans from '../../components/info/Beans';
import BodyGam from '../../components/info/BodyGam';
import Basic from '../../components/info/Basic';

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
      </div>
      <div>
        <div className="fixed border-solid border-fotColor border-1 rounded-3xl flex flex-col cursor-default select-none p-5 mt-infoCustom bg-lightgray">
          <Choose
            onClick={() => {
              setShowComp('향');
            }}
          >
            향 기
          </Choose>
          <Choose
            onClick={() => {
              setShowComp('맛');
            }}
          >
            맛
          </Choose>
          <Choose
            onClick={() => {
              setShowComp('원두');
            }}
          >
            원 두
          </Choose>
          <Choose
            onClick={() => {
              setShowComp('바디감');
            }}
          >
            바 디 감
          </Choose>
          <Choose
            onClick={() => {
              setShowComp('기본');
            }}
          >
            기 본
          </Choose>
        </div>
      </div>
    </Container>
  );
};
const Container = tw.div`flex flex-row m-12`;
const Choose = tw.div`border-1 rounded-2xl text-center px-4 my-2`;

export default CoffeeWord;
