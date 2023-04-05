import tw from 'tailwind-styled-components';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import bean from '../../assets/tempImg/bean.png';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import Chart from './Chart/apexchart';
import { detailType } from './DetailBean';
import { detailAPI } from '../../api/api';
import acidityImg from '../../assets/detailImg/acidityBean.svg';
import bitterImg from '../../assets/detailImg/bitterBean.svg';
import sweetImg from '../../assets/detailImg/sweetBean.svg';
import flavorImg from '../../assets/detailImg/flavorBean.svg';
import bodyImg from '../../assets/detailImg/bodyImg.svg';

interface PropsType {
  detailBean: detailType;
}

const BeanInfo = ({ detailBean }: PropsType) => {
  const [isLike, setIsLike] = useState(false);

  const note = () => {
    const newwords = '#' + detailBean?.coffeeingNote.replaceAll(', ', '#');
    return newwords;
  };

  const { beanId } = useParams() as { beanId: string };

  // 이미지 출력
  const [cardImg, setCardImg] = useState('');
  const beanTaste = () => {
    const acidity = detailBean.acidity;
    const bitter = detailBean.bitterness;
    const body = detailBean.body;
    const flavor = detailBean.flavor;
    const sweetness = detailBean.sweetness;
    const values: any[] = [acidity, bitter, body, flavor, sweetness];
    const maxIndex: number = values.indexOf(Math.max(...values));
    const maxVar = Object.keys({ acidity, bitter, body, flavor, sweetness })[
      maxIndex
    ];
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

  useEffect(() => {
    beanTaste();
  }, []);
  return (
    <BeanTop1 id="Top">
      <BeanImgBox>
        {/* 커피이미지 컴포넌트 */}
        <BeanImg1 src={cardImg} alt="img" />
        <HeartImgLike>
          {isLike ? (
            <AiFillHeart
              size={50}
              onClick={() => {
                setIsLike(false);
                detailAPI
                  .beanLike(Number(beanId))
                  .then((request) => {
                    console.log('like api 취소성공', request.data);
                  })
                  .catch((e) => console.log(e));
              }}
              style={{ color: 'red' }}
            />
          ) : (
            <AiOutlineHeart
              size={50}
              onClick={() => {
                setIsLike(true);
                detailAPI
                  .beanLike(Number(beanId))
                  .then((request) =>
                    console.log('like api 연결', request.data),
                  );
              }}
              style={{ color: 'gray' }}
            />
          )}
        </HeartImgLike>
      </BeanImgBox>
      {/* 최상단 우측(정보, 차트) */}
      <BeanDesc>
        <DescLeft>
          <BeanName> {detailBean?.nameKo} </BeanName>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <BeanCountry> 원산지 : {detailBean?.origin}</BeanCountry>
            <Region> 지역 : {detailBean?.region}</Region>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <RoastingPoint>로스팅 : {detailBean?.roastingPoint}</RoastingPoint>
            <Rank> 등급 : {detailBean?.rank} </Rank>
          </div>

          <BeanChart>
            <Chart detailBean={detailBean} />
          </BeanChart>
        </DescLeft>
        <DescRight>
          <CoffeeingNote>{note()}</CoffeeingNote>
          <Description>{detailBean?.description}</Description>
        </DescRight>
      </BeanDesc>
    </BeanTop1>
  );
};

export default BeanInfo;

// 최상단 좌측
const BeanTop1 = tw.div`flex justify-center ml-8 mr-8 mb-10 animate-fade-in-down`;
const BeanImg1 = tw.img`w-60 mx-auto mt-10 drop-shadow-xl`;
const HeartImgLike = tw.div`flex justify-center mt-2`;

// 최상단 우측 설명
const BeanDesc = tw.div`flex ml-6  w-592 mt-10 justify-between`;
const BeanImgBox = tw.div`w-360`;
const DescLeft = tw.div`w-2/3 `;
const BeanName = tw.div`text-left mt-6 ml-6 mr-2 mb-3.5 text-xl font-bold`;
const BeanCountry = tw.div`text-left ml-6 font-bold`;
const BeanChart = tw.div`mt-5 mx-auto`;
const DescRight = tw.div`w-60 my-6 mr-2 ml-1 `;
const Description = tw.div`h-80 mx-auto mt-4 overflow-y-auto text-left`;
const CoffeeingNote = tw.div`h-10 font-bold text-sm overflow-scroll break-words text-red-400`;
const RoastingPoint = tw.div`text-left ml-6 font-bold`;
const Region = tw.div`w-32 h-10 mr-4 font-bold break-words overflow-scroll`;
const Rank = tw.div`w-32 h-10 mr-4 font-bold break-words overflow-scroll`;
