import { useEffect } from 'react';
import tw from 'tailwind-styled-components';

import Acidity from '../assets/coffeecard/acidity.svg';
import Bitter from '../assets/coffeecard/bitter.svg';
import Body from '../assets/coffeecard/body.svg';
import Flavor from '../assets/coffeecard/flavor.svg';
import Sweetness from '../assets/coffeecard/sweetness.svg';

interface TastProps {
  taste: string;
}

const CoffeeCard = (props: TastProps) => {
  const taste: string = props.taste;

  let tasteImg: string = '';
  let tasteBg: string = 'white';

  if (taste === 'acidity') {
    tasteImg = Acidity;
    tasteBg = '#FEC200';
  } else if (taste === 'bitter') {
    tasteImg = Bitter;
    tasteBg = '#ACA571';
  } else if (taste === 'body') {
    tasteImg = Body;
    tasteBg = '#A33A1D';
  } else if (taste === 'flavor') {
    tasteImg = Flavor;
    tasteBg = '#938EAE';
  } else if (taste === 'sweetness') {
    tasteImg = Sweetness;
    tasteBg = '#DB7624';
  }

  useEffect(() => {}, []);

  return (
    <OutDiv style={{ backgroundColor: tasteBg }}>
      <InnerDiv>
        <ImgDiv src={tasteImg} />
      </InnerDiv>
      <UnderDiv>
        <UnTitle>"CoffeeBrew"</UnTitle>
        <UnContent>원산지</UnContent>
        <UnContent>{taste}</UnContent>
      </UnderDiv>
    </OutDiv>
  );
};

export default CoffeeCard;

const OutDiv = tw.div`p-5 m-5 h-2/6 flex flex-col justify-center content-center`;
const InnerDiv = tw.div`w-full`;
const ImgDiv = tw.img`w-full`;
const UnderDiv = tw.div`p-3 flex flex-col justify-end`;
const UnTitle = tw.div`w-full text-end text-2xl`;
const UnContent = tw.div`w-full text-end text-xl`;
