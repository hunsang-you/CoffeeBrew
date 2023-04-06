import tw from 'tailwind-styled-components';
import { useState, useEffect } from 'react';
import bean from '../../assets/tempImg/bean.png';
import ratingfull from '../../assets/tempImg/ratingfull.png';
import ratinghalf from '../../assets/tempImg/ratinghalf.png';
import ratingempty from '../../assets/tempImg/ratingempty.png';
import { ReviewType } from './MyReview';
import { reviewAPI, memberAPI } from '../../api/api';
import NoReviewImg from '../../assets/tempImg/NoReviewImg.png';
import { useNavigate } from 'react-router-dom';
import { ReviewPageType } from './MyReview';
import acidityCapsuleImg from '../../assets/detailImg/acidityCapsule.svg';
import flavorCapsuleImg from '../../assets/detailImg/flavorCapsule.svg';
import bodyCapsuleImg from '../../assets/detailImg/bodyCapsule.svg';
import bitterCapsuleImg from '../../assets/detailImg/bitterCapsule.svg';
import roastingCapsuleImg from '../../assets/detailImg/roastingCapsule.svg';
import acidityImg from '../../assets/detailImg/acidityBean.svg';
import bitternessImg from '../../assets/detailImg/bitterBean.svg';
import sweetnessImg from '../../assets/detailImg/sweetBean.svg';
import flavorImg from '../../assets/detailImg/flavorBean.svg';
import bodyImg from '../../assets/detailImg/bodyBean.svg';

const ReviewBody = tw.div` flex flex-col mx-auto`;
const ReviewItems = tw.div`flex-col mx-auto`;
const Item = tw.div`border-y-4 border-y-brownBorder flex`;

const BeanImg = tw.img`w-40 h-40 border-4 border-white bg-black rounded-full justify-center my-2 mx-4`;

const DeleteBtn = tw.div`w-16 h-9 bg-brownBorder text-white leading-9 rounded-t-lg ml-14 cursor-pointer hover:bg-slate-500 mt-8`;

const RatingDiv = tw.div`w-400`;

const Score = tw.img`w-6 `;
const ScoreTitle = tw.div`text-xl flex justify-end drop-shadow-2xl`;

const ReviewContent = tw.div`w-240 h-48 text-sm text-nameColor font-bold text-left my-auto pl-6 ml-4  overflow-scroll break-words`;

const NoReviewBody = tw.div`rounded-b-lg text-center mb-4`;
const NoComment = tw.div`text-2xl font-bold text-left ml-10 mb-5 mt-5`;
const NoUserReviewImg = tw.div`w-700 mx-auto`;
const NoLinkBtn = tw.div`w-80 h-16 font-bold text-2xl text-white bg-brownBorder rounded-3xl cursor-pointer hover:scale-110 mx-auto my-10"`;

interface PropsTypes {
  reviewData: ReviewType;
  setReviewPage: React.Dispatch<React.SetStateAction<string>>;
  setMemberReviews: React.Dispatch<React.SetStateAction<ReviewPageType | null>>;
  reviewPage: string;
}

const MyReviewItem = ({
  reviewData,
  setReviewPage,
  reviewPage,
  setMemberReviews,
}: PropsTypes) => {
  const navigate = useNavigate();
  const [capsuleImg, setCapsuleImg] = useState([
    acidityCapsuleImg,
    bitterCapsuleImg,
    flavorCapsuleImg,
    bodyCapsuleImg,
    roastingCapsuleImg,
  ]);
  const [beanImg, setBeanImg] = useState([
    acidityImg,
    bitternessImg,
    flavorImg,
    bodyImg,
    sweetnessImg,
  ]);
  const [imgIdx, setImgIdx] = useState(0);

  const Rating = {
    향: reviewData.flavor,
    산미: reviewData.acidity,
    단맛: reviewData.sweetness,
    바디감: reviewData.body,
    쓴맛: reviewData.bitterness,
    총점: reviewData.overall,
  };
  useEffect(() => {
    const acidity = reviewData.acidity;
    const bitter = reviewData.bitterness;
    const body = reviewData.body;
    const flavor = reviewData.flavor;
    const sweetness = reviewData.sweetness;
    const values: any[] = [acidity, bitter, body, flavor, sweetness];
    const maxIndex: number = values.indexOf(Math.max(...values));
    setImgIdx(maxIndex);
  }, []);
  const beanScore = () => {
    const scoreItem = [];
    const scoreArray = Object.entries(Rating);
    for (let j = 0; j < scoreArray.length; j++) {
      const score = scoreArray[j];
      const isHalfCheck = score[1] / 2 - Math.floor(score[1] / 2) > 0;

      // 점수만큼 가득찬 이미지
      const scoreRatingFull = [];
      if (Number.isInteger(score[1] / 2)) {
        for (let k = 0; k < score[1] / 2; k++) {
          scoreRatingFull.push(<Score src={ratingfull} key={k} />);
        }
      } else {
        // 점수가 정수형이 아니라면 Int(score)-1 개만큼 출력
        for (let k = 0; k < Math.floor(score[1] / 2); k++) {
          scoreRatingFull.push(<Score src={ratingfull} key={k} />);
        }
      }

      // .5라면 반개 추가
      const scoreRatingHalf = isHalfCheck ? <Score src={ratinghalf} /> : null;

      const scoreRatingEmpty = [];
      if (Number.isInteger(score[1] / 2)) {
        for (let k = 0; k < 5 - score[1] / 2; k++) {
          scoreRatingEmpty.push(<Score src={ratingempty} key={k} />);
        }
      } else {
        for (let k = 0; k < Math.floor(5 - score[1] / 2); k++) {
          scoreRatingEmpty.push(<Score src={ratingempty} key={k} />);
        }
      }

      scoreItem.push(
        <ScoreTitle>
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
        <DeleteBtn
          onClick={() => {
            reviewAPI
              .deleteReview(Number(reviewData.idx))
              .then((request) => {
                console.log(request.data);
                memberAPI
                  .memberReviews(reviewPage)
                  .then((request) => {
                    console.log(request);
                    setMemberReviews(request.data.value);
                  })
                  .catch((e) => {
                    console.log(e);
                    window.location.reload();
                  });
              })
              .catch((e) => console.log(e));
          }}
        >
          {' '}
          삭 제
        </DeleteBtn>
        <Item>
          <div
            style={{
              textAlign: 'center',
              marginLeft: '20px',
              marginRight: '20px',
            }}
          >
            <div style={{ marginTop: '24px', fontWeight: 'bold' }}>
              {reviewData.createdDate
                ? reviewData.createdDate[0] +
                  '년' +
                  ' ' +
                  reviewData.createdDate[1] +
                  '월' +
                  ' ' +
                  reviewData.createdDate[2] +
                  '일' +
                  ' ' +
                  reviewData.createdDate[3] +
                  '시'
                : null}
            </div>
            <BeanImg
              src={
                reviewData.itemType === 'capsule'
                  ? capsuleImg[imgIdx]
                  : beanImg[imgIdx]
              }
              alt="no_img"
            />
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
              {reviewData.itemName}
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
            <div style={{ height: '160px' }}>{reviewData.content}</div>
          </ReviewContent>
        </Item>
      </ReviewItems>
    </ReviewBody>
  );
};

export default MyReviewItem;
