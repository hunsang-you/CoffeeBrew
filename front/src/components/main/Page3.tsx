import tw from 'tailwind-styled-components';

const Page3 = () => {
  return (
    <Inner>
      <Texth1>Page3</Texth1>
    </Inner>
  );
};

export default Page3;

const Inner = tw.div`h-screen flex justify-center items-center bg-mainBg3 bg-cover`;
const Texth1 = tw.div`text-white text-8xl`;
