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
  const apidate: string = props.taste;
  if (apidate === 'acidity') {
    return (
      <ImgDiv>
        <img src={Acidity} />
      </ImgDiv>
    );
  } else if (apidate === 'bitter') {
    return (
      <ImgDiv>
        <img src={Bitter} />
      </ImgDiv>
    );
  } else if (apidate === 'body') {
    return (
      <ImgDiv>
        <img src={Body} />
      </ImgDiv>
    );
  } else if (apidate === 'flavor') {
    return (
      <ImgDiv>
        <img src={Flavor} />
      </ImgDiv>
    );
  } else if (apidate === 'sweetness') {
    return (
      <ImgDiv>
        <img src={Sweetness} />
      </ImgDiv>
    );
  } else {
    return (
      <ImgDiv>
        <img src={Sweetness} />
      </ImgDiv>
    );
  }
};

export default CoffeeCard;

const ImgDiv = tw.div`p-10`;
