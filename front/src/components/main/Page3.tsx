import React from 'react';
import tw from 'tailwind-styled-components';

interface MainProps {
  pushText: () => void;
}

const Page3 = (props: MainProps) => {
  return (
    <Inner>
      <Texth1
        onClick={() => {
          props.pushText();
        }}
      >
        Page3
      </Texth1>
    </Inner>
  );
};

export default Page3;

const Inner = tw.div`h-screen flex justify-center items-center bg-lime-200`;
const Texth1 = tw.div`text-8xl`;
