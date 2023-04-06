import { useState, useEffect } from 'react';
import { mainAPI } from '../../api/api';
import tw from 'tailwind-styled-components';
import Carousel from 'react-material-ui-carousel';
import CoffeeCard from '../CoffeeCard';
import CoffeeCapSule from '../CoffeeCapSule';

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

const Page2Non = () => {
  const [nonBean1, setNonBean1] = useState([
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
  const [nonBean2, setNonBean2] = useState([
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
  const [noncapsule1, setNoncapsule1] = useState([
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
  const [noncapsule2, setNoncapsule2] = useState([
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

  const cutArr = (arr: [], s: number, e: number) => {
    return arr.slice(s, e);
  };

  useEffect(() => {
    const getData = async (type: any) => {
      await mainAPI
        .getNonRecom(type)
        .then((request) => {
          const data = request.data.value;
          console.log(cutArr(data, 0, 8));
          if (type === 'bean') {
            setNonBean1(cutArr(data, 0, 4));
            setNonBean2(cutArr(data, 4, 8));
          } else if (type === 'capsule') {
            setNoncapsule1(cutArr(data, 0, 4));
            setNoncapsule2(cutArr(data, 4, 8));
          }
        })
        .catch((e) => console.log(e));
    };
    getData('bean');
    getData('capsule');
  }, []);

  return (
    <Carousel>
      <BigDiv>
        <PageTitle>모두가 사랑하는 원두</PageTitle>
        <InDiv>
          {nonBean1.map((data: propsData, i) => {
            return <CoffeeCard key={i} beanData={data} />;
          })}
        </InDiv>
        <InDiv>
          {noncapsule1.map((data: propsData, i) => {
            return <CoffeeCard key={i} beanData={data} />;
          })}
        </InDiv>
      </BigDiv>
      <BigDiv>
        <PageTitle>모두가 사랑하는 원두</PageTitle>
        <InDiv>
          {nonBean2.map((data: propsData, i) => {
            return <CoffeeCard key={i} beanData={data} />;
          })}
        </InDiv>
        <InDiv>
          {noncapsule2.map((data: propsData, i) => {
            return <CoffeeCard key={i} beanData={data} />;
          })}
        </InDiv>
      </BigDiv>
    </Carousel>
  );
};

export default Page2Non;

const BigDiv = tw.div`flex flex-col justify-center items-center`;
const InDiv = tw.div`h-5/6 w-2/3 flex justify-center items-center`;
const PageTitle = tw.div`text-white text-6xl font-extrabold text-center mt-10`;
