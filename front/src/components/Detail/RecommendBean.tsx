import tw from 'tailwind-styled-components';
import { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import bean from '../../assets/tempImg/bean.png';
import bean2 from '../../assets/tempImg/bean2.png';
import grinding2 from '../../assets/tempImg/grinding2.png';
import machine1 from '../../assets/tempImg/machine1.png';
import spin from '../../assets/Spin-1s-200px.gif';
import ratingfull from '../../assets/tempImg/ratingfull.png';
import ratinghalf from '../../assets/tempImg/ratinghalf.png';
import ratingempty from '../../assets/tempImg/ratingempty.png';
import { detailAPI } from '../../api/api';

// const RecboxBean = tw.div`flex justify-center w-1000  mx-auto flex-col `;
// const Body = tw.div`flex justify-center select-none w-100vw h-100vh my-10 `;
// const Container = tw.div`flex-col `;
// const Slide = tw.div`flex align-middle`;

// const Img = tw.img`w-64 h-64 flex-none rounded-full justify-center mx-auto drop-shadow-xl`;
// const Btn = tw.div` cursor-pointer text-8xl my-auto mx-28 hover:scale-125`;
// const Position = tw.div`mb-6 flex justify-center`;
// const Current = tw.div`bg-gray-500 rounded-full w-3 h-3 ml-5  cursor-pointer`;
// const Dot = tw(Current)`bg-orange-400 w-10 ml-5 cursor-pointer`;

// const ScoreTitle = tw.div`text-xl flex justify-end drop-shadow-2xl`;
// const Score = tw.img`w-8`;

interface recomType {
  flavor: number;
  acidity: number;
  sweetness: number;
  bitterness: number;
  body: number;
  balance: number;
  usergrade: number;
  coffeeingNote: string;
  decaffeination: boolean;
  description: string;
  linkDTO: null;
  nameEn: string;
  nameKo: string;
  origin: string;
  processing: string;
  rank: string;
  region: string;
  roastingPoint: string;
  summary: string;
  thumbnail: string;
}

const RecommendBean = (): JSX.Element => {
  const { beanId } = useParams() as { beanId: string };

  const [recommendBeanList, setRecommendBeanList] = useState<
    recomType[] | null
  >(null);

  useEffect(() => {
    const recomBean = async () => {
      await detailAPI
        .recommendBean(Number(beanId))
        .then((request) => {
          console.log(request.data);
          setRecommendBeanList(request.data.value);
        })
        .catch((e) => console.log(e));
    };
    recomBean();
  }, []);
  const BackColor: string[] = [
    '#FFAA01',
    '#D4AA70',
    '#E8D2A0',
    '#F6842B',
    '#D3BD94',
  ];

  return (
    <ListDiv>
      <RecomList>
        {recommendBeanList?.map((data, i) => {
          return (
            <RecomItemT1 style={{ backgroundColor: BackColor[i] }}>
              <RecomItemImg src={bean} />
              <RecomItemB>
                <RecomItemName>{data.nameKo}</RecomItemName>
                <RecomItemEngName>{data.nameEn}</RecomItemEngName>
                <RecomInfo>
                  <div>{data.summary}</div>
                  <div>{data.description}</div>
                </RecomInfo>
              </RecomItemB>
            </RecomItemT1>
          );
        })}
      </RecomList>
    </ListDiv>
  );
};

export default RecommendBean;
const ListDiv = tw.div` text-center`;

const RecomList = tw.div` flex  mb-4 `;
const RecomItemT = tw.div`w-44 h-320 justify-center rounded-t-2xl my-12 drop-shadow-xl hover:scale-105 hover:drop-shadow-2xl duration-300 ml-2 mr-2 `;
const RecomItemT1 = tw(RecomItemT)`bg-brownBorder rounded-b-2xl`;
const RecomItemImg = tw.img`w-20 h-32  mx-auto mt-4  `;

const RecomItemB = tw.div`w-44 h-44  justify-center  bg-navColor mt-10 rounded-b-2xl hover:drop-shadow-2xl overflow-y-auto`;
const RecomItemName = tw.div`text-productTextBrown pt-4 font-bold break-words mx-4 text-xl `;
const RecomItemEngName = tw.div`text-productTextBrown font-bold break-words mx-4 `;
const RecomInfo = tw.div`h-24 text-nameColor overflow-y-auto mx-4`;
const ScoreTitle = tw.div`text-xl flex justify-end drop-shadow-2xl`;
const Score = tw.img`w-4`;
