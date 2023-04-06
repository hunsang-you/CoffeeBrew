import { useState, useEffect } from 'react';
import { mainAPI } from '../../api/api';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
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

type Capsule = {
  idx?: number | null;
  nameEn?: string | null;
  nameKo?: string | null;
  summary?: string | null;
  thumbnail?: string | null;
  userGrade?: number | null;
};

type CapsuleDetail = {
  capsule?: Capsule;
  company?: string | null;
  description?: string | null;
  idx?: number | null;
  machineType?: string | null;
  origin?: string | null;
};

type CapsuleScore = {
  idx?: number | null;
  acidity?: number | null;
  balance?: number | null;
  bitterness?: number | null;
  body?: number | null;
  capsule?: Capsule;
  coffeeingNote?: string | null;
  flavor?: number | null;
  roasting?: number | null;
};

interface capsuledata {
  capsule: Capsule;
  capsuleDetail: CapsuleDetail;
  capsuleScore: CapsuleScore;
}

interface CapsullProps {
  [index: number]: {
    capsule: Capsule;
    capsuleDetail: CapsuleDetail;
    capsuleScore: CapsuleScore;
    linkDTO: null | any;
  };
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
  const [capsule, setCapsule] = useState([
    {
      capsule: {
        idx: 1,
        nameEn: '',
        nameKo: '',
        summary: '',
        thumbnail: '',
        userGrade: 5,
      },
      capsuleDetail: {
        idx: 1,
        company: '',
        description: '',
        machineType: '',
        origin: '',
        capsule: {
          idx: 1,
          nameEn: '',
          nameKo: '',
          summary: '',
          thumbnail: '',
          userGrade: 5,
        },
      },
      capsuleScore: {
        idx: 1,
        acidity: 3,
        balance: 4,
        bitterness: 2,
        body: 5,
        coffeeingNote: '',
        flavor: 4,
        roasting: 3,
        capsule: {
          idx: 1,
          nameEn: '',
          nameKo: '',
          summary: '',
          thumbnail: '',
          userGrade: 5,
        },
      },
    },
  ]);
  const [ageCapsule, setAgeCapsule] = useState([
    {
      capsule: {
        idx: 1,
        nameEn: 'Test Capsule',
        nameKo: '테스트 캡슐',
        summary: 'This is a test capsule.',
        thumbnail: 'default_capsule.png',
        userGrade: 5,
      },
      capsuleDetail: {
        idx: 1,
        company: 'Nespresso',
        description: 'This is a test capsule.',
        machineType: 'original',
        origin: 'Unknown',
        capsule: {
          idx: 1,
          nameEn: 'Test Capsule',
          nameKo: '테스트 캡슐',
          summary: 'This is a test capsule.',
          thumbnail: 'default_capsule.png',
          userGrade: 5,
        },
      },
      capsuleScore: {
        idx: 1,
        acidity: 3,
        balance: 4,
        bitterness: 2,
        body: 5,
        coffeeingNote: 'This is a test capsule.',
        flavor: 4,
        roasting: 3,
        capsule: {
          idx: 1,
          nameEn: 'Test Capsule',
          nameKo: '테스트 캡슐',
          summary: 'This is a test capsule.',
          thumbnail: 'default_capsule.png',
          userGrade: 5,
        },
      },
    },
  ]);

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
          {/* {capsule.map((data: CapsullProps, i) => {
            return <CoffeeCapSule key={i} capsuleData={data} />;
          })} */}
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
          {/* {ageCapsule.map((data: CapsullProps, i) => {
            return <CoffeeCapSule key={i} capsuleData={data} />;
          })} */}
        </InDiv>
      </BigDiv>
    </Carousel>
  );
};

export default Page2Carousel;

const BigDiv = tw.div`flex flex-col justify-center items-center`;
const InDiv = tw.div`h-5/6 w-2/3 flex justify-center items-center`;
const PageTitle = tw.div`text-white text-6xl font-extrabold text-center mt-10`;
