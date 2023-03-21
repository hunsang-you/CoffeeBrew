import React, { useRef, useEffect, useState } from 'react';
import tw from 'tailwind-styled-components';
import { Page1, Page2, Page3 } from '../components/main';

const Main = () => {
  const outerDivRef = useRef<HTMLDivElement>(null);
  // const handleIncrement = () => {
  //   console.log(1);
  //   if (outerDivRef.current) {
  //     console.log(outerDivRef.current);
  //     console.log(1);
  //   }
  //   outerDivRef.current += 1;
  //   setCount(outerDivRef.current);
  // };

  // const handleWheel = (event: React.WheelEvent<HTMLDivElement>) => {
  //   // const { scrollTop } = outerDivRef.current; // 스크롤 위쪽 끝부분 위치
  //   // if (outerDivRef) {
  //   //   console.log(scrollTop);
  //   // }
  //   // console.log('WheelEvent triggered!');
  //   // console.log('deltaX:', event.deltaX);
  //   console.log('deltaY:', event.deltaY);
  // };

  useEffect(() => {
    console.log(1);
    const wheelHandler = (event: React.WheelEvent<HTMLDivElement>) => {
      if (outerDivRef.current && outerDivRef.current.scrollTop) {
        console.log(1);
        event.preventDefault();
        // 스크롤 행동 구현
        const { deltaY } = event;
        const { scrollTop } = outerDivRef.current; // 스크롤 위쪽 끝부분 위치
        const pageHeight = document.body.offsetHeight; // 화면 세로길이, 100vh와 같습니다.
        //   const pageHeight = window.innerHeight; // 화면 세로길이, 100vh와 같습니다.
        console.log(scrollTop);
        console.log(pageHeight);
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
              top: scrollTop - pageHeight,
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

const Outer = tw.div`h-screen overflow-x-auto`;
