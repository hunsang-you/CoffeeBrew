import tw from 'tailwind-styled-components';
import { CapsuleDetailType } from './DetailCapsule';
import { useState, useRef, useEffect } from 'react';
import acidityCapsuleImg from '../../assets/detailImg/acidityCapsule.svg';
import flavorCapsuleImg from '../../assets/detailImg/flavorCapsule.svg';
import bodyCapsuleImg from '../../assets/detailImg/bodyCapsule.svg';
import bitterCapsuleImg from '../../assets/detailImg/bitterCapsule.svg';
import roastingCapsuleImg from '../../assets/detailImg/roastingCapsule.svg';

interface Propstypes {
  data: CapsuleDetailType;
  i: number;
}

const RecommendCapsuleList = ({ data, i }: Propstypes) => {
  const [imgIdx, setImgIdx] = useState(0);
  const [capsuleImg, setCapsuleImg] = useState([
    acidityCapsuleImg,
    bitterCapsuleImg,
    flavorCapsuleImg,
    bodyCapsuleImg,
    roastingCapsuleImg,
  ]);

  useEffect(() => {
    const acidity = data?.capsuleScore.acidity;
    const bitter = data?.capsuleScore.bitterness;
    const body = data?.capsuleScore.body;
    const flavor = data?.capsuleScore.flavor;
    const roasting = data?.capsuleScore.roasting;
    const values: any[] = [acidity, bitter, body, flavor, roasting];
    const maxIndex: number = values.indexOf(Math.max(...values));
    setImgIdx(maxIndex);
  }, []);
  const BackColor: string[] = [
    '#FFAA01',
    '#D4AA70',
    '#E8D2A0',
    '#F6842B',
    '#D3BD94',
  ];

  return (
    <RecomItemT1 style={{ backgroundColor: BackColor[i] }}>
      <RecomItemImg src={capsuleImg[imgIdx]} />
      <RecomItemB>
        <RecomItemName>{data.capsule.nameKo}</RecomItemName>
        <RecomInfo>
          <div>{data.capsule.summary}</div>
        </RecomInfo>
      </RecomItemB>
    </RecomItemT1>
  );
};

export default RecommendCapsuleList;

const RecomItemT = tw.div`w-44 h-320 justify-center rounded-t-2xl my-12 drop-shadow-xl hover:scale-105 hover:drop-shadow-2xl duration-300 ml-2 mr-2 `;
const RecomItemT1 = tw(RecomItemT)`bg-brownBorder rounded-b-2xl`;
const RecomItemImg = tw.img`w-20 h-32  mx-auto mt-4  `;

const RecomItemB = tw.div`w-44 h-44  justify-center  bg-navColor mt-10 rounded-b-2xl hover:drop-shadow-2xl overflow-y-auto`;
const RecomItemName = tw.div`text-productTextBrown pt-4 font-bold break-words mx-4 text-base `;
const RecomInfo = tw.div`h-24 text-nameColor overflow-y-auto mx-4`;
