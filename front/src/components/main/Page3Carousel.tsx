import tw from 'tailwind-styled-components';
import Carousel from 'react-material-ui-carousel';
import { Paper, Button } from '@mui/material';

interface Item {
  [key: string]: string;
}

type ItemType = Item[];

interface ItemProps {
  key: number;
  item: Item;
}

const Page3Carousel = () => {
  const items = [
    {
      title: '어떤 나라에서 커피를 생산할까요?',
      url: 'https://www.naver.com/',
    },
    {
      title: '커피 기구는 어떤 것이 있을까요?',
      url: 'https://www.naver.com/',
    },
    {
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
    <Paper>
      <TextDiv>{props.item.title}</TextDiv>
      <Button
        onClick={() => {
          window.open(`${props.item.url}`);
        }}
      >
        SHOW NOW
      </Button>
    </Paper>
  );
};

export default Page3Carousel;

const TextDiv = tw.div`text-black text-2xl`;
