import * as S from '../components/useageStyle';
import { useEffect } from 'react';
import { Fireworks } from '@fireworks-js/react';
import fire from '../assets/fireworks2.jpg';

interface IsFooterType {
  setIsFooter: React.Dispatch<React.SetStateAction<boolean>>;
}

const Intro = ({ setIsFooter }: IsFooterType) => {
  const array2 = ['keywords=케냐', 'keywords=몰루'];
  useEffect(() => {
    setIsFooter(true);
  }, [setIsFooter]);
  useEffect(() => {
    console.log(...array2);
  }, []);
  return (
    <S.ContentContainer>
      <div className="text-5xl font-bold text-center mt-12 text-white z-50">
        동규님 해주세요 ㅠ.ㅠ
      </div>
      <Fireworks
        options={{
          particles: 200,
          traceLength: 5,
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
          backgroundImage: `url(${fire})`,
          zIndex: -1,
        }}
      />
    </S.ContentContainer>
  );
};

export default Intro;
