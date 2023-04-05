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

  // const standard = userStandard.map((data, i) => {
  //   return data;
  // });

  // const scoreList = userScore.map((data, i) => {
  //   // console.log(data, i);
  //   return data;
  // });
  // console.log('기준', standard);
  // console.log('scoreList', scoreList);

  //커피점수콩없애기
  // const scoreArray = Object.entries(userData);
  // const beanScore = () => {
  //   const scoreItem = [];

  //   for (let i = 0; i < scoreArray.length; i++) {
  //     const score = scoreArray[i];
  //     // score[0] = 기준, score[1] = 점수
  //     // console.log(score); //  ['향', 5]
  //     // .5인지 판별
  //     const isHalfCheck = score[1] - Math.floor(score[1]) > 0;

  //     // 점수만큼 가득찬 이미지
  //     const scoreRatingFull = [];
  //     if (Number.isInteger(score[1])) {
  //       for (let j = 0; j < score[1]; j++) {
  //         scoreRatingFull.push(<Score src={ratingfull} key={j} />);
  //       }
  //     } else {
  //       // 점수가 정수형이 아니라면 Int(score)-1 개만큼 출력
  //       for (let k = 0; k < Math.floor(score[1]); k++) {
  //         scoreRatingFull.push(<Score src={ratingfull} key={k} />);
  //       }
  //     }

  //     // .5라면 반개 추가
  //     const scoreRatingHalf = isHalfCheck ? <Score src={ratinghalf} /> : null;

  //     const scoreRatingEmpty = [];
  //     if (Number.isInteger(score[1])) {
  //       for (let k = 0; k < 5 - score[1]; k++) {
  //         scoreRatingEmpty.push(<Score src={ratingempty} key={k} />);
  //       }
  //     } else {
  //       for (let k = 0; k < Math.floor(5 - score[1]); k++) {
  //         scoreRatingEmpty.push(<Score src={ratingempty} key={k} />);
  //       }
  //     }

  //     scoreItem.push(
  //       <ScoreTitle key={i}>
  //         <p style={{ marginRight: '16px', fontWeight: 'bold' }}>{score[0]}</p>
  //         {scoreRatingFull} {scoreRatingHalf}
  //         {scoreRatingEmpty}
  //       </ScoreTitle>,
  //     );
  //   }

  //   return scoreItem;
  // };

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
      <Comment>
        {' '}
        {reduxData.memberInfo?.nickname}님의 선호도 분석 입니다
      </Comment>
      <div
        style={{ display: 'flex', justifyContent: 'end', marginRight: '40px' }}
      >
        <UserTypeImg>
          {/* <img src={examtype} alt="user_type" /> */}
        </UserTypeImg>
        <div style={{ marginTop: '50px' }}>{survey.coffeeing_note}</div>
        {/* <div style={{ marginLeft: '16px' }}>
          <LinkBtn
            style={{
              backgroundColor: '#98643D',
              paddingLeft: '20px',
              paddingRight: '20px',
              paddingTop: '12px',
              paddingBottom: '12px',
            }}
          >
            맞춤 커피 보러 가기
          </LinkBtn>
        </div> */}
      </div>
    </AnalyzeBody>
  );
};

export default Analyze;
