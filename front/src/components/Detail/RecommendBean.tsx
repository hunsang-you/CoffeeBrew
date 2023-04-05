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
                <RecomInfo>
                  <div>{data.summary}</div>
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

const RecomList = tw.div` flex mx-auto mb-4 `;
const RecomItemT = tw.div`w-44 h-320 justify-center rounded-t-2xl my-12 drop-shadow-xl hover:scale-105 hover:drop-shadow-2xl duration-300 ml-2 mr-2 `;
const RecomItemT1 = tw(RecomItemT)`bg-brownBorder rounded-b-2xl`;
const RecomItemImg = tw.img`w-20 h-32  mx-auto mt-4  `;

const RecomItemB = tw.div`w-44 h-44  justify-center  bg-navColor mt-10 rounded-b-2xl hover:drop-shadow-2xl overflow-y-auto`;
const RecomItemName = tw.div`text-productTextBrown pt-4 font-bold break-words mx-4 text-base `;
const RecomInfo = tw.div`h-24 text-nameColor overflow-y-auto mx-4`;
