import tw from 'tailwind-styled-components';
import Chart from './UserChart';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { SurveyType } from './MyProfile';
import { useNavigate } from 'react-router-dom';
import flavorImg from '../../assets/tempImg/flavorImg.webp';
import sweetImg from '../../assets/tempImg/sweetImg.jpg';
import bitterImg from '../../assets/tempImg/bitterImg.jpg';
import acidityImg from '../../assets/tempImg/acidityImg.jpg';
import bodyImg from '../../assets/tempImg/BodyImg.jpg';

const AnalyzeBody = tw.div`border-2 rounded-b-lg text-center mb-4`;
const Comment = tw.div`text-3xl font-bold text-left ml-5 mb-10`;
const LinkBtn = tw.div`w-344 h-16 my-8 mx-auto border-2 bg-brownBorder text-white font-bold text-xl rounded-3xl drop-shadow-2xl cursor-pointer hover:scale-110`;

interface PropsTypes {
  survey: SurveyType;
}

const Analyze = ({ survey }: PropsTypes) => {
  const reduxData = useSelector((state: RootState) => state);
  const Navigate = useNavigate();

  const typeIndex = Number(survey.resultCode.slice(0, 1));
  const dataImg = () => {
    if (survey.resultCode.slice(0, 1) === '1') {
      return <img src={flavorImg} />;
    } else if (survey.resultCode.slice(0, 1) === '2') {
      return <img src={acidityImg} />;
    } else if (survey.resultCode.slice(0, 1) === '3') {
      return <img src={sweetImg} />;
    } else if (survey.resultCode.slice(0, 1) === '4') {
      return <img src={bitterImg} />;
    } else if (survey.resultCode.slice(0, 1) === '5') {
      return <img src={bodyImg} />;
    }
  };
  const colorList = ['#03C846', '#06AACE', '#9A6533', '#D4AA70', '#CBAC97'];
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
              width: '250px',
              height: '250px',
              marginRight: '40px',
              marginLeft: '20px',
            }}
          >
            {dataImg()}
          </div>
          <div style={{ marginLeft: '20px' }}>
            <div
              style={{
                fontSize: '24px',
                fontWeight: 'bold',
              }}
            >
              <p
                style={{
                  fontSize: '20px',
                  fontWeight: 'bold',
                  marginBottom: '16px',
                }}
              >
                당신의 취향은...
              </p>
              <p style={{ color: colorList[Number(typeIndex)] }}>
                {survey.resultType}!
              </p>
            </div>
            <div
              style={{
                fontSize: '24px',
                fontWeight: 'bold',
                textAlign: 'center',
                marginTop: '40px',
              }}
            >
              <p style={{ fontSize: '20px' }}>당신의 키워드는..</p>
              <p style={{ color: colorList[Number(typeIndex)] }}>
                {survey.coffeeing_note}
              </p>
              <p>입니다</p>
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
