import * as S from '../components/useageStyle';
import { useEffect } from 'react';
import {
  Servey1,
  Servey2,
  Servey3,
  Servey4,
  Servey5,
  Servey6,
  Servey7,
  Servey8,
} from '../components/servey';

interface IsFooterType {
  setIsFooter: React.Dispatch<React.SetStateAction<boolean>>;
}

const Survey = ({ setIsFooter }: IsFooterType) => {
  useEffect(() => {
    setIsFooter(true);
  }, [setIsFooter]);
  return (
    <S.ContentContainer>
      <Servey1 />
    </S.ContentContainer>
  );
};

export default Survey;
