import { useState, useEffect } from 'react';
import { mainAPI } from '../../api/api';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import tw from 'tailwind-styled-components';
import Carousel from 'react-material-ui-carousel';
import CoffeeCard from '../CoffeeCard';

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
  const reudxData = useSelector((state: RootState) => state);
  const userage = reudxData.memberInfo?.ageRange;
  const [nonBean, setNonBean] = useState([
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
  const [noncapsule, setNoncapsule] = useState([
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
    const getData = async (age: any, type: any) => {
      await mainAPI
        .getAgeRecom(age, type)
        .then((request) => {
          const data = request.data.value;
          console.log(cutArr(data));
          if (type === 'bean') {
            setNonBean(cutArr(data));
          } else if (type === 'capsule') {
            setNoncapsule(cutArr(data));
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
        <InDiv>
          {nonBean.map((data: propsData, i) => {
            return <CoffeeCard key={i} rec={'bean'} propsdata={data} />;
          })}
        </InDiv>
        <InDiv>
          {noncapsule.map((data: propsData, i) => {
            return <CoffeeCard key={i} rec={'capsule'} propsdata={data} />;
          })}
        </InDiv>
      </BigDiv>
    </Carousel>
  );
};

export default Page2Non;

const BigDiv = tw.div`flex flex-col justify-center items-center`;
const InDiv = tw.div`h-5/6 w-2/3 flex justify-center items-center`;
