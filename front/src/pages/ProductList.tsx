import * as S from '../components/useageStyle';
import { useEffect } from 'react';

interface IsFooterType {
  setIsFooter: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProductList = ({ setIsFooter }: IsFooterType) => {
  useEffect(() => {
    setIsFooter(true);
  }, [setIsFooter]);
  return <S.ContentContainer>상품리스프테이지입니다.</S.ContentContainer>;
};

export default ProductList;
