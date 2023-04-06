import * as S from '../components/useageStyle';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import MyProfile from '../components/Mypage/MyProfile';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

interface IsFooterType {
  setIsFooter: React.Dispatch<React.SetStateAction<boolean>>;
}

const MyPage = ({ setIsFooter }: IsFooterType) => {
  const reduxData = useSelector((state: RootState) => state);
  const navigate = useNavigate();
  useEffect(() => {
    setIsFooter(true);
  }, [setIsFooter]);
  useEffect(() => {
    if (!reduxData.login) {
      alert('로그인이 필요한 페이지입니다.');
      navigate('/');
    }
  });
  return (
    <S.ContentContainer>
      <Routes>
        <Route path="" element={<MyProfile />} />
      </Routes>
    </S.ContentContainer>
  );
};

export default MyPage;
