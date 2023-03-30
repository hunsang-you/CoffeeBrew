import * as S from '../components/useageStyle';
import { useEffect } from 'react';
import { Fireworks } from '@fireworks-js/react';
import { detailAPI } from '../api/api';

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
      <p className="text-5xl font-bold text-center mt-12">
        동규님 만들어주세요
      </p>

      <Fireworks
        options={{
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
        }}
      />
    </S.ContentContainer>
  );
};

export default Intro;
