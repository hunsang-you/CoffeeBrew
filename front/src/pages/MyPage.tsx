import * as S from '../components/useageStyle';
import { useEffect } from 'react';
import MyProfile from '../components/Mypage/MyPage';

interface IsFooterType {
  setIsFooter: React.Dispatch<React.SetStateAction<boolean>>;
}

const MyPage = ({ setIsFooter }: IsFooterType) => {
  useEffect(() => {
    setIsFooter(true);
  }, [setIsFooter]);
  return (
    <S.ContentContainer>
      <MyProfile />
    </S.ContentContainer>
  );
};

export default MyPage;
