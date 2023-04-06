import { useRef, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { memberAPI } from '../api/api';
import Loading from '../components/Loading';
import tw from 'tailwind-styled-components';
import { Page1, Page2, Page3, Dots } from '../components/main';
import Footer from '../components/navbarandfoot/Footer';

interface IsFooterType {
  setIsFooter: React.Dispatch<React.SetStateAction<boolean>>;
}

const Main = ({ setIsFooter }: IsFooterType) => {
  const reduxData = useSelector((state: RootState) => state);
  const outerDivRef = useRef<HTMLDivElement>(null);
  const [survey, setSurvey] = useState<number>(0);
  // const [pageN, setPageN] = useState<Number>(0);
  const [scrollIndex, setScrollIndex] = useState(1);

  const pushIndex = (N: number): void => {
    // console.log(N);
    if (outerDivRef.current && outerDivRef.current.scrollTop) {
      const pageHeight = document.body.offsetHeight;
      if (N === 1) {
        setScrollIndex(1);
        outerDivRef.current.scrollTo({
          top: pageHeight * 0.06,
          left: 0,
          behavior: 'smooth',
        });
      } else if (N === 2) {
        setScrollIndex(2);
        outerDivRef.current.scrollTo({
          top: pageHeight * 1.1,
          left: 0,
          behavior: 'smooth',
        });
      } else {
        setScrollIndex(3);
        outerDivRef.current.scrollTo({
          top: pageHeight * 2.2,
          left: 0,
          behavior: 'smooth',
        });
      }
    }
  };
  useEffect(() => {
    setIsFooter(false);
  }, [setIsFooter]);

  useEffect(() => {
    const getInfo = async () => {
      await memberAPI
        .memberSurvey()
        .then((request) => {
          if (request.data.value.param1) {
            setSurvey(2);
          } else {
            setSurvey(1);
          }
          setSurvey(request.data.value);
        })
        .catch((e) => console.log(e));
    };
    getInfo();
  }, []);

  useEffect(() => {
    const wheelHandler = (event: React.WheelEvent<HTMLDivElement>) => {
      if (outerDivRef.current && outerDivRef.current.scrollTop) {
        event.preventDefault();
        // 스크롤 행동 구현
        const { deltaY } = event;
        const { scrollTop } = outerDivRef.current; // 스크롤 위쪽 끝부분 위치
        const pageHeight = document.body.offsetHeight; // 화면 세로길이, 100vh와 같습니다.
        const fullPageH = document.body.offsetHeight * 1.1;
        // console.log('스크롤 윗부분 : ' + scrollTop);
        // console.log('화면 세로길이 : ' + pageHeight);

        if (deltaY > 0) {
          // 스크롤 내릴 때
          if (scrollTop >= 0 && scrollTop < pageHeight) {
            // console.log('현재 1페이지, down');
            setScrollIndex(2);
            outerDivRef.current.scrollTo({
              top: fullPageH,
              left: 0,
              behavior: 'smooth',
            });
          } else if (scrollTop >= pageHeight && scrollTop < pageHeight * 2) {
            // console.log('현재 2페이지, down');
            setScrollIndex(3);
            outerDivRef.current.scrollTo({
              top: fullPageH * 2,
              left: 0,
              behavior: 'smooth',
            });
          } else if (scrollTop >= pageHeight && scrollTop < pageHeight * 2.2) {
            // console.log('현재 3페이지, down');
            outerDivRef.current.scrollTo({
              top: fullPageH * 3,
              left: 0,
              behavior: 'smooth',
            });
          } else {
            // console.log('현재 푸터, down');
            outerDivRef.current.scrollTo({
              top: fullPageH * 3,
              left: 0,
              behavior: 'smooth',
            });
          }
        } else {
          // 스크롤 올릴 때
          if (scrollTop >= 0 && scrollTop < pageHeight * 0.2) {
            // console.log('현재 1페이지, up');
            outerDivRef.current.scrollTo({
              top: pageHeight * 0.06,
              left: 0,
              behavior: 'smooth',
            });
          } else if (scrollTop >= pageHeight && scrollTop < pageHeight * 1.2) {
            // console.log('현재 2페이지, up');
            setScrollIndex(1);
            outerDivRef.current.scrollTo({
              top: pageHeight * 0.06,
              left: 0,
              behavior: 'smooth',
            });
          } else if (scrollTop >= pageHeight && scrollTop < pageHeight * 2.2) {
            // console.log('현재 3페이지, up');
            setScrollIndex(2);
            outerDivRef.current.scrollTo({
              top: fullPageH,
              left: 0,
              behavior: 'smooth',
            });
          } else {
            // console.log('현재 푸터, up');
            setScrollIndex(3);
            outerDivRef.current.scrollTo({
              top: fullPageH * 2,
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
      <Dots scrollIndex={scrollIndex} pushIndex={pushIndex} />
      <img src="./qweqwe" alt="" />
      {survey === 0 ? (
        <Loading />
      ) : survey === 1 ? (
        <>
          <Page1 />
          <Page2 />
          <Page3 />
          <Footer />
        </>
      ) : (
        <>
          <Page2 />
          <Page3 />
          <Page1 />
          <Footer />
        </>
      )}
    </Outer>
  );
};

export default Main;

const Outer = tw.div`h-screen overflow-y-auto select-none`;
