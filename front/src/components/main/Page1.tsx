import tw from 'tailwind-styled-components';
import { Carousel } from './index';

const Page1 = () => {
  return (
    <Inner>
      <Texth1>
        <Carousel />
      </Texth1>
    </Inner>
  );
};

export default Page1;

const Inner = tw.div`h-screen flex justify-center items-center bg-mainBg1 bg-cover`;
const Texth1 = tw.div`text-white text-8xl`;
