import { useState, useEffect } from 'react';
import tw from 'tailwind-styled-components';

import capAcidity from '../assets/coffeecard/cap_acidity.svg';
import capBitter from '../assets/coffeecard/cap_bitter.svg';
import capBody from '../assets/coffeecard/cap_body.svg';
import capFlavor from '../assets/coffeecard/cap_flavor.svg';
import capSweetness from '../assets/coffeecard/cap_sweetness.svg';

interface Capsule {
  idx: number | null;
  nameEn: string | null;
  nameKo: string | null;
  summary: string | null;
  thumbnail: string | null;
  userGrade: number | null;
}

interface CapsuleScore {
  idx: number | null;
  acidity: number | null;
  balance: number | null;
  bitterness: number | null;
  body: number | null;
  coffeeingNote: string | null;
  flavor: number | null;
  roasting: number | null;
  capsule: Capsule;
}

interface CapsuleData {
  capsuleScore: CapsuleScore;
}

const CoffeeCapSule = () => {
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
