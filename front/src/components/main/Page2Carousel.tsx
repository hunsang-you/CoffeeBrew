import { useState, useEffect } from 'react';
import { mainAPI } from '../../api/api';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
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
}

interface propsData {
  [index: number]: CoffeeItem;
}

const Page2Carousel = () => {
  const reudxData = useSelector((state: RootState) => state);
  const usernick = reudxData.memberInfo?.nickname;
  const userage = reudxData.memberInfo?.ageRange;
  console.log(userage);
  const [beanMain, setbeanMain] = useState<CoffeeItem[] | null>(null);
  const [ageMain, setAgeMain] = useState<CoffeeItem[] | null>(null);
  const [capsule, setCapsule] = useState<CapsuleDetailType[] | null>(null);
  const [ageCapsule, setAgeCapsule] = useState<CapsuleDetailType[] | null>(
    null,
  );

  const cutArr = (arr: []) => {
    return arr.slice(0, 5);
  };

  useEffect(() => {
    const getData = async (age: any, type: string) => {
      await mainAPI
        .getAgeRecom(age, type)
        .then((request) => {
          const data = request.data.value;
          console.log(cutArr(data));
          if (type === 'bean') {
            setAgeMain(cutArr(data));
          } else if (type === 'capsule') {
            setAgeCapsule(cutArr(data));
          }
        })
        .catch((e) => console.log(e));
    };
    const getRecommend = async (type: string) => {
      await mainAPI.getRecommend(type).then((request) => {
        if (type === 'bean') {
          setbeanMain(request.data.value);
        } else if (type === 'capsule') {
          setCapsule(request.data.value);
        }
      });
    };
    getData(userage, 'bean');
    getData(userage, 'capsule');
    getRecommend('bean');
    getRecommend('capsule');
  }, []);

  if (beanMain && capsule && ageMain && ageCapsule) {
    return (
      <Carousel>
        <BigDiv>
          {beanMain ? null : <Loading />}
          <PageTitle>{usernick}님의 추천원두</PageTitle>
          <InDiv>
            {beanMain
              ? beanMain.map((data: CoffeeItem, i) => {
                  return <CoffeeCard key={i} beanData={data} />;
                })
              : null}
          </InDiv>
          <InDiv>
            {capsule
              ? capsule.map((data: CapsuleDetailType, i) => {
                  return <CoffeeCapSule key={i} capsuleData={data} />;
                })
              : null}
          </InDiv>
        </BigDiv>
        <BigDiv>
          <PageTitle>{userage}대가 좋아하는 원두</PageTitle>
          <InDiv>
            {ageMain
              ? ageMain.map((data: CoffeeItem, i) => {
                  return <CoffeeCard key={i} beanData={data} />;
                })
              : null}
          </InDiv>
          <InDiv>
            {ageCapsule
              ? ageCapsule.map((data: CapsuleDetailType, i) => {
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

export default Page2Carousel;

const BigDiv = tw.div`flex flex-col justify-center items-center`;
const InDiv = tw.div`h-5/6 w-2/3 flex justify-center items-center`;
const PageTitle = tw.div`text-white text-6xl font-extrabold text-center mt-10`;
