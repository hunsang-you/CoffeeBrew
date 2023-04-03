import { useState, useEffect } from 'react';
import { mainAPI } from '../../api/api';
import tw from 'tailwind-styled-components';
import Carousel from 'react-material-ui-carousel';
import CoffeeCard from '../CoffeeCard';

interface strProps {
  rec: string;
}

type CoffeeItem = {
  nameKo?: string;
  nameEn?: string | null;
  summary?: string | null;
  thumbnail?: string | null;
  userGrade?: number;
  description?: string | null;
  origin?: string;
  region?: string;
  rank?: string | null;
  processing?: string | null;
  decaffeination?: boolean | null;
  balance?: number | null;
  flavor?: number;
  acidity?: number;
  sweetness?: number;
  bitterness?: number;
  body?: number;
  coffeeingNote?: string | null;
  roastingPoint?: string | null;
};

interface propsData {
  [index: number]: CoffeeItem;
}

const Page2Carousel = ({ rec }: strProps) => {
  const [beanRe, setBeanRe] = useState([
    {
      origin: '',
      region: '',
      rank: '',
      processing: '',
      balance: 0,
      flavor: 0,
      acidity: 0,
      sweetness: 0,
      bitterness: 0,
      body: 0,
      coffeeingNote: '',
      roastingPoint: '',
    },
  ]);
  const [capcullRe, setCapcullRe] = useState([
    {
      origin: '',
      region: '',
      rank: '',
      processing: '',
      balance: 0,
      flavor: 0,
      acidity: 0,
      sweetness: 0,
      bitterness: 0,
      body: 0,
      coffeeingNote: '',
      roastingPoint: '',
    },
  ]);

  const cutArr = (arr: []) => {
    return arr.slice(0, 4);
  };

  useEffect(() => {
    const getData = async (beanId: number) => {
      try {
        const beanRes = await mainAPI.getBeanRecom(beanId);
        const capcullRes = await mainAPI.getcapcullRecom(beanId);
        const beanData = beanRes.data.value;
        const capcullData = capcullRes.data.value;
        setBeanRe(cutArr(beanData));
        setCapcullRe(cutArr(capcullData));
        console.log(beanData);
        console.log(capcullData);
      } catch (err) {
        console.log(err);
      }
    };
    getData(1);
  }, []);

  useEffect(() => {});
  return (
    <Carousel>
      {[1, 2].map(() => {
        return (
          <BigDiv>
            {rec === 'bean'
              ? beanRe.map((data: propsData, i) => {
                  return <CoffeeCard key={i} propsdata={data} />;
                })
              : rec === 'capcull'
              ? capcullRe.map((data: propsData, i) => {
                  return <CoffeeCard key={i} propsdata={data} />;
                })
              : null}
          </BigDiv>
        );
      })}
    </Carousel>
  );
};

export default Page2Carousel;

const BigDiv = tw.div`flex justify-center items-center`;
