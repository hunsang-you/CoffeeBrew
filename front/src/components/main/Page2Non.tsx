import { useState, useEffect } from 'react';
import { mainAPI } from '../../api/api';
import tw from 'tailwind-styled-components';
import Carousel from 'react-material-ui-carousel';
import CoffeeCard from '../CoffeeCard';
import CoffeeCapSule from '../CoffeeCapSule';
import { CapsuleDetailType } from '../detailcapsule/DetailCapsule';
import Loading from '../Loading';

interface CoffeeItem {
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
  idx: number;
}

interface propsData {
  [index: number]: CoffeeItem;
}

const Page2Non = () => {
  const [nonBean1, setNonBean1] = useState<CoffeeItem[] | null>(null);
  const [nonBean2, setNonBean2] = useState<CoffeeItem[] | null>(null);
  const [noncapsule1, setNoncapsule1] = useState<CapsuleDetailType[] | null>(
    null,
  );
  const [noncapsule2, setNoncapsule2] = useState<CapsuleDetailType[] | null>(
    null,
  );

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

  if (nonBean1 && nonBean2 && noncapsule1 && noncapsule2) {
    return (
      <Carousel>
        <BigDiv>
          <PageTitle>모두가 사랑하는 원두</PageTitle>
          <InDiv>
            {nonBean1
              ? nonBean1.map((data: CoffeeItem, i) => {
                  return <CoffeeCard key={i} beanData={data} />;
                })
              : null}
          </InDiv>
          <InDiv>
            {noncapsule1
              ? noncapsule1.map((data: CapsuleDetailType, i) => {
                  return <CoffeeCapSule key={i} capsuleData={data} />;
                })
              : null}
          </InDiv>
        </BigDiv>
        <BigDiv>
          <PageTitle>모두가 사랑하는 원두</PageTitle>
          <InDiv>
            {nonBean2
              ? nonBean2.map((data: CoffeeItem, i) => {
                  return <CoffeeCard key={i} beanData={data} />;
                })
              : null}
          </InDiv>
          <InDiv>
            {noncapsule2
              ? noncapsule2.map((data: CapsuleDetailType, i) => {
                  return <CoffeeCapSule key={i} capsuleData={data} />;
                })
              : null}
          </InDiv>
        </BigDiv>
      </Carousel>
    );
  } else {
    return <Loading />;
  }
};

export default Page2Non;

const BigDiv = tw.div`flex flex-col justify-center items-center`;
const InDiv = tw.div`h-2/3 w-2/3 flex justify-center items-center`;
const PageTitle = tw.div`text-white text-6xl font-extrabold text-center mt-10`;
