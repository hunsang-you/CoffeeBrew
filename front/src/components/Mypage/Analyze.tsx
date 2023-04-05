import tw from 'tailwind-styled-components';
import Chart from './UserChart';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { SurveyType } from './MyProfile';
import { useNavigate } from 'react-router-dom';

const AnalyzeBody = tw.div`border-2 rounded-b-lg text-center mb-4`;
const Comment = tw.div`text-3xl font-bold text-left ml-5 mb-10`;
const LinkBtn = tw.div` font-bold text-xl text-white rounded-3xl mt-24 cursor-pointer hover:scale-110`;
const UserTypeImg = tw.div`w-48 bg-red-200 mx-auto`;

interface PropsTypes {
  survey: SurveyType;
}

const Analyze = ({ survey }: PropsTypes) => {
  const reduxData = useSelector((state: RootState) => state);
  const Navigate = useNavigate();

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
        style={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            display: 'flex',
          }}
        >
          <div
            style={{
              border: 'solid 2px black',
              width: '250px',
              height: '250px',
              marginRight: '40px',
            }}
          >
            이미지 때려박기
          </div>
          <div style={{ border: 'solid 2px black', marginLeft: '40px' }}>
            <div
              style={{
                border: 'solid 2px black',
                fontSize: '24px',
                fontWeight: 'bold',
              }}
            >
              <p style={{ fontSize: '20px', fontWeight: 'bold' }}>
                당신의 취향은...
              </p>
              {survey.resultType}!
            </div>
            <div style={{ fontSize: '20px', fontWeight: 'bold' }}>
              당신의 키워드 {survey.coffeeing_note}
            </div>
          </div>
        </div>
      </div>
      <LinkBtn
        onClick={() => {
          Navigate('/coffeeList');
        }}
      >
        <div style={{ marginTop: '16px' }}>나랑 잘맞는 커피를 찾아볼까요?</div>
      </LinkBtn>
    </AnalyzeBody>
  );
};

export default Analyze;
