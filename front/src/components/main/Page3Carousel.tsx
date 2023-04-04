import { useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();

  return (
    <Carousel>
      <BgDiv1 style={{ backgroundImage: `url(${bg1})` }}>
        <ItemDiv>
          <TextDiv>어떤 나라에서</TextDiv>
          <TextDiv>커피를 생산할까요?</TextDiv>
          <MoveButton
            onClick={() => {
              navigate('/info/map');
            }}
          >
            SHOW NOW
          </MoveButton>
        </ItemDiv>
      </BgDiv1>
      <BgDiv2 style={{ backgroundImage: `url(${bg2})` }}>
        <ItemDiv>
          <TextDiv>커피 용어는</TextDiv>
          <TextDiv>어떤 것이 있을까요?</TextDiv>
          <MoveButton
            onClick={() => {
              navigate('/info/word');
            }}
          >
            SHOW NOW
          </MoveButton>
        </ItemDiv>
      </BgDiv2>
      <BgDiv3 style={{ backgroundImage: `url(${bg3})` }}>
        <ItemDiv>
          <TextDiv>커피의 역사에</TextDiv>
          <TextDiv>대해서 알아볼까요?</TextDiv>
          <MoveButton
            onClick={() => {
              navigate('/info');
            }}
          >
            SHOW NOW
          </MoveButton>
        </ItemDiv>
      </BgDiv3>
    </Carousel>
  );
};

export default Page3Carousel;

const BgDiv1 = tw.div`bg-cover h-screen flex flex-row justify-start items-end text-left`;
const BgDiv2 = tw.div`bg-cover h-screen flex flex-row justify-center items-end text-center`;
const BgDiv3 = tw.div`bg-cover h-screen flex flex-row justify-end items-end text-right`;
// const TextDiv = tw.div`text-white text-2xl mx-1/10 h-90vh`;
// const MoveButton = tw.button`text-white text-2xl mx-1/10`;
const ItemDiv = tw.div`flex flex-col justify-center mb-1/10 mx-1/10`;
const TextDiv = tw.div`text-white text-6xl font-bold m-4 right-1/2`;
const MoveButton = tw.button`bg-transparent hover:bg-mainOrige text-6xl text-white font-semibold hover:text-white py-4 px-2 border border-white hover:border-transparent rounded`;
