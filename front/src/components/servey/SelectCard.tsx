import tw from 'tailwind-styled-components';
import photo1 from '../../assets/servey/1/STARBUCKS.png';
import photo2 from '../../assets/servey/1/A TWOSOME PLACE_W.png';
import photo3 from '../../assets/servey/1/CAFFE PASCUCCI.png';
import photo4 from '../../assets/servey/1/EDIYA.png';
import photo5 from '../../assets/servey/1/COFFEE.jpg';

interface ServeyProps {
  i: number;
}

const SelectCard = (props: ServeyProps) => {
  const brand: string[] = [photo1, photo2, photo3, photo4, photo5];
  const reason: string[] = [];
  return (
    <OutCard>
      <CardImg src={brand[props.i]}></CardImg>
      <CardTitle>123123</CardTitle>
    </OutCard>
  );
};

export default SelectCard;

const OutCard = tw.div`border border-mainOrige flex flex-col items-center justify-center  py-10 px-5 mx-5 rounded-lg`;
const CardImg = tw.img`mb-10 bg-white`;
const CardTitle = tw.div`text-5xl`;
