import tw from 'tailwind-styled-components';
import { useState, useEffect } from 'react';
import { AiFillHeart } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { memberAPI, detailAPI } from '../../api/api';
import { CapsuleDetailType } from '../detailcapsule/DetailCapsule';
import acidityCapsuleImg from '../../assets/detailImg/acidityCapsule.svg';
import flavorCapsuleImg from '../../assets/detailImg/flavorCapsule.svg';
import bodyCapsuleImg from '../../assets/detailImg/bodyCapsule.svg';
import bitterCapsuleImg from '../../assets/detailImg/bitterCapsule.svg';
import roastingCapsuleImg from '../../assets/detailImg/roastingCapsule.svg';

interface PropsTypes {
  capsule: CapsuleDetailType;
  i: number;
  capsuleIdx: number[];
  setIsLikeCheck: React.Dispatch<React.SetStateAction<boolean>>;
  isLikeCheck: boolean;
}

const LikeCapsuleListItem = ({
  capsule,
  i,
  capsuleIdx,
  setIsLikeCheck,
  isLikeCheck,
}: PropsTypes) => {
  const navigate = useNavigate();
  const [imgIdx, setImgIdx] = useState(0);
  const [capsuleImg, setCapsuleImg] = useState([
    acidityCapsuleImg,
    bitterCapsuleImg,
    flavorCapsuleImg,
    bodyCapsuleImg,
    roastingCapsuleImg,
  ]);
  const handleLike = () => {
    setIsLikeCheck(!isLikeCheck);
  };
  useEffect(() => {
    const acidity = capsule.capsuleScore.acidity;
    const bitter = capsule.capsuleScore.bitterness;
    const body = capsule.capsuleScore.body;
    const flavor = capsule.capsuleScore.flavor;
    const roasting = capsule.capsuleScore.roasting;
    const values: any[] = [acidity, bitter, flavor, body, roasting];
    const maxIndex: number = values.indexOf(Math.max(...values));
    setImgIdx(maxIndex);
  }, []);
  return (
    <CardBody>
      <CapsuleImg src={capsuleImg[imgIdx]} alt="bean" />
      <CardContent style={{ backgroundColor: '#FFF0CE' }}>
        <div
          style={{
            wordBreak: 'break-word',
            overflow: 'scroll',
            textOverflow: 'ellipsis',
          }}
        >
          <CapsuleName>{capsule.capsule.nameKo}</CapsuleName>
          <CapsuleCountry>회사: {capsule.capsuleDetail.company}</CapsuleCountry>
          <CapsuleDescription>
            {capsule.capsuleDetail.description}
          </CapsuleDescription>
        </div>
      </CardContent>
      <FixedDiv
        style={{
          bottom: 0,
          backgroundColor: 'rgb(0, 0, 0, 0.7)',
        }}
      >
        <AiFillHeart
          size={42}
          style={{
            color: 'red',
            marginLeft: '8px',
            cursor: 'pointer',
          }}
          onClick={() => {
            detailAPI
              .capsuleLike(Number(capsuleIdx[i]))
              .then((request) => {
                console.log('좋아요 해제');
                handleLike();
              })
              .catch((e) => console.log(e));
          }}
        />

        <LinkBtn
          onClick={() => {
            navigate(`/detail/capsule/${capsuleIdx[i]}`);
          }}
        >
          상세보기
        </LinkBtn>
      </FixedDiv>
    </CardBody>
  );
};
export default LikeCapsuleListItem;

const CardBody = tw.div`w-52 mx-3 my-4 flex-col relative`;
const CapsuleImg = tw.img`w-48 h-48 rounded-full mb-2 ml-4`;
const CardContent = tw.div`w-56 h-36 rounded-t-xl rounded-b-md overflow-scroll text-ellipsis `;
const CapsuleName = tw.div`pt-3 pb-2 text-fotColor font-bold text-left px-4`;
const CapsuleCountry = tw.div`text-sm text-nameColor font-bold text-left pl-6 pr-2 `;
const CapsuleDescription = tw.div`text-sm text-nameColor font-bold text-left mt-2 pb-12 pl-6 pr-2`;

const FixedDiv = tw.div`w-56 h-10 rounded-b-md bg-gray-500 my-auto flex absolute bottom-0`;
const LinkBtn = tw.div`w-36 h-8 bg-brownBorder font-bold text-xl text-white rounded-full mt-1 ml-4 mb-1 cursor-pointer`;
