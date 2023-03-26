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

const Inner = tw.div`h-screen flex justify-center items-center bg-cover`;
const TextDiv = tw.div`text-white text-8xl`;
const CarouselDiv = tw.div`w-1/2 h-2/4`;
