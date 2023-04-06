import tw from 'tailwind-styled-components';
import noanalyze from '../../assets/tempImg/noanalyze.png';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { useNavigate } from 'react-router-dom';

const NoAnalyzeBody = tw.div`border-2 rounded-b-lg text-center mb-4`;
const NoComment = tw.div`text-2xl font-bold text-left ml-10 mb-5 mt-5`;
const NoUserTypeImg = tw.div`w-720 mx-auto`;
const NoLinkBtn = tw.div` class="w-400 h-16 font-bold text-2xl text-white bg-brownBorder rounded-3xl cursor-pointer hover:scale-110 mx-auto my-10"`;

const NoAnalyze = () => {
  const reduxData = useSelector((state: RootState) => state);
  const Navigate = useNavigate();

  return (
    <NoAnalyzeBody
      style={{
        border: 'solid 4px #FD0F0F',
        minHeight: '630px',
      }}
    >
      <NoUserTypeImg>
        <img src={noanalyze} alt="noData" style={{ marginLeft: '110px' }} />
      </NoUserTypeImg>

      <NoComment>
        {reduxData.memberInfo?.nickname}님을 분석할 수가 없어요
      </NoComment>
      <NoLinkBtn
        onClick={() => {
          Navigate('/survey');
        }}
      >
        <p style={{ marginTop: '16px' }}>설문하러가기</p>
      </NoLinkBtn>
    </NoAnalyzeBody>
  );
};

export default NoAnalyze;
