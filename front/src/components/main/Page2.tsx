import React from 'react';
import tw from 'tailwind-styled-components';

interface MainProps {
  pushText: () => void;
}

const Page2 = (props: MainProps) => {
  return (
    <Inner>
      <Texth1
        onClick={() => {
          props.pushText();
        }}
      >
        Page2
      </Texth1>
    </Inner>
  );
};

export default Page2;

const Inner = tw.div`h-screen flex justify-center items-center bg-orange-400`;
const Texth1 = tw.div`text-8xl`;
