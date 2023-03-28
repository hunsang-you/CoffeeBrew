import tw from 'tailwind-styled-components';
import Carousel from 'react-material-ui-carousel';
import RecommendCard from './RecommendCard';

const Page2Carousel = () => {
  return (
    <Carousel>
      <BigDiv>
        <RecommendCard taste={'acidity'} />
        <RecommendCard taste={'acidity'} />
        <RecommendCard taste={'body'} />
        <RecommendCard taste={'flavor'} />
      </BigDiv>
      <BigDiv>
        <RecommendCard taste={'bitter'} />
        <RecommendCard taste={'body'} />
        <RecommendCard taste={'flavor'} />
        <RecommendCard taste={'sweetness'} />
      </BigDiv>
    </Carousel>
  );
};

export default Page2Carousel;

const BigDiv = tw.div`flex justify-center items-center`;
