import * as S from '../components/useageStyle';
import { useEffect } from 'react';
import AllList from '../components/ProductList/AllList';

interface IsFooterType {
  setIsFooter: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProductList = ({ setIsFooter }: IsFooterType) => {
  useEffect(() => {
    setIsFooter(true);
  }, [setIsFooter]);
  return (
    <S.ContentContainer>
      <AllList />
    </S.ContentContainer>
  );
};

export default ProductList;
