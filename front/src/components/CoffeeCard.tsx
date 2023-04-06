import { useState, useEffect } from 'react';
import tw from 'tailwind-styled-components';
import { useNavigate } from 'react-router-dom';
import Acidity from '../assets/coffeecard/acidity.svg';
import Bitter from '../assets/coffeecard/bitter.svg';
import Body from '../assets/coffeecard/body.svg';
import Flavor from '../assets/coffeecard/flavor.svg';
import Sweetness from '../assets/coffeecard/sweetness.svg';
import capAcidity from '../assets/coffeecard/cap_acidity.svg';
import capBitter from '../assets/coffeecard/cap_bitter.svg';
import capBody from '../assets/coffeecard/cap_body.svg';
import capFlavor from '../assets/coffeecard/cap_flavor.svg';
import capSweetness from '../assets/coffeecard/cap_sweetness.svg';

interface CoffeeItem {
  nameKo?: string;
  nameEn?: string | null;
  summary?: string | null;
  thumbnail?: string | null;
  userGrade?: number;
  description?: string | null;
  origin?: string;
  region?: string;
  rank?: string | null;
  processing?: string | null;
  decaffeination?: boolean | null;
  balance?: number | null;
  flavor?: number;
  acidity?: number;
  sweetness?: number;
  bitterness?: number;
  body?: number;
  coffeeingNote?: string | null;
  roastingPoint?: string | null;
  idx: number;
}

interface propsTypes {
  beanData: CoffeeItem;
}

const CoffeeCard = ({ beanData }: propsTypes) => {
  const navigate = useNavigate();
  const [taste, setTaste] = useState('');
  const cardTitle = beanData.origin + ' ' + beanData.rank;
  const splitArr = (str: string) => {
    return str.split(',').slice(0, 2);
  };
  const cardNote: string[] | null =
    typeof beanData.coffeeingNote === 'string'
      ? splitArr(beanData.coffeeingNote)
      : null;
  const [cardImg, setCardImg] = useState('');
  const [cardBg, setCardBg] = useState('white');

  useEffect(() => {
    const beanTaste = () => {
      const acidity = beanData.acidity;
      const bitter = beanData.bitterness;
      const body = beanData.body;
      const flavor = beanData.flavor;
      const sweetness = beanData.sweetness;
      const values: any[] = [acidity, bitter, body, flavor, sweetness];
      const maxIndex: number = values.indexOf(Math.max(...values));
      const maxVar = Object.keys({ acidity, bitter, body, flavor, sweetness })[
        maxIndex
      ];
      if (maxVar === 'acidity') {
        setCardImg(Acidity);
        setCardBg('#FEC200');
        setTaste('산미');
      } else if (maxVar === 'bitter') {
        setCardImg(Bitter);
        setCardBg('#ACA571');
        setTaste('쓴맛');
      } else if (maxVar === 'body') {
        setCardImg(Body);
        setCardBg('#A33A1D');
        setTaste('바디감');
      } else if (maxVar === 'flavor') {
        setCardImg(Flavor);
        setCardBg('#938EAE');
        setTaste('향');
      } else if (maxVar === 'sweetness') {
        setCardImg(Sweetness);
        setCardBg('#DB7624');
        setTaste('단맛');
      }
    };
    beanTaste();
  }, []);

  return (
    <OutDiv
      style={{ backgroundColor: cardBg }}
      onClick={() => {
        navigate(`/detail/bean/${beanData.idx}`);
      }}
    >
      <InnerDiv>
        <ImgDiv src={cardImg} />
      </InnerDiv>
      <UnderDiv>
        <UnTitle>{cardTitle}</UnTitle>
        <UnContent>{cardNote}</UnContent>
        <UnContent>{taste}</UnContent>
      </UnderDiv>
    </OutDiv>
  );
};

export default CoffeeCard;

const OutDiv = tw.div` p-5 m-5 justify-between content-center rounded-lg`;
const InnerDiv = tw.div`flex justify-center items-center`;
const ImgDiv = tw.img`h-36`;
const UnderDiv = tw.div`flex flex-col justify-center`;
const UnTitle = tw.div`w-full text-xl font-bold text-ellipsis overflow-hidden whitespace-nowrap`;
const UnContent = tw.div`w-full text-xl text-ellipsis overflow-hidden whitespace-nowrap`;
