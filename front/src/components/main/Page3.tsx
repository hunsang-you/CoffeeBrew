import Page3Carousel from './Page3Carousel';
import tw from 'tailwind-styled-components';

const Page3 = () => {
  return (
    <Inner>
      <CarouselDiv>
        <Page3Carousel />
      </CarouselDiv>
    </Inner>
  );
};

export default Page3;

const Inner = tw.div`h-screen flex justify-center items-center`;
const CarouselDiv = tw.div`w-full h-full`;
const TextDiv = tw.div`text-white text-8xl`;
