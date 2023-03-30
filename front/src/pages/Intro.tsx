import * as S from '../components/useageStyle';
import { useEffect } from 'react';
import { Fireworks } from '@fireworks-js/react';
import { detailAPI } from '../api/api';
import fire from '../assets/fireworks2.jpg';

interface IsFooterType {
  setIsFooter: React.Dispatch<React.SetStateAction<boolean>>;
}

const Intro = ({ setIsFooter }: IsFooterType) => {
  useEffect(() => {
    setIsFooter(true);
  }, [setIsFooter]);
  useEffect(() => {
    detailAPI
      .getBean(1)
      .then((request) => {
        console.log(request.data);
      })
      .catch((err) => console.log(err));
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
