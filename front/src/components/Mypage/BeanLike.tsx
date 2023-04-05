import tw from 'tailwind-styled-components';
import { useState } from 'react';

import LikeBeanList from './LikeBeanList';
import LikeCapsuleList from './LikeCapsule';

const BeanLikeBody = tw.div` border-2 rounded-b-lg text-center  mb-4`;
const SelectTypeBar = tw.div`flex justify-center`;
const SelectBtn = tw.div`w-120 h-10 flex bg-brownBorder rounded-full mx-4 my-4 justify-center text-xl text-white font-bold cursor-pointer drop-shadow-xl hover:scale-110`;
const OffRoundBtn = tw.div`w-5 h-5 bg-gray-400 rounded-full mr-6 mt-2.5  `;
const OnRoundBtn = tw.div`w-5 h-5 bg-green-500 rounded-full mr-6 mt-2.5`;

const BeanLike = () => {
  const [isTypeCheck, setIsTypeCheck] = useState(true);

  const selectType = () => {
    setIsTypeCheck(!isTypeCheck);
  };

  return (
    <BeanLikeBody style={{ border: 'solid 4px #03C846', minHeight: '630px' }}>
      <SelectTypeBar>
        {isTypeCheck ? (
          <SelectBtn>
            <OnRoundBtn />
            <div style={{ marginTop: '5px' }}>원두</div>
          </SelectBtn>
        ) : (
          <SelectBtn onClick={() => selectType()}>
            <OffRoundBtn />
            <div style={{ marginTop: '5px' }}>원두</div>
          </SelectBtn>
        )}

        {isTypeCheck ? (
          <SelectBtn onClick={() => selectType()}>
            <OffRoundBtn />
            <div style={{ marginTop: '5px' }}>캡슐</div>
          </SelectBtn>
        ) : (
          <SelectBtn>
            <OnRoundBtn />
            <div style={{ marginTop: '5px' }}>캡슐</div>
          </SelectBtn>
        )}
      </SelectTypeBar>
      <div style={{ wordWrap: 'break-word' }}>
        {isTypeCheck ? <LikeBeanList /> : null}
      </div>
      <div>{isTypeCheck ? null : <LikeCapsuleList />}</div>
    </BeanLikeBody>
  );
};

export default BeanLike;
