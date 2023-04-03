import { useState, useEffect } from 'react';
import { mainAPI } from '../../api/api';
import tw from 'tailwind-styled-components';
import Page2Carousel from './Page2Carousel';

const Page2 = () => {
  const [Recommend, setRecommend] = useState({});

  useEffect(() => {
    const getData = async (beanId: number) => {
      try {
        const beanRes = await mainAPI.getBeanRecom(beanId);
        const capcullRes = await mainAPI.getcapcullRecom(beanId);
        const beanData = beanRes.data;
        const capcullData = capcullRes.data;
        setRecommend({ bean: beanData, capcull: capcullData });
        console.log(beanData);
        console.log(capcullData);
      } catch (err) {
        console.log(err);
      }
    };
    getData(1);
  }, []);

  return (
    <Inner>
      <CarouselDiv>
        <Page2Carousel rec={'bean'} />
        <Page2Carousel rec={'capcull'} />
      </CarouselDiv>
    </Inner>
  );
};

export default Page2;

const Inner = tw.div`h-screen flex justify-center items-center bg-mainBg2 bg-cover`;
const CarouselDiv = tw.div`w-full`;
