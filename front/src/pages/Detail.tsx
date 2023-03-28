import DetailBean from '../components/Detail/DetailBean';

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
        <Route path="" element={<DetailBean />} />
      </Routes>
    </S.ContentContainer>
  );
};

export default Detail;
