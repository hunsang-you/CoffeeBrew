import tw from 'tailwind-styled-components';

import bean from '../../assets/tempImg/bean.png';
import ratingfull from '../../assets/tempImg/ratingfull.png';
import ratinghalf from '../../assets/tempImg/ratinghalf.png';
import ratingempty from '../../assets/tempImg/ratingempty.png';

const ReviewBody = tw.div`min-h-screen flex flex-col mx-auto`;
const ReviewItems = tw.div`flex-col mx-auto`;
const Item = tw.div`border-y-4 border-y-brownBorder flex`;

const BeanImg = tw.img`w-40 h-40 border-4 border-white bg-black rounded-full justify-center my-2 mx-4`;

const DeleteBtn = tw.div`w-16 h-9 bg-brownBorder text-white leading-9 rounded-t-lg ml-14 cursor-pointer hover:bg-slate-500 mt-8`;

const RatingDiv = tw.div`w-400`;

const Score = tw.img`w-6 `;
const ScoreTitle = tw.div`text-xl flex justify-end drop-shadow-2xl`;

const ReviewContent = tw.div`w-240 h-60 text-sm text-nameColor font-bold text-left mt-2 pl-6 ml-4  overflow-scroll break-words`;

const userData = {
  향: 1,
  단맛: 2,
  쓴맛: 3,
  산미: 4,
  바디감: 4.5,
  총점: 3.5,
};

const MyReviewItem = () => {
  const scoreArray = Object.entries(userData);
  const beanScore = () => {
    const scoreItem = [];

    for (let i = 0; i < scoreArray.length; i++) {
      const score = scoreArray[i];
      // score[0] = 기준, score[1] = 점수
      // console.log(score); //  ['향', 5]
      // .5인지 판별
      const isHalfCheck = score[1] - Math.floor(score[1]) > 0;

      // 점수만큼 가득찬 이미지
      const scoreRatingFull = [];
      if (Number.isInteger(score[1])) {
        for (let j = 0; j < score[1]; j++) {
          scoreRatingFull.push(<Score src={ratingfull} key={j} />);
        }
      } else {
        // 점수가 정수형이 아니라면 Int(score)-1 개만큼 출력
        for (let k = 0; k < Math.floor(score[1]); k++) {
          scoreRatingFull.push(<Score src={ratingfull} key={k} />);
        }
      }

      // .5라면 반개 추가
      const scoreRatingHalf = isHalfCheck ? <Score src={ratinghalf} /> : null;

      const scoreRatingEmpty = [];
      if (Number.isInteger(score[1])) {
        for (let k = 0; k < 5 - score[1]; k++) {
          scoreRatingEmpty.push(<Score src={ratingempty} key={k} />);
        }
      } else {
        for (let k = 0; k < Math.floor(5 - score[1]); k++) {
          scoreRatingEmpty.push(<Score src={ratingempty} key={k} />);
        }
      }

      scoreItem.push(
        <ScoreTitle key={i}>
          <p style={{ marginRight: '16px', fontWeight: 'bold' }}>{score[0]}</p>
          {scoreRatingFull} {scoreRatingHalf}
          {scoreRatingEmpty}
        </ScoreTitle>,
      );
    }

    return scoreItem;
  };
  return (
    <ReviewBody>
      <ReviewItems>
        <DeleteBtn> 삭 제</DeleteBtn>
        <Item>
          <div
            style={{
              textAlign: 'center',
              marginLeft: '20px',
              marginRight: '20px',
            }}
          >
            <div style={{ marginTop: '24px', fontWeight: 'bold' }}>
              2023-04-01
            </div>
            <BeanImg src={bean} />
            <p
              style={{
                fontSize: '20px',
                fontWeight: 'bold',
                color: '#9A6533',
                width: '200px',
                wordBreak: 'break-word',
                marginBottom: '16px',
              }}
            >
              원두이름
            </p>
          </div>

          <div
            style={{
              width: '200px',
              height: '200px',
              marginTop: '5%',
            }}
          >
            {beanScore()}
          </div>
          <ReviewContent>
            <div style={{ height: '180px' }}>
              원두가 맛있어요 원두가 맛있어요 원두가 맛있어요 원두가 맛있어요
              원두가 맛있어요 원두가 맛있어요
            </div>
          </ReviewContent>
        </Item>
      </ReviewItems>
    </ReviewBody>
  );
};

export default MyReviewItem;
