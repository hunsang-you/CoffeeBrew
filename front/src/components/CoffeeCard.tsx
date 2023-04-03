import { useState, useEffect } from 'react';
import tw from 'tailwind-styled-components';

import Acidity from '../assets/coffeecard/acidity.svg';
import Bitter from '../assets/coffeecard/bitter.svg';
import Body from '../assets/coffeecard/body.svg';
import Flavor from '../assets/coffeecard/flavor.svg';
import Sweetness from '../assets/coffeecard/sweetness.svg';

type CoffeeItem = {
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
};

interface propsData {
  propsdata: CoffeeItem;
}

const CoffeeCard = ({ propsdata }: propsData) => {
  const propsData: CoffeeItem = propsdata;
  const [taste, setTaste] = useState('');
  const cardTitle = propsData.region + ' ' + propsData.rank;
  const cardOrigin = propsData.origin;
  const cardNote = propsData.coffeeingNote;
  const [cardImg, setCardImg] = useState('');
  const [cardBg, setCardBg] = useState('white');

  const peakTaste = () => {
    const acidity = propsData.acidity;
    const bitter = propsData.bitterness;
    const body = propsData.body;
    const flavor = propsData.flavor;
    const sweetness = propsData.sweetness;
    const values: any[] = [acidity, bitter, body, flavor, sweetness];
    const maxIndex: number = values.indexOf(Math.max(...values));
    const maxVar = Object.keys({ acidity, bitter, body, flavor, sweetness })[
      maxIndex
    ];
    setTaste(maxVar);
    console.log(maxVar);
    if (maxVar === 'acidity') {
      setCardImg(Acidity);
      setCardBg('#FEC200');
    } else if (maxVar === 'bitter') {
      setCardImg(Bitter);
      setCardBg('#ACA571');
    } else if (maxVar === 'body') {
      setCardImg(Body);
      setCardBg('#A33A1D');
    } else if (maxVar === 'flavor') {
      setCardImg(Flavor);
      setCardBg('#938EAE');
    } else if (maxVar === 'sweetness') {
      setCardImg(Sweetness);
      setCardBg('#DB7624');
    }
  };
  useEffect(() => {
    peakTaste();
  }, []);
  return (
    <OutDiv style={{ backgroundColor: cardBg }}>
      <InnerDiv>
        <ImgDiv src={cardImg} />
      </InnerDiv>
      <UnderDiv>
        <UnTitle>{cardTitle}</UnTitle>
        <UnContent>{cardOrigin}</UnContent>
      </UnderDiv>
    </OutDiv>
  );
};

export default CoffeeCard;

const OutDiv = tw.div`w-1/6 h-2/6 max-h-1/6 min-h-2/6 p-5 m-5 flex flex-col justify-between content-center rounded-lg`;
const InnerDiv = tw.div`w-full`;
const ImgDiv = tw.img`w-full`;
const UnderDiv = tw.div`p-3 flex flex-col justify-end`;
const UnTitle = tw.div`w-full text-end text-xl`;
const UnContent = tw.div`w-full text-end text-xl`;
