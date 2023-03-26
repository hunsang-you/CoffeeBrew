import tw from 'tailwind-styled-components';
import Carousel from 'react-material-ui-carousel';
import { Paper, Button } from '@mui/material';
import bg1 from '../../assets/mainImg/bg3-1.jpg';
import bg2 from '../../assets/mainImg/bg3-2.jpg';
import bg3 from '../../assets/mainImg/bg3-3.jpg';

interface Item {
  [key: string]: string;
}

interface ItemProps {
  key: number;
  item: Item;
}

const Page3Carousel = () => {
  const items = [
    {
      bg: 'bg1',
      title: '어떤 나라에서 커피를 생산할까요?',
      url: 'https://www.naver.com/',
    },
    {
      bg: 'bg2',
      title: '커피 기구는 어떤 것이 있을까요?',
      url: 'https://www.naver.com/',
    },
    {
      bg: 'bg3',
      title: '커피의 역사에 대해서 알아볼까요?',
      url: 'https://www.naver.com/',
    },
  ];
  return (
    <Carousel>
      {items.map((item, i) => (
        <Item key={i} item={item} />
      ))}
    </Carousel>
  );
};

const Item = (props: ItemProps) => {
  return (
    <BgDiv style={{ backgroundImage: `url(${bg1})` }}>
      <TextDiv>{props.item.title}</TextDiv>
      <MoveButton
        onClick={() => {
          window.open(`${props.item.url}`);
        }}
      >
        SHOW NOW
      </MoveButton>
    </BgDiv>
  );
};

export default Page3Carousel;

const BgDiv = tw.div`h-screen`;
const TextDiv = tw.div`text-black text-2xl mx-1/10`;
const MoveButton = tw.button`text-white text-2xl mx-1/10`;
