import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import tw from 'tailwind-styled-components';
import ratingfull from '../../assets/tempImg/ratingfull.png';
import ratinghalf from '../../assets/tempImg/ratinghalf.png';
import ratingempty from '../../assets/tempImg/ratingempty.png';
import { detailAPI } from '../../api/api';

interface recomType {
  flavor: number;
  acidity: number;
  sweetness: number;
  bitterness: number;
  body: number;
  balance: number;
  usergrade: number;
  coffeeingNote: string;
  decaffeination: boolean;
  description: string;
  linkDTO: null;
  nameEn: string;
  nameKo: string;
  origin: string;
  processing: string;
  rank: string;
  region: string;
  roastingPoint: string;
  summary: string;
  thumbnail: string;
}

const RecommendCarousel = () => {
  // 총 페이지(5개)
  const totalPage = 4;
  const { beanId } = useParams() as { beanId: string };
  //  현재 페이지
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideRef = useRef(null);

  const nextSlide = () => {
    if (currentSlide >= totalPage) {
      setCurrentSlide(0);
    } else {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide <= totalPage) {
      setCurrentSlide(totalPage);
    } else {
      setCurrentSlide(currentSlide - 1);
    }
  };

  // 추천원두리스트
  const [recommendBeanList, setRecommendBeanList] = useState<
    recomType[] | null
  >(null);
  useEffect(() => {
    const recomBean = async () => {
      await detailAPI
        .recommendBean(Number(beanId))
        .then((request) => {
          console.log(request.data);
          setRecommendBeanList(request.data.value);
        })
        .catch((e) => console.log(e));
    };
    recomBean();
  }, []);

  return (
    <Body>
      <Container>
        <Btn onClick={prevSlide}>&lt;</Btn>
        <Slide>
          {recommendBeanList?.map((data, i) => {
            return (
              <Img
                src={data.thumbnail}
                key={i}
                onClick={() => console.log(data)}
              />
            );
          })}
        </Slide>
        <div>
          {recommendBeanList?.map((data, i) => {
            return (
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div>{data.nameKo}</div>
                <div>{data.nameEn}</div>
                <div>
                  {data.origin}({data.region})
                </div>
                <div>
                  {recommendBeanList.map((data, i) => {
                    const RecommendRating = {
                      향: data.flavor,
                      산미: data.acidity,
                      단맛: data.sweetness,
                      쓴맛: data.bitterness,
                      바디감: data.body,
                      총점: data.usergrade,
                    };

                    const scoreArray = Object.entries(RecommendRating);
                    const beanScore = () => {
                      const scoreItem = [];

                      for (let i = 0; i < scoreArray.length; i++) {
                        const score = scoreArray[i];
                        // score[0] = 기준, score[1] = 점수
                        // console.log(score); //  ['향', 5]
                        // .5인지 판별
                        const isHalfCheck =
                          score[1] / 2 - Math.floor(score[1] / 2) > 0;

                        // 점수만큼 가득찬 이미지
                        const scoreRatingFull = [];
                        if (Number.isInteger(score[1] / 2)) {
                          for (let j = 0; j < score[1] / 2; j++) {
                            scoreRatingFull.push(
                              <Score src={ratingfull} key={j} />,
                            );
                          }
                        } else {
                          // 점수가 정수형이 아니라면 Int(score)-1 개만큼 출력
                          for (let k = 0; k < Math.floor(score[1] / 2); k++) {
                            scoreRatingFull.push(
                              <Score src={ratingfull} key={k} />,
                            );
                          }
                        }

                        // .5라면 반개 추가
                        const scoreRatingHalf = isHalfCheck ? (
                          <Score src={ratinghalf} />
                        ) : null;

                        const scoreRatingEmpty = [];
                        if (Number.isInteger(score[1] / 2)) {
                          for (let k = 0; k < 5 - score[1] / 2; k++) {
                            scoreRatingEmpty.push(
                              <Score src={ratingempty} key={k} />,
                            );
                          }
                        } else {
                          for (
                            let k = 0;
                            k < Math.floor(5 - score[1] / 2);
                            k++
                          ) {
                            scoreRatingEmpty.push(
                              <Score src={ratingempty} key={k} />,
                            );
                          }
                        }

                        scoreItem.push(
                          <ScoreTitle key={i}>
                            <p
                              style={{
                                marginRight: '16px',
                                fontWeight: 'bold',
                              }}
                            >
                              {score[0]}
                            </p>
                            {scoreRatingFull} {scoreRatingHalf}
                            {scoreRatingEmpty}
                          </ScoreTitle>,
                        );
                      }

                      return scoreItem;
                    };
                    return <div key={i}>{beanScore()}</div>;
                  })}
                </div>
              </div>
            );
          })}
        </div>
        <Btn onClick={nextSlide}>&gt;</Btn>
      </Container>
    </Body>
  );
};

export default RecommendCarousel;

const Body = tw.div`flex justify-center select-none w-100vw h-100vh my-10 `;
const Container = tw.div`flex-col `;
const Slide = tw.div`flex align-middle`;
const Img = tw.img`w-64 h-64 flex-none rounded-full justify-center mx-auto drop-shadow-xl`;
const Btn = tw.div` cursor-pointer text-8xl my-auto mx-28 hover:scale-125`;
const ScoreTitle = tw.div`text-xl flex justify-end drop-shadow-2xl`;
const Score = tw.img`w-8`;
