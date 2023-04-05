import tw from 'tailwind-styled-components';
import { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import bean from '../../assets/tempImg/bean.png';
import { detailAPI } from '../../api/api';
import acidityImg from '../../assets/detailImg/acidityBean.svg';
import bitterImg from '../../assets/detailImg/bitterBean.svg';
import sweetImg from '../../assets/detailImg/sweetBean.svg';
import flavorImg from '../../assets/detailImg/flavorBean.svg';
import bodyImg from '../../assets/detailImg/bodyBean.svg';

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
          const [cardImg, setCardImg] = useState('');
          const beanTaste = () => {
            const acidity = data?.acidity;
            const bitter = data?.bitterness;
            const body = data?.body;
            const flavor = data?.flavor;
            const sweetness = data?.sweetness;
            const values: any[] = [acidity, bitter, body, flavor, sweetness];
            const maxIndex: number = values.indexOf(Math.max(...values));
            const maxVar = Object.keys({
              acidity,
              bitter,
              body,
              flavor,
              sweetness,
            })[maxIndex];
            if (maxVar === 'acidity') {
              setCardImg(acidityImg);
            } else if (maxVar === 'bitter') {
              setCardImg(bitterImg);
            } else if (maxVar === 'body') {
              setCardImg(bodyImg);
            } else if (maxVar === 'flavor') {
              setCardImg(flavorImg);
            } else if (maxVar === 'sweetness') {
              setCardImg(sweetImg);
            }
          };
          beanTaste();
          return (
            <RecomItemT1 style={{ backgroundColor: BackColor[i] }}>
              <RecomItemImg src={cardImg} />
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

const RecomList = tw.div` flex ml-10 mb-4 `;
const RecomItemT = tw.div`w-44 h-320 justify-center rounded-t-2xl my-12 drop-shadow-xl hover:scale-105 hover:drop-shadow-2xl duration-300 ml-2 mr-2 `;
const RecomItemT1 = tw(RecomItemT)`bg-brownBorder rounded-b-2xl`;
const RecomItemImg = tw.img`w-20 h-32  mx-auto mt-4  `;

const RecomItemB = tw.div`w-44 h-44  justify-center  bg-navColor mt-10 rounded-b-2xl hover:drop-shadow-2xl overflow-y-auto`;
const RecomItemName = tw.div`text-productTextBrown pt-4 font-bold break-words mx-4 text-base `;
const RecomInfo = tw.div`h-24 text-nameColor overflow-y-auto mx-4`;
