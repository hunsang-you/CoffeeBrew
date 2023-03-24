import React from 'react';
import tw from 'tailwind-styled-components';

const Page1 = () => {
  return <Inner>page1</Inner>;
};

export default Page1;

const Inner = tw.div`h-90vh flex justify-center items-center text-8xl bg-red-100	`;
