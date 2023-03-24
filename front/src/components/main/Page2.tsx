import React from 'react';
import tw from 'tailwind-styled-components';

const Page2 = () => {
  return <Inner>page2</Inner>;
};

export default Page2;

const Inner = tw.div`h-90vh flex justify-center items-center text-8xl bg-orange-400	`;
