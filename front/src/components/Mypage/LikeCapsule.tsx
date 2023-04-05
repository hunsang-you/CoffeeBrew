import tw from 'tailwind-styled-components';
import axios from 'axios';
import { useState } from 'react';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

import bean from '../../assets/tempImg/bean.png';
import bean2 from '../../assets/tempImg/bean2.png';

const LikeCapsuleList = () => {
  const [isLikeCheck, setIsLikeCheck] = useState(true);

  const handleLike = () => {
    setIsLikeCheck(!isLikeCheck);
  };

  return (
    <div>
      <List>
        <CardBody>
          <CapsuleImg src={bean2} alt="bean" />
          <CardContent
            style={{ backgroundColor: '#FFF0CE', minHeight: '630px' }}
          >
            <div
              style={{
                wordBreak: 'break-word',
                overflow: 'scroll',
                textOverflow: 'ellipsis',
              }}
            >
              <CapsuleName>캡슐 이름캡슐</CapsuleName>
              <CapsuleCountry>원산지 : 파푸아뉴기니</CapsuleCountry>
              <CapsuleDescription>
                이 캡슐은 영국에서 넘어왔으며 지구를 7바퀴 돌아이 원두는
              </CapsuleDescription>
            </div>
          </CardContent>
          <FixedDiv
            style={{
              bottom: 0,
              backgroundColor: 'rgb(0, 0, 0, 0.7)',
            }}
          >
            {isLikeCheck ? (
              <AiFillHeart
                size={42}
                style={{
                  color: 'red',
                  marginLeft: '8px',
                  paddingTop: '8px',
                  cursor: 'pointer',
                }}
                onClick={() => handleLike()}
              />
            ) : null}
            {isLikeCheck ? null : (
              <AiOutlineHeart
                size={42}
                style={{ color: 'gray', marginLeft: '8px', paddingTop: '8px' }}
                onClick={() => handleLike()}
              />
            )}
            <LinkBtn> 상세보기 </LinkBtn>
          </FixedDiv>
        </CardBody>
      </List>
    </div>
  );
};

export default LikeCapsuleList;

const List = tw.div`flex max-w-fit mb-10 justify-evenly mt-4 select-none`;
const CardBody = tw.div`w-52 mx-3 flex-col relative`;
const CapsuleImg = tw.img`w-48 h-48 rounded-full mb-2 ml-4`;
const CardContent = tw.div`w-56 h-36 rounded-t-xl rounded-b-md overflow-scroll text-ellipsis `;
const CapsuleName = tw.div`pt-3 pb-2 text-fotColor font-bold text-left px-4`;
const CapsuleCountry = tw.div`text-sm text-nameColor font-bold text-left pl-6 pr-2 `;
const CapsuleDescription = tw.div`text-sm text-nameColor font-bold text-left mt-2 pb-12 pl-6 pr-2`;

const FixedDiv = tw.div`w-56 h-10 rounded-b-md bg-gray-500 my-auto flex absolute bottom-0`;
const LinkBtn = tw.div`w-36 h-8 bg-brownBorder font-bold text-xl text-white rounded-full mt-1 ml-4 mb-1 cursor-pointer`;
