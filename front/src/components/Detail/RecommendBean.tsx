import tw from 'tailwind-styled-components';
import { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import bean from '../../assets/tempImg/bean.png';
import bean2 from '../../assets/tempImg/bean2.png';
import grinding2 from '../../assets/tempImg/grinding2.png';
import machine1 from '../../assets/tempImg/machine1.png';
import spin from '../../assets/Spin-1s-200px.gif';
import ratingfull from '../../assets/tempImg/ratingfull.png';
import ratinghalf from '../../assets/tempImg/ratinghalf.png';
import ratingempty from '../../assets/tempImg/ratingempty.png';
import { detailAPI } from '../../api/api';

// const RecboxBean = tw.div`flex justify-center w-1000  mx-auto flex-col `;
const Body = tw.div`flex justify-center select-none w-100vw h-100vh my-10 `;
const Container = tw.div`flex-col `;
const Slide = tw.div`flex align-middle`;

const Img = tw.img`w-64 h-64 flex-none rounded-full justify-center mx-auto drop-shadow-xl`;
const Btn = tw.div` cursor-pointer text-8xl my-auto mx-28 hover:scale-125`;
const Position = tw.div`mb-6 flex justify-center`;
const Current = tw.div`bg-gray-500 rounded-full w-3 h-3 ml-5  cursor-pointer`;
const Dot = tw(Current)`bg-orange-400 w-10 ml-5 cursor-pointer`;

const ScoreTitle = tw.div`text-xl flex justify-end drop-shadow-2xl`;
const Score = tw.img`w-8`;

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

const RecommendBean = (): JSX.Element => {
  // 캐러셀 페이지 순서 확인
  const [page, setPage] = useState(0);
  const { beanId } = useParams() as { beanId: string };

  const [recommendBeanList, setRecommendBeanList] = useState<recomType[]>([]);

  useEffect(() => {
    const recomBean = async () => {
      await detailAPI
        .recommendBean(Number(beanId))
        .then((request) => {
          console.log(request.data);
          setRecommendBeanList(request.data);
        })
        .catch((e) => console.log(e));
      recomBean();
    };
  }, []);
  // 캐러셀 이미지 넣을 곳
  const images = useRef([
    {
      src: [bean, bean2, grinding2, machine1, spin],
    },
  ]);
  const [current, setCurrent] = useState(0);
  const [style, setStyle] = useState({
    marginLeft: `-${current}00%`,
  });
  const imgSize = useRef(images.current.length);

  // 캐러셀 이동
  const moveSlide = (i: number) => {
    let nextIndex = current + i;

    if (nextIndex < 0) nextIndex = imgSize.current - 1;
    else if (nextIndex >= imgSize.current) nextIndex = 0;

    // page 이동 -> 넘어가면 처음 혹은 마지막으로
    if (0 < page + i && page + i !== images.current[0].src.length) {
      setPage(page + i);
    } else if (page + i < 0) {
      setPage(images.current[0].src.length - 1);
    } else setPage(0);

    setStyle({ marginLeft: `-${nextIndex}00%` }); // 변경된 nextIndex 값으로 style 변수 업데이트
    setCurrent(nextIndex);
    // console.log(images.current);
  };

  useEffect(() => {
    setStyle({ marginLeft: `-${current}00%` });
  }, [current]);

  return (
    // <RecboxBean>
    <Body>
      <Container>
        {/* 위치표시 */}
        <Position>
          {images.current[0].src.map((x, i) => {
            // console.log(images.current[0].src.length - 1, i);
            if (page !== i) {
              return (
                <Current
                  key={i}
                  onClick={() => {
                    setPage(i);
                  }}
                ></Current>
              );
            } else if (page === i) {
              return <Dot key={i}></Dot>;
            }
          })}
        </Position>
        <div style={{ display: 'flex', position: 'relative' }}>
          <Btn onClick={() => moveSlide(-1)}>&lt;</Btn>
          {/* carousel 출력 */}

          {recommendBeanList
            ? recommendBeanList?.map((data, i) => {
                const RecommendRating = {
                  향: data.flavor,
                  산미: data.acidity,
                  단맛: data.sweetness,
                  쓴맛: data.bitterness,
                  바디감: data.body,
                };

                const scoreArray = Object.entries(RecommendRating);
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
                        scoreRatingFull.push(
                          <Score src={ratingfull} key={j} />,
                        );
                      }
                    } else {
                      // 점수가 정수형이 아니라면 Int(score)-1 개만큼 출력
                      for (let k = 0; k < Math.floor(score[1]); k++) {
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
                    if (Number.isInteger(score[1])) {
                      for (let k = 0; k < 5 - score[1]; k++) {
                        scoreRatingEmpty.push(
                          <Score src={ratingempty} key={k} />,
                        );
                      }
                    } else {
                      for (let k = 0; k < Math.floor(5 - score[1]); k++) {
                        scoreRatingEmpty.push(
                          <Score src={ratingempty} key={k} />,
                        );
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
                  <Slide onClick={() => console.log(data)}>
                    <div
                      style={{ width: '640px', fontSize: '32px' }}
                      onClick={() => {
                        console.log(data);
                      }}
                    >
                      <div className="flexBox" style={style}>
                        <div
                          key={i}
                          style={{ display: 'flex', flexDirection: 'row' }}
                        >
                          <Img
                            key={i}
                            style={{ backgroundImage: `${data.thumbnail}` }}
                          />
                          <div style={{ marginLeft: '16px', width: '450px' }}>
                            <div
                              style={{
                                wordBreak: 'break-word',
                                fontSize: '24px',
                              }}
                              key={i}
                            >
                              {data.nameKo}
                            </div>
                            <div
                              style={{
                                textAlign: 'start',
                                fontSize: '20px',
                                marginLeft: '8px',
                              }}
                            >
                              {data.origin}({data.region})
                            </div>
                            <div>{beanScore()}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Slide>
                );
              })
            : null}

          <Btn onClick={() => moveSlide(1)}>&gt;</Btn>
        </div>
      </Container>
    </Body>
    // </RecboxBean>
  );
};

export default RecommendBean;
