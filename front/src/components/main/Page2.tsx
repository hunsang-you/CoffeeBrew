import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import tw from 'tailwind-styled-components';
import Page2Carousel from './Page2Carousel';
import Page2Non from './Page2Non';

const Page2 = () => {
  const reduxData = useSelector((state: RootState) => state);

  return (
    <Inner>
      <CarouselDiv>
        {reduxData.login ? <Page2Carousel /> : <Page2Non />}
      </CarouselDiv>
    </Inner>
  );
};

export default Page2;

const Inner = tw.div`h-screen flex justify-center items-center bg-mainBg2 bg-cover`;
const CarouselDiv = tw.div`w-full`;
