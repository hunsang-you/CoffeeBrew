import * as S from '../components/useageStyle';
import { Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import MyProfile from '../components/Mypage/MyProfile';

interface IsFooterType {
  setIsFooter: React.Dispatch<React.SetStateAction<boolean>>;
}

const MyPage = ({ setIsFooter }: IsFooterType) => {
  useEffect(() => {
    setIsFooter(true);
  }, [setIsFooter]);
  return (
    <S.ContentContainer>
      <Routes>
        <Route path="" element={<MyProfile />} />
      </Routes>
    </S.ContentContainer>
  );
};

export default MyPage;
