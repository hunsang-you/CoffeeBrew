import tw from 'tailwind-styled-components';
import CardComponent from './Card';

type BasicType = { title: string; titleKo: string; content: string }[];

const BasicData: BasicType = [
  {
    title: '',
    titleKo: '',
    content: '',
  },
];

const Basic = () => {
  return <div className="flex flex-row flex-wrap"></div>;
};

export default Basic;
