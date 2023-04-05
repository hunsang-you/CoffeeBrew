import tw from 'tailwind-styled-components';
import Chart from './UserChart';
import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import ratingfull from '../../assets/tempImg/ratingfull.png';
import ratinghalf from '../../assets/tempImg/ratinghalf.png';
import ratingempty from '../../assets/tempImg/ratingempty.png';
import examtype from '../../assets/tempImg/examtype.png';
import { SurveyType } from './MyProfile';

const AnalyzeBody = tw.div`border-2 rounded-b-lg text-center mb-4`;
const Comment = tw.div`text-3xl font-bold text-left ml-5 mb-10`;
const Score = tw.img`w-8`;
const LinkBtn = tw.div` font-bold text-xl text-white rounded-3xl mt-24 cursor-pointer hover:scale-110`;
const ScoreTitle = tw.div`text-xl flex justify-end drop-shadow-2xl`;
const UserTypeImg = tw.div`w-48 bg-red-200 mx-auto`;

interface PropsTypes {
  survey: SurveyType;
}

const Analyze = ({ survey }: PropsTypes) => {
  const reduxData = useSelector((state: RootState) => state);

  return (
    <AnalyzeBody
      style={{
        border: 'solid 4px #FD0F0F',
        minHeight: '630px',
      }}
    >
      <div style={{ scale: '130%', marginTop: '40px' }}>
        <Chart survey={survey} />
      </div>
      <Comment>{reduxData.memberInfo?.nickname}님의 선호도 분석 입니다</Comment>
      <div
        style={{ display: 'flex', justifyContent: 'end', marginRight: '40px' }}
      >
        <UserTypeImg>
          {/* <img src={examtype} alt="user_type" /> */}
        </UserTypeImg>
        <div style={{ marginTop: '50px' }}>{survey.coffeeing_note}</div>
      </div>
    </AnalyzeBody>
  );
};

export default Analyze;
