import { useNavigate } from 'react-router-dom';
import tw from 'tailwind-styled-components';

const Page1 = () => {
  const navigate = useNavigate();

  return (
    <Inner>
      <ItemDiv>
        {/* <DivDiv></DivDiv> */}
        <TextDiv>
          내 입맛에 맞는 <br /> 원두 추천받기
        </TextDiv>
        <MoveButton
          onClick={() => {
            navigate('/survey');
          }}
        >
          설문조사하기
        </MoveButton>
      </ItemDiv>
    </Inner>
  );
};

export default Page1;

const Inner = tw.div`h-screen flex flex-row justify-start items-end bg-mainBg1 bg-cover`;
const ItemDiv = tw.div`flex flex-col justify-center items-center mb-1/10 mx-1/10`;
const TextDiv = tw.div`text-black text-6xl font-bold m-4 right-1/2 text-left`;
const MoveButton = tw.button`bg-transparent hover:bg-mainOrige text-6xl text-mainOrige font-semibold hover:text-white py-4 px-2 border border-mainOrige hover:border-transparent rounded`;
