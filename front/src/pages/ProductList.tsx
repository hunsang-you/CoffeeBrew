import * as S from '../components/useageStyle';
import { Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import AllList from '../components/ProductList/AllList';
import CapsuleList from '../components/ProductList/CapsuleList';

interface IsFooterType {
  setIsFooter: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProductList = ({ setIsFooter }: IsFooterType) => {
  useEffect(() => {
    setIsFooter(true);
  }, [setIsFooter]);
  return (
    <S.ContentContainer>
      <Routes>
        <Route path="bean" element={<AllList />} />
        <Route path="capsule" element={<CapsuleList />} />
      </Routes>
    </S.ContentContainer>
  );
};

export default ProductList;
