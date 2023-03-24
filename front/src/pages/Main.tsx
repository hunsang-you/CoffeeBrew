import React, { useRef, useEffect } from 'react';
import tw from 'tailwind-styled-components';
import { Page1, Page2, Page3 } from '../components/main';

const Main = () => {
  const outerDivRef = useRef<HTMLDivElement>(null);

  const pushText = (): void => {
    console.log(outerDivRef.current);
    if (outerDivRef.current) {
      const { scrollTop } = outerDivRef.current; // 스크롤 위쪽 끝부분 위치
      console.log(scrollTop);
      console.log(document.body.offsetHeight);
    }
  };

  useEffect(() => {
    console.log(1);
    const wheelHandler = (event: React.WheelEvent<HTMLDivElement>) => {
      if (outerDivRef.current && outerDivRef.current.scrollTop) {
        event.preventDefault();
        // 스크롤 행동 구현
        const { deltaY } = event;
        const { scrollTop } = outerDivRef.current; // 스크롤 위쪽 끝부분 위치
        const pageHeight = document.body.offsetHeight * 0.9; // 화면 세로길이, 100vh와 같습니다.
        //   const pageHeight = window.innerHeight; // 화면 세로길이, 100vh와 같습니다.
        console.log('스크롤 윗부분 : ' + scrollTop);
        console.log('화면 세로길이 : ' + pageHeight);
        if (deltaY > 0) {
          // 스크롤 내릴 때
          if (scrollTop >= 0 && scrollTop < pageHeight) {
            //현재 1페이지
            console.log('현재 1페이지, down');
            outerDivRef.current.scrollTo({
              top: scrollTop + pageHeight,
              left: 0,
              behavior: 'smooth',
            });
          } else if (scrollTop >= pageHeight && scrollTop < pageHeight * 2) {
            //현재 2페이지
            console.log('현재 2페이지, down');
            outerDivRef.current.scrollTo({
              top: scrollTop + pageHeight,
              left: 0,
              behavior: 'smooth',
            });
          } else {
            // 현재 3페이지
            console.log('현재 3페이지, down');
            outerDivRef.current.scrollTo({
              top: scrollTop + pageHeight,
              left: 0,
              behavior: 'smooth',
            });
          }
        } else {
          // 스크롤 올릴 때
          if (scrollTop >= 0 && scrollTop < pageHeight) {
            //현재 1페이지
            console.log('현재 1페이지, up');
            outerDivRef.current.scrollTo({
              top: 0,
              left: 0,
              behavior: 'smooth',
            });
          } else if (scrollTop >= pageHeight && scrollTop < pageHeight * 2) {
            //현재 2페이지
            console.log('현재 2페이지, up');
            outerDivRef.current.scrollTo({
              top: scrollTop - pageHeight,
              left: 0,
              behavior: 'smooth',
            });
          } else {
            // 현재 3페이지
            console.log('현재 3페이지, up');
            outerDivRef.current.scrollTo({
              top: scrollTop - pageHeight,
              left: 0,
              behavior: 'smooth',
            });
          }
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
      <Page1 />
      <Page2 />
      <Page3 />
    </Outer>
  );
};

export default Main;

const Outer = tw.div`h-screen overflow-y-auto`;
