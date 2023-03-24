import React from 'react';
import tw from 'tailwind-styled-components';

interface MainProps {
  pushText: () => void;
}

const Page1 = (props: MainProps) => {
  return (
    <Inner>
      <Texth1
        onClick={() => {
          props.pushText();
        }}
      >
        Page1
      </Texth1>
    </Inner>
  );
};

export default Page1;

const Inner = tw.div`h-screen flex justify-center items-center bg-red-100`;
const Texth1 = tw.div`text-8xl`;
