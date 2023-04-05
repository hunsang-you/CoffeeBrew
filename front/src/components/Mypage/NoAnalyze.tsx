import tw from 'tailwind-styled-components';
import Chart from './UserChart';
import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import noanalyze from '../../assets/tempImg/noanalyze.png';
import { useNavigate } from 'react-router-dom';

const AnalyzeBody = tw.div`border-2 rounded-b-lg text-center mb-4`;
const Comment = tw.div`text-xl font-bold text-left ml-5 mb-10`;
const UserTypeImg = tw.div`w-720 mx-auto`;
const LinkBtn = tw.div` font-bold text-xl text-white rounded-3xl mt-24 cursor-pointer hover:scale-110`;

const Analyze = () => {
  const reduxData = useSelector((state: RootState) => state);
  const Navigate = useNavigate();

  return (
    <AnalyzeBody
      style={{
        border: 'solid 4px #FD0F0F',
        minHeight: '630px',
      }}
    >
      <UserTypeImg>
        <img src={noanalyze} alt="noData" />
      </UserTypeImg>

      <Comment>{reduxData.memberInfo?.nickname}님을 분석할 수가 없어요</Comment>
      <LinkBtn
        onClick={() => {
          Navigate('/survey');
        }}
      >
        설문하러가기
      </LinkBtn>
    </AnalyzeBody>
  );
};

export default Analyze;
