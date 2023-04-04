import tw from 'tailwind-styled-components';
import { useState, useRef, useEffect } from 'react';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { useParams } from 'react-router-dom';
import ratingfull from '../../assets/tempImg/ratingfull.png';
import ratinghalf from '../../assets/tempImg/ratinghalf.png';
import ratingempty from '../../assets/tempImg/ratingempty.png';
import { reviewType } from './DetailBean';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { reviewAPI } from '../../api/api';

interface PropsTypes {
  detailReview?: reviewType[];
}
const ReviewLists = ({ detailReview }: PropsTypes) => {
  const reduxData = useSelector((state: RootState) => state);
  // 리뷰 최신/추천 순 조회버튼
  const [isActive, setIsActive] = useState(true);
  const activeBtn = () => {
    setIsActive(!isActive);
  };

  // 리뷰 좋아요 토글
  const [reviewLike, setReviewLike] = useState(false);
  const handleReviewLike = () => {
    setReviewLike(!reviewLike);
  };

  // 리뷰 더보기
  const [showNumber, setShowNumber] = useState(1);
  const showMore = () => {
    setShowNumber(showNumber + 3);
  };

  // 리뷰 접기 시 페이지 위로 올리기
  const reviewRef = useRef<HTMLDivElement>(null);
  const moveReview = () => {
    if (reviewRef.current) {
      const location: number = reviewRef.current.offsetTop;
      window.scrollTo({ top: location - 100, behavior: 'smooth' });
    }
  };

  // 내 리뷰 삭제

  return (
    <div>
      <ReviewList ref={reviewRef} id="Review" style={{ maxHeight: '1000x' }}>
        <ReviewFilter>
          {isActive ? (
            <FilterOn>최신순</FilterOn>
          ) : (
            <FilterOff onClick={activeBtn}>최신순</FilterOff>
          )}
          {isActive ? (
            <FilterOff onClick={activeBtn}>추천순</FilterOff>
          ) : (
            <FilterOn>추천순</FilterOn>
          )}
        </ReviewFilter>
        {showNumber > 1 ? (
          <MoreBtn
            style={{
              marginBottom: '12px',
              fontWeight: 'bold',
              backgroundColor: '#9A6533',
            }}
            onClick={() => {
              setShowNumber(1);
            }}
          >
            리뷰 접기▲
          </MoreBtn>
        ) : null}
        {detailReview ? (
          detailReview?.slice(0, showNumber).map((data: any, i) => {
            const Rating = {
              향: data.flavor,
              산미: data.acidity,
              단맛: data.sweetness,
              바디감: data.body,
              쓴맛: data.bitterness,
              총점: data.overall,
            };
            const beanScore = () => {
              const scoreItem = [];
              const scoreArray = Object.entries(Rating);
              for (let j = 0; j < scoreArray.length; j++) {
                const score = scoreArray[j];
                // score[0] = 기준, score[1] = 점수
                // console.log(score); //  ['향', 5]
                // .5인지 판별
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
                const scoreRatingHalf = isHalfCheck ? (
                  <Score src={ratinghalf} />
                ) : null;

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
                  <ScoreTitle key={i}>
                    <p style={{ marginRight: '16px', fontWeight: 'bold' }}>
                      {score[0]}
                    </p>
                    {scoreRatingFull} {scoreRatingHalf}
                    {scoreRatingEmpty}
                  </ScoreTitle>,
                );
              }
              return scoreItem;
            };
            return (
              <div>
                {data.profile.hashcode === reduxData.memberInfo?.hashcode ? (
                  <ReviewDelete
                    onClick={() => {
                      if (
                        data.profile.hashcode === reduxData.memberInfo?.hashcode
                      ) {
                        reviewAPI
                          .deleteReview(Number(data.idx))
                          .then((request) => {
                            console.log('리뷰삭제', request.data);
                          })
                          .catch((e) => console.log(e));
                      }
                    }}
                  >
                    삭제
                  </ReviewDelete>
                ) : null}
                <ReviewItem>
                  <ReviewName>
                    <ReviewCreated>
                      {data.createdDate[0] +
                        '년' +
                        ' ' +
                        data.createdDate[1] +
                        '월' +
                        ' ' +
                        data.createdDate[2] +
                        '일' +
                        ' ' +
                        data.createdDate[3] +
                        '시'}
                    </ReviewCreated>
                    {reviewLike ? (
                      <AiFillHeart
                        size={30}
                        onClick={handleReviewLike}
                        style={{ color: 'red', margin: 'auto' }}
                      />
                    ) : (
                      <AiOutlineHeart
                        size={30}
                        onClick={handleReviewLike}
                        style={{ color: 'gray', margin: 'auto' }}
                      />
                    )}
                    <ReviewImg src={data.profile.profileImg} />
                    {data.profile.nickname}
                  </ReviewName>
                  <ReviewStandard>
                    <ReviewStandardTop>
                      <div>{beanScore()}</div>
                    </ReviewStandardTop>
                    <ReviewArticle>
                      <ReviewContent>{data.content}</ReviewContent>
                    </ReviewArticle>
                  </ReviewStandard>
                </ReviewItem>
              </div>
            );
          })
        ) : (
          <ReviewItem> 아직 리뷰가 없어요 </ReviewItem>
        )}

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            marginLeft: '40%',
          }}
        >
          {showNumber > 1 ? (
            <MoreBtn
              style={{
                marginBottom: '12px',
                fontWeight: 'bold',
                backgroundColor: '#9A6533',
              }}
              onClick={() => {
                setShowNumber(1);
                moveReview();
              }}
            >
              리뷰 접기 ▲
            </MoreBtn>
          ) : null}

          <MoreBtn onClick={() => showMore()}>리뷰 더보기 ▼</MoreBtn>
        </div>
      </ReviewList>
    </div>
  );
};

