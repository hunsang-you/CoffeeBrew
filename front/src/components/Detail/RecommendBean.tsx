import tw from 'tailwind-styled-components';
import { useState, useRef, useEffect } from 'react';
import bean from '../../assets/bean.png';
import bean2 from '../../assets/bean2.png';
import grinding2 from '../../assets/grinding2.png';
import machine1 from '../../assets/machine1.png';
import kakao from '../../assets/kakao_login_large_narrow.png';

const Body = tw.div`flex align-middle justify-center select-none w-100vw h-100vh`;
const Container = tw.div`flex-col `;
const Slide = tw.div`flex align-middle`;
const Window = tw.div` overflow-hidden`;
const FlexBox = tw.div`flex`;
const Img = tw.img`w-64 h-64 flex-none rounded-full`;
const Btn = tw.div`flex cursor-pointer text-8xl my-auto mx-40 `;
const Position = tw.div`mb-6 flex justify-center`;
const Current = tw.div`bg-gray-500 rounded-full w-3 h-3 ml-5  cursor-pointer`;
const Dot = tw(Current)`bg-orange-400 w-10 ml-5 cursor-pointer`;

const RecommendBean = (): JSX.Element => {
  // 캐러셀 페이지 순서 확인
  const [page, setPage] = useState(0);

  // 캐러셀 이미지 넣을 곳
  const images = useRef([
    {
      src: [bean, bean2, grinding2, machine1, kakao],
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
  };

  useEffect(() => {
    setStyle({ marginLeft: `-${current}00%` });
  }, [current]);
  return (
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
        <Slide>
          <Btn onClick={() => moveSlide(-1)}>&lt;</Btn>

          {/* carousel 출력 */}
          <Window>
            <div className="flexBox" style={style}>
              {images.current.map((img, i) => (
                <Img
                  key={i}
                  style={{ backgroundImage: `url(${img.src[page]})` }}
                ></Img>
              ))}
            </div>
          </Window>
          <Btn onClick={() => moveSlide(1)}>&gt;</Btn>
        </Slide>
      </Container>
    </Body>
  );
};

export default RecommendBean;
