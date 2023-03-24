import React from 'react';
import { useRef, useEffect } from 'react';
import tw from 'tailwind-styled-components';
import { Page1, Page2, Page3 } from '../components/main';

const Main = () => {
  const outerDivRef = useRef();

  useEffect(() => {
    const wheelHandler = (e: Event) => {
      console.log(1);
      e.preventDefault();
      // 스크롤 행동 구현
      const { deltaY }: any = e;
      const { scrollTop }: any = outerDivRef.current; // 스크롤 위쪽 끝부분 위치
      const pageHeight = document.body.offsetHeight; // 화면 세로길이, 100vh와 같습니다.
      //   const pageHeight = window.innerHeight; // 화면 세로길이, 100vh와 같습니다.
      console.log(scrollTop);
      console.log(pageHeight);
      if (deltaY > 0) {
        // 스크롤 내릴 때
        if (scrollTop >= 0 && scrollTop < pageHeight) {
          //현재 1페이지
          console.log('현재 1페이지, down');
          scrollTop.scrollTo({
            top: scrollTop + pageHeight,
            left: 0,
            behavior: 'smooth',
          });
        } else if (scrollTop >= pageHeight && scrollTop < pageHeight * 2) {
          //현재 2페이지
          console.log('현재 2페이지, down');
          scrollTop.scrollTo({
            top: scrollTop + pageHeight,
            left: 0,
            behavior: 'smooth',
          });
        } else {
          // 현재 3페이지
          console.log('현재 3페이지, down');
          scrollTop.scrollTo({
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
          scrollTop.scrollTo({
            top: scrollTop - pageHeight,
            left: 0,
            behavior: 'smooth',
          });
        } else if (scrollTop >= pageHeight && scrollTop < pageHeight * 2) {
          //현재 2페이지
          console.log('현재 2페이지, up');
          scrollTop.scrollTo({
            top: scrollTop - pageHeight,
            left: 0,
            behavior: 'smooth',
          });
        } else {
          // 현재 3페이지
          console.log('현재 3페이지, up');
          scrollTop.scrollTo({
            top: scrollTop - pageHeight,
            left: 0,
            behavior: 'smooth',
          });
        }
      }
    };
    const outerDivRefCurrent: any = outerDivRef.current;
    window.addEventListener('wheel', wheelHandler);
    return () => {
      window.removeEventListener('wheel', wheelHandler);
    };
  }, []);
  return (
    <Outer>
      <Page1 />
      <Page2 />
      <Page3 />
    </Outer>
  );
};

export default Main;

const Outer = tw.div`h-screen overflow-x-auto`;
