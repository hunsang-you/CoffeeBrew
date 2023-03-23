import * as S from '../components/useageStyle';
import { Route, Routes } from 'react-router-dom';
import { CoffeeHis, CoffeeMap, CoffeeWord } from './info/index';

const Info = () => {
  return (
    <S.ContentContainer>
      <Routes>
        <Route path="" element={<CoffeeHis />} />
        <Route path="map" element={<CoffeeMap />} />
        <Route path="word" element={<CoffeeWord />} />
      </Routes>
    </S.ContentContainer>
  );
};

export default Info;
