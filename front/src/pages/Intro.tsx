import * as S from '../components/useageStyle';
import { useEffect } from 'react';
import { Fireworks } from '@fireworks-js/react';
import tw from 'tailwind-styled-components';
import wheel from '../assets/flavotwheel.png';
import infoBg from '../assets/mainImg/infobg.jpg';

interface IsFooterType {
  setIsFooter: React.Dispatch<React.SetStateAction<boolean>>;
}

const Intro = ({ setIsFooter }: IsFooterType) => {
  useEffect(() => {
    setIsFooter(true);
  }, [setIsFooter]);

  return (
    <S.ContentContainer>
      <OutDiv>
        <ImgDiv src={wheel} />
        <InnerDiv>
          <TitleDiv>CoffeeBrew</TitleDiv>
          <TextDiv>
            고객의 취향과 맛 선호도를 기반으로 원두를 추천합니다. 고객이
            선호하는 향, 산도, 당도, 쓴맛, 바디 등의 취향을 파악하여 최적의
            원두를 추천합니다
          </TextDiv>
          <TextDiv>
            우리 사이트에서 추천하는 대표 상품으로는 아라비카 원두, 로부스타
            원두, 페어트레이드 원두 등이 있습니다. 고객님들이 선호하는 취향에
            따라 다양한 상품을 추천해드립니다
          </TextDiv>
        </InnerDiv>
      </OutDiv>
      <Fireworks
        options={{
          particles: 500,
          traceLength: 10,
          friction: 0.99,
          rocketsPoint: {
            min: 50,
            max: 50,
          },
        }}
        style={{
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          position: 'fixed',
          objectFit: 'cover',
          backgroundImage: `url(${infoBg})`,
          zIndex: -1,
        }}
      />
    </S.ContentContainer>
  );
};

export default Intro;

const OutDiv = tw.div`my-auto flex justify-around content-center`;
const InnerDiv = tw.div`flex flex-col justify-center content-center`;
const ImgDiv = tw.img`w-1/2 h-1/2`;
const TitleDiv = tw.div`text-9xl font-extrabold text-center mt-12 text-white `;
const TextDiv = tw.div`text-3xl font-medium text-center mt-12 text-white `;
const UnderDiv = tw.div`text-xl font-medium text-start mt-12 text-white `;
