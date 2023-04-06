import { useState, useEffect } from 'react';
import { mainAPI } from '../../api/api';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import tw from 'tailwind-styled-components';
import Carousel from 'react-material-ui-carousel';
import CoffeeCard from '../CoffeeCard';
import CoffeeCapSule from '../CoffeeCapSule';
import { CapsuleDetailType } from '../detailcapsule/DetailCapsule';

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

const Page2Carousel = () => {
  const reudxData = useSelector((state: RootState) => state);
  const usernick = reudxData.memberInfo?.nickname;
  const userage = reudxData.memberInfo?.ageRange;
  console.log(userage);
  const [beanMain, setbeanMain] = useState([
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
  const [ageMain, setAgeMain] = useState([
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
  const [capsule, setCapsule] = useState<CapsuleDetailType[] | null>(null);
  const [ageCapsule, setAgeCapsule] = useState<CapsuleDetailType[] | null>(
    null,
  );

  const cutArr = (arr: []) => {
    return arr.slice(0, 4);
  };

  useEffect(() => {
    const getData = async (age: any, type: any) => {
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
    getData(userage, 'bean');
    getData(userage, 'capsule');
  }, []);

  return (
    <Carousel>
      <BigDiv>
        <PageTitle>{usernick}님의 추천원두</PageTitle>
        <InDiv>
          {beanMain.map((data: propsData, i) => {
            return <CoffeeCard key={i} beanData={data} />;
          })}
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
          {ageMain.map((data: propsData, i) => {
            return <CoffeeCard key={i} beanData={data} />;
          })}
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
};

export default Page2Carousel;

const BigDiv = tw.div`flex flex-col justify-center items-center`;
const InDiv = tw.div`h-5/6 w-2/3 flex justify-center items-center`;
const PageTitle = tw.div`text-white text-6xl font-extrabold text-center mt-10`;
