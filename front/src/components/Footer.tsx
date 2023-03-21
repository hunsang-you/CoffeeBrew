import React from 'react';
import tw from 'tailwind-styled-components';

const Footer = () => {
  return <Foot>푸터입니다</Foot>;
};

const Foot = tw.footer`w-screen h-40 bg-fotColor text-center text-red-600`;

export default Footer;
