import tw from 'tailwind-styled-components/';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiFillHeart } from 'react-icons/ai';
import { detailAPI } from '../../api/api';
import { detailType } from '../Detail/DetailBean';
import acidityImg from '../../assets/detailImg/acidityBean.svg';
import bitterImg from '../../assets/detailImg/bitterBean.svg';
import sweetImg from '../../assets/detailImg/sweetBean.svg';
import flavorImg from '../../assets/detailImg/flavorBean.svg';
import bodyImg from '../../assets/detailImg/bodyBean.svg';

interface PropsTypes {
  bean: detailType;
  i: number;
  setIsLikeCheck: React.Dispatch<React.SetStateAction<boolean>>;
  isLikeCheck: boolean;
  beanIdx: number[];
}

const LikeBeanListItem = ({
  bean,
  i,
  setIsLikeCheck,
  isLikeCheck,
  beanIdx,
}: PropsTypes) => {
  const handleLike = () => {
    setIsLikeCheck(!isLikeCheck);
  };
  const navigate = useNavigate();
  const [imgIdx, setImgIdx] = useState(0);
  const [beanImg, setBeanImg] = useState([
    acidityImg,
    bitterImg,
    flavorImg,
    bodyImg,
    sweetImg,
  ]);
  useEffect(() => {
    const acidity = bean.acidity;
    const bitter = bean.bitterness;
    const body = bean.body;
    const flavor = bean.flavor;
    const sweetness = bean.sweetness;
    const values: any[] = [acidity, bitter, flavor, body, sweetness];
    const maxIndex: number = values.indexOf(Math.max(...values));
    setImgIdx(maxIndex);
  }, []);
  return (
    <CardBody>
      <BeanImg src={beanImg[imgIdx]} alt="bean" />
      <CardContent style={{ backgroundColor: '#FFF0CE' }}>
        <div
          style={{
            wordBreak: 'break-word',
            overflow: 'scroll',
            textOverflow: 'ellipsis',
          }}
        >
          <BeanName>{bean.nameKo}</BeanName>
          <BeanCountry>원산지 : {bean.origin}</BeanCountry>
          <BeanDescription>{bean.description}</BeanDescription>
        </div>
      </CardContent>
      <FixedDiv
        style={{
          bottom: 0,
          backgroundColor: 'rgb(0, 0, 0, 0.7)',
        }}
      >
        <AiFillHeart
          size={42}
          style={{
            color: 'red',
            marginLeft: '8px',
            cursor: 'pointer',
          }}
          onClick={() => {
            detailAPI
              .beanLike(Number(beanIdx[i]))
              .then((request) => {
                console.log('좋아요 해제');
                handleLike();
              })
              .catch((e) => console.log(e));
          }}
        />
        <LinkBtn
          onClick={() => {
            navigate(`/detail/bean/${beanIdx[i]}`);
          }}
        >
          상세보기
        </LinkBtn>
      </FixedDiv>
    </CardBody>
  );
};

export default LikeBeanListItem;

const CardBody = tw.div`w-52 mx-3 my-4 flex-col relative`;
const BeanImg = tw.img`w-48 h-48 rounded-full mb-2 ml-4`;
const CardContent = tw.div`w-56 h-36 rounded-t-xl rounded-b-md overflow-scroll text-ellipsis `;
const BeanName = tw.div`pt-3 pb-2 text-fotColor font-bold text-left px-4`;
const BeanCountry = tw.div`text-sm text-nameColor font-bold text-left pl-6 pr-2 `;
const BeanDescription = tw.div`text-sm text-nameColor font-bold text-left mt-2 pb-12 pl-6 pr-2`;

const FixedDiv = tw.div`w-56 h-10 rounded-b-md bg-gray-500 my-auto flex absolute bottom-0`;
const LinkBtn = tw.div`w-36 h-8 bg-brownBorder font-bold text-xl text-white rounded-full mt-1 ml-4 mb-1 cursor-pointer`;
