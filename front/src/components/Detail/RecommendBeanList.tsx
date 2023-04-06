import tw from 'tailwind-styled-components';
import { useState, useRef, useEffect } from 'react';
import acidityImg from '../../assets/detailImg/acidityBean.svg';
import bitterImg from '../../assets/detailImg/bitterBean.svg';
import sweetImg from '../../assets/detailImg/sweetBean.svg';
import flavorImg from '../../assets/detailImg/flavorBean.svg';
import bodyImg from '../../assets/detailImg/bodyBean.svg';
import { recomType } from './RecommendBean';

interface Propstypes {
  data: recomType;
  i: number;
}

const RecommendBeanList = ({ data, i }: Propstypes) => {
  const [imgIdx, setImgIdx] = useState(0);
  const [beanImg, setBeanImg] = useState([
    acidityImg,
    bitterImg,
    flavorImg,
    bodyImg,
    sweetImg,
  ]);
  useEffect(() => {
    const acidity = data?.acidity;
    const bitter = data?.bitterness;
    const body = data?.body;
    const flavor = data?.flavor;
    const sweetness = data?.sweetness;
    const values: any[] = [acidity, bitter, body, flavor, sweetness];
    const maxIndex: number = values.indexOf(Math.max(...values));
    setImgIdx(maxIndex);
  }, []);
  const BackColor: string[] = [
    '#FFAA01',
    '#D4AA70',
    '#E8D2A0',
    '#F6842B',
    '#D3BD94',
  ];
  return (
    <RecomItemT1 style={{ backgroundColor: BackColor[i] }}>
      <RecomItemImg src={beanImg[imgIdx]} />
      <RecomItemB>
        <RecomItemName>{data.nameKo}</RecomItemName>
        <RecomInfo>
          <div>{data.summary}</div>
        </RecomInfo>
      </RecomItemB>
    </RecomItemT1>
  );
};

export default RecommendBeanList;

const RecomItemT = tw.div`w-44 h-320 justify-center rounded-t-2xl my-12 drop-shadow-xl hover:scale-105 hover:drop-shadow-2xl duration-300 ml-2 mr-2 `;
const RecomItemT1 = tw(RecomItemT)`bg-brownBorder rounded-b-2xl`;
const RecomItemImg = tw.img`w-20 h-32  mx-auto mt-4  `;

const RecomItemB = tw.div`w-44 h-44  justify-center  bg-navColor mt-10 rounded-b-2xl hover:drop-shadow-2xl overflow-y-auto`;
const RecomItemName = tw.div`text-productTextBrown pt-4 font-bold break-words mx-4 text-base `;
const RecomInfo = tw.div`h-24 text-nameColor overflow-y-auto mx-4`;
