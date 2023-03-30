import tw from 'tailwind-styled-components';

type objtype = {
  title: string;
  img?: string;
};

interface ServeyProps {
  key: number;
  data: objtype;
}

const SelectCard = (props: ServeyProps) => {
  return (
    <OutCard>
      {props.data.img ? <CardImg src={props.data.img}></CardImg> : null}
      <CardTitle>{props.data.title}</CardTitle>
    </OutCard>
  );
};

export default SelectCard;

const OutCard = tw.div`w-1/5 border border-mainOrige flex flex-col items-center justify-center  py-10 px-5 mx-5 rounded-lg break-normal min-h-1/5`;
const CardImg = tw.img`w-full mb-10 bg-white`;
const CardTitle = tw.div`text-2xl font-bold`;
