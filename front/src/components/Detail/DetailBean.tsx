import { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import tw from 'tailwind-styled-components';
import { detailAPI, reviewAPI } from '../../api/api';
import RecommendBean from './RecommendBean';
import Grinding from './Grinding';
import BeanInfo from './BeanInfo';
import MachineInfo from './MachineInfo';
import ReviewAll from './ReviewAll';
import Shopping from './Shopping';

/**detailbean 타입설정 */
export interface detailType {
  acidity: number;
  balance: number;
  bitterness: number;
  body: number;
  coffeeingNote: string;
  decaffeination: boolean;
  description: string | null;
  flavor: number;
  nameEn: string;
  nameKo: string;
  origin: string;
  processing: string | null;
  rank: string | null;
  region: string | null;
  roastingPoint: string | null;
  summary: string | null;
  sweetness: string;
  thumbnail: string | null;
  userGrade: number | null;
}
export interface reviewType {
  idx: number;
  profile: {
    profileImg: string | null;
    memberEmail: string | null;
    nickname: string | null;
    hashcode: string | null;
    snsType: string | null;
  };
  itemType: string;
  itemIdx: number;
  content: string | null;
  overall: number;
  flavor: number;
  acidity: number;
  sweetness: number;
  bitterness: number;
  body: number;
  coffeeing_note: string;
  like: number | null;
  expired: boolean | null;
  createdDate: number[] | null;
  updatedDate: number[] | null;
}

const DetailBean = (): JSX.Element => {
  const navigate = useNavigate();
  const { beanId } = useParams() as { beanId: string };
  const [detailBean, setDetailBean] = useState<detailType | null>(null);
  // 스크롤 이동
  const ScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const recbeanRef = useRef<HTMLDivElement>(null);
  const recotherRef = useRef<HTMLDivElement>(null);
  const reviewRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    if (recbeanRef.current) {
      const location: number = recbeanRef.current.offsetTop;
      console.log(location);
      window.scrollTo({ top: location - 80, behavior: 'smooth' });
    }
  };

  const handleClick2 = () => {
    if (recotherRef.current) {
      const location: number = recotherRef.current.offsetTop;
      console.log(location);
      window.scrollTo({ top: location - 80, behavior: 'smooth' });
    }
  };

  const handleClick3 = () => {
    if (reviewRef.current) {
      const location: number = reviewRef.current.offsetTop;
      console.log(location);
      window.scrollTo({ top: location - 80, behavior: 'smooth' });
    }
  };
  useEffect(() => {
    const getDetailBean = async () => {
      await detailAPI
        .getBean(Number(beanId))
        .then((request) => {
          console.log(request.data.value);
          setDetailBean(request.data.value);
        })
        .catch((e) => console.log(e));
    };
    getDetailBean();
  }, []);

  const [detailReview, setDetailReview] = useState<reviewType[] | null>(null);

  useEffect(() => {
    const getReviewItems = async () => {
      await reviewAPI
        .getBeanReview(Number(beanId))
        .then((request) => {
          console.log(request.data.value);
          setDetailReview(request.data.value);
        })
        .catch((e) => console.log(e));
    };
    getReviewItems();
  }, []);

  return (
    <DetailBg>
      <SideBar>
        <RecbarBean onClick={handleClick}> 원두 추천 </RecbarBean>
        <RecbarMachine onClick={handleClick2}> 기기 추천 </RecbarMachine>
        <ReviewBar onClick={handleClick3}> 리 뷰 </ReviewBar>
        <MoveTop onClick={ScrollTop}>맨 위로</MoveTop>
      </SideBar>
      {/* 첫번째 줄 (원두정보) */}
      {detailBean ? <BeanInfo detailBean={detailBean} /> : null}

      {/* 두번째 줄 (원두추천) */}
      <BeanTop2>
        <div ref={recbeanRef} id="Recbean">
          <Title onClick={handleClick}>이런 원두는 어떠세요?</Title>
        </div>
        {/* 캐러셀 부분 */}
        <RecommendBean />
      </BeanTop2>

      {/* 세번째 줄(머신 / 분쇄도)*/}
      <BeanTop2>
        <div ref={recotherRef}>
          <Title id="RecOther">이렇게 먹어볼까요?</Title>
        </div>
        <RecOther>
          <MachineInfo />
          <Grinding />
        </RecOther>
      </BeanTop2>

      {/* 네번째 줄(리뷰) */}
      <BeanTop3 ref={reviewRef} id="Reivew">
        {/* <Review /> */}
        {detailReview ? <ReviewAll detailReview={detailReview} /> : null}
      </BeanTop3>
      <Line></Line>

      {/* 다섯번째 줄(쇼핑몰링크) */}
      <BeanTop4>
        <Title> 여기서 구매해볼 수 있어요</Title>
        <Shopping />
      </BeanTop4>

      <Line></Line>

      <MoreBtn onClick={() => navigate(-1)}> 돌아가기 </MoreBtn>
    </DetailBg>
  );
};

export default DetailBean;

const Title = tw.p`text-left text-2xl mt-6 mb-6 ml-20 animate-bounce`;
const Line = tw.hr`h-px bg-red-600 border-dashed w-1040 mx-auto my-10`;

const DetailBg = tw.div`text-center bg-background w-1200 select-none `;
// SideBar(맨위로이동, 최근조회)
const SideBar = tw.div`
  border-2 border-brownBorder ml-auto top-100 right-60 bottom-60 fixed`;
// 해당 항목 이동
const MoveTop = tw.div` h-14 border-8 border-gray-500 text-sm`;
const RecbarBean = tw.div`bg-navColor text-base cursor-pointer hover:bg-slate-400 hover:text-white`;
const RecbarMachine = tw.div`bg-pinkColor text-base cursor-pointer hover:bg-slate-400 hover:text-white`;
const ReviewBar = tw.div`bg-brownBorder text-base cursor-pointer hover:bg-slate-400 hover:text-white`;

// 두번째 추천칸
const BeanTop2 = tw.div`text-center justify-center ml-20 mr-20 mb-10 animate-fade-in-down`;
// 기기 및 분쇄도
const RecOther = tw.div`w-1040  flex justify-between `;
// 세번째 리뷰칸
const BeanTop3 = tw.div`flex w-1040 justify-center mx-auto flex-col mb-10 animate-fade-in-down`;
const MoreBtn = tw.button`w-40 h-10 bg-black text-white rounded-full mt-10 mb-4 cursor-pointer hover:bg-slate-500`;
// 네번째 칸(구매사이트)
const BeanTop4 = tw.div`flex w-1040 justify-center mx-auto flex-col mb-10`;
