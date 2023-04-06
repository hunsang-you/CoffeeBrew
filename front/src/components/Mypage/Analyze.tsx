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
import noanalyze from '../../assets/tempImg/noanalyze.png';

const AnalyzeBody = tw.div`border-2 rounded-b-lg text-center mb-4`;
const Comment = tw.div`text-3xl font-bold text-left ml-5 mb-10`;
const LinkBtn = tw.div`w-344 h-16 my-8 mx-auto border-2 bg-brownBorder text-white font-bold text-xl rounded-3xl drop-shadow-2xl cursor-pointer hover:scale-110`;
const NoAnalyzeBody = tw.div`border-2 rounded-b-lg text-center mb-4`;
const NoComment = tw.div`text-2xl font-bold text-left ml-10 mb-5 mt-5`;
const NoUserTypeImg = tw.div`w-720 mx-auto`;
const NoLinkBtn = tw.div`w-80 h-16 font-bold text-2xl text-white bg-brownBorder rounded-3xl cursor-pointer hover:scale-110 mx-auto my-10`;

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
    <div>
      {survey ? (
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
            {reduxData.memberInfo?.nickname}님의 선호도 분석 입니다
          </Comment>
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
                    fontSize: '20px',
                    fontWeight: 'bold',
                  }}
                >
                  <p>당신의 취향은...</p>
                  <p style={{ color: colorList[Number(typeIndex)] }}>
                    {survey.resultType}!
                  </p>
                </div>
                <div
                  style={{
                    fontSize: '20px',
                    fontWeight: 'bold',
                    textAlign: 'center',
                    marginTop: '40px',
                  }}
                >
                  <p>당신의 키워드는..</p>
                  <p style={{ color: colorList[Number(typeIndex)] }}>
                    {survey.coffeeing_note}
                  </p>
                  <p>입니다</p>
                </div>
              </div>
            </div>
          </div>
          <div style={{ display: 'flex' }}>
            <LinkBtn
              onClick={() => {
                Navigate('/coffeeList/bean');
              }}
            >
              <div style={{ marginTop: '16px' }}>
                나랑 잘맞는 원두를 찾아볼까요?
              </div>
            </LinkBtn>
            <LinkBtn
              onClick={() => {
                Navigate('/coffeeList/capsule');
              }}
            >
              <div style={{ marginTop: '16px' }}>
                나랑 잘맞는 캡슐을 찾아볼까요?
              </div>
            </LinkBtn>
          </div>
        </AnalyzeBody>
      ) : (
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
            <p style={{ paddingTop: '16px' }}>설문하러가기</p>
          </NoLinkBtn>
        </NoAnalyzeBody>
      )}
    </div>
  );
};

export default Analyze;
