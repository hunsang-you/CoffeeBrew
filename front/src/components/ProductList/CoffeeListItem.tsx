import tw from 'tailwind-styled-components';
import { useState, useRef, useEffect } from 'react';
import acidity from '../../assets/detailImg/acidityBean.svg';
import bitterness from '../../assets/detailImg/bitterBean.svg';
import sweetness from '../../assets/detailImg/sweetBean.svg';
import flavor from '../../assets/detailImg/flavorBean.svg';
import body from '../../assets/detailImg/bodyBean.svg';
import { BeanType } from './AllList';
import { useNavigate } from 'react-router-dom';

interface PropsTypes {
  data: BeanType;
  i: number;
}
const CoffeeListItem = ({ data, i }: PropsTypes) => {
  const navigate = useNavigate();
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
  return (
    <ProductItemT1 style={{ backgroundColor: BackColor[i] }} key={i}>
      <ProductItemImg
        src={data.taste}
        onClick={() => navigate(`/detail/bean/${data.idx}`)}
      />
      <ProductItemB>
        <ProductItemName>{data.nameKo}</ProductItemName>
        <ProductItemEngName>{data.nameEn}</ProductItemEngName>
        <ProductInfo>{data.summary}</ProductInfo>
      </ProductItemB>
    </ProductItemT1>
  );
};

export default CoffeeListItem;

const ProductItemT = tw.div`w-72 h-400 justify-center rounded-t-2xl my-12 ml-10 drop-shadow-xl hover:scale-105 hover:drop-shadow-2xl duration-300 overflow-auto `;
const ProductItemT1 = tw(ProductItemT)`bg-brownBorder rounded-b-2xl`;
const ProductItemImg = tw.img`w-32 h-48  mx-auto mt-4  `;

const ProductItemB = tw.div`w-72 h-44  justify-center  bg-navColor mt-10 rounded-b-2xl hover:drop-shadow-2xl`;
const ProductItemName = tw.div`text-productTextBrown pt-4 font-bold break-words mx-4 text-xl `;
const ProductItemEngName = tw.div`text-productTextBrown font-bold break-words mx-4 `;
const ProductInfo = tw.div`h-24 text-nameColor overflow-y-auto mx-4`;
