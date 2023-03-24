import * as S from '../components/useageStyle';
import { useEffect } from 'react';

interface IsFooterType {
  setIsFooter: React.Dispatch<React.SetStateAction<boolean>>;
}

const Intro = ({ setIsFooter }: IsFooterType) => {
  useEffect(() => {
    setIsFooter(true);
  }, [setIsFooter]);
  return <S.ContentContainer>커피브루 소개페이지입니다.</S.ContentContainer>;
};

export default Intro;
