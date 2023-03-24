import * as S from '../components/useageStyle';
import { useEffect } from 'react';

interface IsFooterType {
  setIsFooter: React.Dispatch<React.SetStateAction<boolean>>;
}

const MyPage = ({ setIsFooter }: IsFooterType) => {
  useEffect(() => {
    setIsFooter(true);
  }, [setIsFooter]);
  return <S.ContentContainer>마이페이지입니다.</S.ContentContainer>;
};

export default MyPage;
