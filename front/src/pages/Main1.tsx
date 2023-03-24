import React, { useRef, useEffect, useState } from 'react';
import tw from 'tailwind-styled-components';
import { Page1, Page2, Page3 } from '../components/main';

const Main = () => {
  const outerDivRef = useRef<HTMLDivElement>(null);
  const [pagenum, setPagenum] = useState<number>(0); // 페이지 * 1 -> 2 -> 3 등등 해보려고함

  const pushText = (): void => {
    console.log(outerDivRef.current);
    if (outerDivRef.current) {
      const { scrollTop } = outerDivRef.current; // 스크롤 위쪽 끝부분 위치
      console.log(scrollTop);
      console.log(document.body.offsetHeight);
    }
  };

  useEffect(() => {
    const wheelHandler = (event: React.WheelEvent<HTMLDivElement>) => {
      if (outerDivRef.current && outerDivRef.current.scrollTop) {
        event.preventDefault();
        // 스크롤 행동 구현
        const { deltaY } = event;
        const { scrollTop } = outerDivRef.current; // 스크롤 위쪽 끝부분 위치
        const pageHeight = document.body.offsetHeight * 0.85; // 화면 세로길이, 100vh와 같습니다.
        //   const pageHeight = window.innerHeight; // 화면 세로길이, 100vh와 같습니다.
        console.log('스크롤 윗부분 : ' + scrollTop);
        console.log('화면 세로길이 : ' + pageHeight);
        if (deltaY > 0) {
          // 스크롤 내릴 때
          //현재 1페이지
          console.log('down');
          outerDivRef.current.scrollTo({
            top: scrollTop + pageHeight,
            left: 0,
            behavior: 'smooth',
          });
        } else {
          // 스크롤 올릴 때
          //현재 1페이지
          console.log('up');
          outerDivRef.current.scrollTo({
            top: scrollTop - pageHeight,
            left: 0,
            behavior: 'smooth',
          });
        }
      }
    };

    const outerDivRefCurrent: any = outerDivRef.current;
    outerDivRefCurrent?.addEventListener('wheel', wheelHandler);
    // if (outerDivRefCurrent){}
    return () => {
      outerDivRefCurrent?.removeEventListener('wheel', wheelHandler);
    };
  }, []);

  return (
    <Outer ref={outerDivRef}>
      <Page1 pushText={pushText} />
      <Page2 pushText={pushText} />
      <Page3 pushText={pushText} />
    </Outer>
  );
};

export default Main;

const Outer = tw.div`h-screen overflow-y-auto`;
