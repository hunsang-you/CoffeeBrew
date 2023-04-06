import DetailBean from '../components/Detail/DetailBean';
import DetailCapsule from '../components/detailcapsule/DetailCapsule';
import { Route, Routes } from 'react-router-dom';
import * as S from '../components/useageStyle';
import { useEffect } from 'react';

interface IsFooterType {
  setIsFooter: React.Dispatch<React.SetStateAction<boolean>>;
}

const Detail = ({ setIsFooter }: IsFooterType) => {
  useEffect(() => {
    setIsFooter(true);
  }, [setIsFooter]);
  return (
    <S.ContentContainer>
      <Routes>
        <Route path="/bean/:beanId" element={<DetailBean />} />
        <Route path="/capsule/:capsuleId" element={<DetailCapsule />} />
      </Routes>
    </S.ContentContainer>
  );
};

export default Detail;
