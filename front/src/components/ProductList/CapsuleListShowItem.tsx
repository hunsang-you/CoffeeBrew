import tw from 'tailwind-styled-components';
import { useNavigate } from 'react-router-dom';
import { CapsuleType } from './CapsuleList';
import { useEffect, useState } from 'react';
import acidityCapsuleImg from '../../assets/detailImg/acidityCapsule.svg';
import flavorCapsuleImg from '../../assets/detailImg/flavorCapsule.svg';
import bodyCapsuleImg from '../../assets/detailImg/bodyCapsule.svg';
import bitterCapsuleImg from '../../assets/detailImg/bitterCapsule.svg';
import roastingCapsuleImg from '../../assets/detailImg/roastingCapsule.svg';

interface PropsTypes {
  data: CapsuleType;
  i: number;
}

const CapsuleListShowItem = ({ data, i }: PropsTypes) => {
  const [capsuleImg, setCapsuleImg] = useState([
    acidityCapsuleImg,
    bitterCapsuleImg,
    flavorCapsuleImg,
    bodyCapsuleImg,
    roastingCapsuleImg,
  ]);
  const [imgNumber, setImgNumber] = useState<number>(0);
  const BackColor: string[] = [
    '#FFAA01',
    '#D4AA70',
    '#E8D2A0',
    '#F6842B',
    '#D3BD94',
    '#9A6533',
    '#FFAA01',
    '#D4AA70',
    '#E8D2A0',
  ];
  useEffect(() => {
    if (data.taste === 'acidity') {
      setImgNumber(0);
    } else if (data.taste === 'bitterness') {
      setImgNumber(1);
    } else if (data.taste === 'flavor') {
      setImgNumber(2);
    } else if (data.taste === 'body') {
      setImgNumber(3);
    } else if (data.taste === 'roasting') {
      setImgNumber(4);
    }
  }, []);
  const navigate = useNavigate();
  return (
    <ProductItemT1
      style={{ backgroundColor: BackColor[imgNumber] }}
      key={i}
      onClick={() => navigate(`/detail/capsule/${data.idx}`)}
    >
      <ProductItemImg src={capsuleImg[imgNumber]} />
      <ProductItemB>
        <ProductItemName>{data.nameKo}</ProductItemName>
        <ProductItemEngName>{data.nameEn}</ProductItemEngName>
        <ProductInfo>{data.summary}</ProductInfo>
      </ProductItemB>
    </ProductItemT1>
  );
};

export default CapsuleListShowItem;

const ProductItemT = tw.div`w-72 h-400 justify-center rounded-t-2xl my-12 ml-10 drop-shadow-xl hover:scale-105 hover:drop-shadow-2xl duration-300`;
const ProductItemT1 = tw(ProductItemT)`bg-brownBorder rounded-b-2xl`;
const ProductItemImg = tw.img`w-32 h-48  mx-auto mt-4  `;

const ProductItemB = tw.div`w-72 h-44  justify-center  bg-navColor mt-10 rounded-b-2xl hover:drop-shadow-2xl`;
const ProductItemName = tw.div`text-productTextBrown pt-4 font-bold break-words mx-4 text-xl `;
const ProductItemEngName = tw.div`text-productTextBrown font-bold break-words mx-4 `;
const ProductInfo = tw.div`h-12 text-nameColor overflow-scroll mx-4`;