export default ReviewLists;

// 최신순, 추천순
const ReviewFilter = tw.div`flex flex-row mb-4 justify-end mr-14`;
const FilterOn = tw.div`w-24 h-10 rounded-full border-2 text-2xl text-center leading-9  bg-black text-white ml-4`;
const FilterOff = tw.div`w-24 h-10 rounded-full border-2 bg-gray-300 text-2xl  text-black leading-9 ml-4 cursor-pointer hover:bg-slate-500`;

const ReviewList = tw.div`w-1000 mx-auto`;
const ReviewDelete = tw.div`w-16 h-9 bg-brownBorder text-white leading-9 rounded-t-lg ml-14 cursor-pointer hover:bg-slate-500`;
const ReviewItem = tw.div`flex w-1000 border-y-4 border-brownBorder mb-6 overflow-y-auto`;
const ReviewName = tw.div`text-xl  mt-12 mb-4`;
const ReviewImg = tw.img`w-60 h-60 rounded-full mb-4 mx-auto`;

// 리뷰내 평가도 (2줄)
const ReviewStandard = tw.div`justify-center mx-auto mt-6`;
const ReviewStandardTop = tw.div`w-720 text-2xl mb-2 flex justify-center`;
// const ReviewStandardBottom = tw.div`w-720 text-2xl mt-2 mb-2 flex justify-center`;
const Score = tw.img`w-8`;
const ScoreTitle = tw.div`text-xl flex justify-end  drop-shadow-2xl`;
// 리뷰내용
const ReviewArticle = tw.div`w-720 border-t-4 border-gray-500 `;
// const ReviewTitle = tw.div`text-left text-2xl text-gray-600 ml-4 mt-4 mb-auto mr-auto`;
const ReviewContent = tw.div`text-left ml-4 mt-4 h-fit text-gray-600 mb-4 text-2xl mr-auto`;
const ReviewCreated = tw.p`text-sm font-bold`;
const MoreBtn = tw.button`w-40 h-10 bg-black text-white rounded-full mt-5 mb-4 cursor-pointer hover:bg-slate-500`;
