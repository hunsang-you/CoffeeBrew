import { useState, useEffect } from 'react';
import tw from 'tailwind-styled-components';
import { CapsuleDetailType } from './detailcapsule/DetailCapsule';
import capAcidity from '../assets/coffeecard/cap_acidity.svg';
import capBitter from '../assets/coffeecard/cap_bitter.svg';
import capBody from '../assets/coffeecard/cap_body.svg';
import capFlavor from '../assets/coffeecard/cap_flavor.svg';
import capSweetness from '../assets/coffeecard/cap_sweetness.svg';

interface PropsType {
  capsuleData: CapsuleDetailType;
}

const CoffeeCapSule = ({ capsuleData }: PropsType) => {
  const [taste, setTaste] = useState('');
  const [cardImg, setCardImg] = useState('');
  const [cardBg, setCardBg] = useState('white');
  const capsuleTaste = () => {
    const acidity = capsuleData.capsuleScore.acidity;
    const bitter = capsuleData.capsuleScore.bitterness;
    const body = capsuleData.capsuleScore.body;
    const flavor = capsuleData.capsuleScore.flavor;
    const balance = capsuleData.capsuleScore.balance;
    const values: any[] = [acidity, bitter, body, flavor, balance];
    const maxIndex: number = values.indexOf(Math.max(...values));
    const maxVar = Object.keys({ acidity, bitter, body, flavor, balance })[
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
    } else if (maxVar === 'balance') {
      setCardImg(capSweetness);
      setCardBg('#DB7624');
      setTaste('단맛');
    }
  };

  return (
    <div>
      <h1>1</h1>
    </div>
  );
};

export default CoffeeCapSule;

const OutDiv = tw.div`w-full p-5 m-5 flex flex-col justify-between content-center rounded-lg`;
const InnerDiv = tw.div`flex justify-center items-center`;
const ImgDiv = tw.img`h-36`;
const UnderDiv = tw.div`h-28 flex flex-col justify-center`;
const UnTitle = tw.div`w-full text-end text-xl font-bold`;
const UnContent = tw.div`w-full text-end text-xl`;
