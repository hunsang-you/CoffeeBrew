import { useState, useEffect } from 'react';
import tw from 'tailwind-styled-components';

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
  rec: string;
  propsdata: CoffeeItem;
}

const CoffeeCard = ({ rec, propsdata }: propsData) => {
  console.log(propsdata);
  const propsData: CoffeeItem = propsdata;
  const [taste, setTaste] = useState('');
  const cardName = propsData.nameKo;
  const cardTitle = propsData.origin + ' ' + propsData.rank;
  const cardRegion = propsData.region;
  const cardNote = propsData.coffeeingNote;
  const [cardImg, setCardImg] = useState('');
  const [cardBg, setCardBg] = useState('white');

  const beanTaste = () => {
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
  const capsuleTaste = () => {
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

    if (maxVar === 'acidity') {
      setCardImg(capAcidity);
      setCardBg('#FEC200');
      setTaste('산미');
    } else if (maxVar === 'bitter') {
      setCardImg(capBitter);
      setCardBg('#ACA571');
      setTaste('쓴맛');
    } else if (maxVar === 'body') {
      setCardImg(capBody);
      setCardBg('#A33A1D');
      setTaste('바디감');
    } else if (maxVar === 'flavor') {
      setCardImg(capFlavor);
      setCardBg('#938EAE');
      setTaste('향');
    } else if (maxVar === 'sweetness') {
      setCardImg(capSweetness);
      setCardBg('#DB7624');
      setTaste('단맛');
    }
  };
  useEffect(() => {
    if (rec === 'bean') {
      beanTaste();
    } else if (rec === 'capsule') {
      capsuleTaste();
    }
  }, []);
  return (
    <OutDiv style={{ backgroundColor: cardBg }}>
      <InnerDiv>
        <ImgDiv src={cardImg} />
      </InnerDiv>
      <UnderDiv>
        <UnTitle>{cardTitle}</UnTitle>
        {/* <UnTitle>{cardTitle}</UnTitle> */}
        <UnContent>{taste}</UnContent>
        <UnContent>{cardNote}</UnContent>
      </UnderDiv>
    </OutDiv>
  );
};

export default CoffeeCard;

const OutDiv = tw.div`w-full p-5 m-5 flex flex-col justify-between content-center rounded-lg`;
const InnerDiv = tw.div`flex justify-center items-center`;
const ImgDiv = tw.img`h-36`;
const UnderDiv = tw.div`h-36 p-3 flex flex-col justify-center`;
const UnTitle = tw.div`w-full text-end text-xl font-bold`;
const UnContent = tw.div`w-full text-center text-xl`;
