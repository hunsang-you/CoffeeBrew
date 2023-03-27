import tw from 'tailwind-styled-components';
import Carousel from 'react-material-ui-carousel';
import RecommendCard from './RecommendCard';

const Page2Carousel = () => {
  return (
    <Carousel>
      <BigDiv>
        <RecommendCard />
        <RecommendCard />
        <RecommendCard />
        <RecommendCard />
      </BigDiv>
      <BigDiv>
        <RecommendCard />
        <RecommendCard />
        <RecommendCard />
        <RecommendCard />
      </BigDiv>
    </Carousel>
  );
};

export default Page2Carousel;

const BigDiv = tw.div`flex h-screen`;
