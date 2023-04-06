import tw from 'tailwind-styled-components';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Capsule from '../../assets/tempImg/capsule.png';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import Chart from './CapsuleChart';
import { CapsuleDetailType } from './DetailCapsule';
import { detailAPI } from '../../api/api';
import acidityCapsule from '../../assets/detailImg/acidityCapsule.svg';
import flavorCapsule from '../../assets/detailImg/flavorCapsule.svg';
import bodyCapsule from '../../assets/detailImg/bodyCapsule.svg';
import bitterCapsule from '../../assets/detailImg/bitterCapsule.svg';
import roastingCapsule from '../../assets/detailImg/roastingCapsule.svg';

interface PropsType {
  detailCapsule: CapsuleDetailType | null;
}

const CapsuleInfo = ({ detailCapsule }: PropsType) => {
  const [isLike, setIsLike] = useState(false);

  const note = () => {
    const newwords =
      '#' + detailCapsule?.capsuleScore.coffeeingNote.replaceAll(', ', '#');
    return newwords;
  };

  const { capsuleId } = useParams() as { capsuleId: string };
  // 캡슐 이미지(sweetness => roasting)
  const [capsuleImg, setCapsuleImg] = useState('');
  const capsuleTaste = () => {
    const acidity = detailCapsule?.capsuleScore.acidity;
    const bitter = detailCapsule?.capsuleScore.bitterness;
    const body = detailCapsule?.capsuleScore.body;
    const flavor = detailCapsule?.capsuleScore.flavor;
    const roasting = detailCapsule?.capsuleScore.roasting;
    const values: any[] = [acidity, bitter, body, flavor, roasting];
    const maxIndex: number = values.indexOf(Math.max(...values));
    const maxVar = Object.keys({ acidity, bitter, body, flavor, roasting })[
      maxIndex
    ];
    if (maxVar === 'acidity') {
      setCapsuleImg(acidityCapsule);
    } else if (maxVar === 'bitter') {
      setCapsuleImg(bitterCapsule);
    } else if (maxVar === 'body') {
      setCapsuleImg(bodyCapsule);
    } else if (maxVar === 'flavor') {
      setCapsuleImg(flavorCapsule);
    } else if (maxVar === 'roasting') {
      setCapsuleImg(roastingCapsule);
    }
  };

  useEffect(() => {
    capsuleTaste();
  }, []);

  return (
    <CapsuleTop1 id="Top">
      <CapsuleImgBox>
        <CapsuleImg1 src={capsuleImg} alt="img" />
        <HeartImgLike>
          {isLike ? (
            <AiFillHeart
              size={50}
              onClick={() => {
                setIsLike(false);
                detailAPI
                  .capsuleLike(Number(capsuleId))
                  .then((request) => {
                    console.log('like api 취소성공', request.data);
                  })
                  .catch((e) => console.log(e));
              }}
              style={{ color: 'red' }}
            />
          ) : (
            <AiOutlineHeart
              size={50}
              onClick={() => {
                setIsLike(true);
                detailAPI
                  .capsuleLike(Number(capsuleId))
                  .then((request) =>
                    console.log('like api 연결', request.data),
                  );
              }}
              style={{ color: 'gray' }}
            />
          )}
        </HeartImgLike>
      </CapsuleImgBox>
      {/* 최상단 우측(정보, 차트) */}
      <CapsuleDesc>
        <DescLeft>
          <CapsuleName>
            {detailCapsule?.capsuleDetail.capsule.nameKo}
          </CapsuleName>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <CapsuleCountry>
              회사 : {detailCapsule?.capsuleDetail.company}
            </CapsuleCountry>
            <Region>
              머신타입 : {detailCapsule?.capsuleDetail.machineType}
            </Region>
          </div>

          <CapsuleChart>
            <Chart detailCapsuleScore={detailCapsule?.capsuleScore} />
          </CapsuleChart>
        </DescLeft>
        <DescRight>
          <CoffeeingNote>{note()}</CoffeeingNote>
          <Description>{detailCapsule?.capsuleDetail.description}</Description>
        </DescRight>
      </CapsuleDesc>
    </CapsuleTop1>
  );
};

export default CapsuleInfo;

// 최상단 좌측
const CapsuleTop1 = tw.div`flex justify-center ml-8 mr-8 mb-10 animate-fade-in-down`;
const CapsuleImg1 = tw.img`w-60 mx-auto mt-10 drop-shadow-xl`;
const HeartImgLike = tw.div`flex justify-center mt-2`;

// 최상단 우측 설명
const CapsuleDesc = tw.div`flex ml-6  w-592 mt-10 justify-between`;
const CapsuleImgBox = tw.div`w-360`;
const DescLeft = tw.div`w-2/3 `;
const CapsuleName = tw.div`text-left mt-6 ml-6 mr-2 mb-3.5 text-xl font-bold`;
const CapsuleCountry = tw.div`text-left ml-6 font-bold`;
const CapsuleChart = tw.div`mt-5 mx-auto`;
const DescRight = tw.div`w-60 my-6 mr-2 ml-1 `;
const Description = tw.div`h-80 mx-auto mt-4 overflow-y-auto text-left`;
const CoffeeingNote = tw.div`h-10 font-bold text-sm overflow-scroll break-words text-red-400`;
const RoastingPoint = tw.div`text-left ml-6 font-bold`;
const Region = tw.div`w-32 h-10 mr-4 font-bold break-words overflow-scroll`;
const Rank = tw.div`w-32 h-10 mr-4 font-bold break-words overflow-scroll`;
