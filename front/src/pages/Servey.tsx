import * as S from '../components/useageStyle';
import { useState, useEffect } from 'react';
import { Servey1, Servey2, Servey3, Servey4 } from '../components/servey';

interface IsFooterType {
  setIsFooter: React.Dispatch<React.SetStateAction<boolean>>;
}

const Survey = ({ setIsFooter }: IsFooterType) => {
  const [page, setPage] = useState<number>(1);
  const [select, setSelect] = useState<number[]>([
    -1, -1, -1, -1, -1, -1, -1, -1,
  ]);

  useEffect(() => {
    setIsFooter(true);
  }, [setIsFooter]);
  return (
    <S.ContentContainer>
      <Servey2 />
    </S.ContentContainer>
  );
};

export default Survey;
