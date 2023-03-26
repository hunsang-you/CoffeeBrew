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

const Page2Carousel = () => {
  const items = [
    {
      name: 'Random Name #1',
      description: 'Probably the most random thing you have ever seen!',
    },
    {
      name: 'Random Name #2',
      description: 'Hello World!',
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
      <h2>{props.item.name}</h2>
      <p>{props.item.description}</p>
    </Paper>
  );
};

export default Page2Carousel;
