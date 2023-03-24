import tw from 'tailwind-styled-components';

const Page2 = () => {
  return (
    <Inner>
      <Texth1>Page2</Texth1>
    </Inner>
  );
};

export default Page2;

const Inner = tw.div`h-screen flex justify-center items-center bg-mainBg2 bg-cover`;
const Texth1 = tw.div`text-white text-8xl`;
