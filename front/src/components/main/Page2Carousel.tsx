import tw from 'tailwind-styled-components';
import Carousel from 'react-material-ui-carousel';
import RecommendCard from './RecommendCard';
import CoffeeCard from '../CoffeeCard';

const Page2Carousel = () => {
  return (
    <Carousel>
      <BigDiv>
        <CoffeeCard taste={'acidity'} />
        <CoffeeCard taste={'acidity'} />
        <CoffeeCard taste={'body'} />
        <CoffeeCard taste={'flavor'} />
      </BigDiv>
      <BigDiv>
        <CoffeeCard taste={'bitter'} />
        <CoffeeCard taste={'body'} />
        <CoffeeCard taste={'flavor'} />
        <CoffeeCard taste={'sweetness'} />
      </BigDiv>
    </Carousel>
  );
};

export default Page2Carousel;

const BigDiv = tw.div`flex justify-center items-center`;
