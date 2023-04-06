import tw from 'tailwind-styled-components';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { detailAPI, reviewAPI } from '../../api/api';
import CapsuleInfo from './CapsuleInfo';
import RecommendCapsule from './RecommendBean';
import ReviewAll from './ReviewAll';

//**DetailCapsule 타입설정 */
interface Capsule {
  idx: number;
  nameKo: string;
  nameEn: string;
  summary: string;
  thumbnail: string;
  userGrade: number;
}

interface CapsuleDetail {
  idx: number;
  capsule: Capsule;
  description: string;
  company: string;
  origin: string;
  machineType: string;
}

export interface CapsuleScore {
  idx: number;
  capsule: Capsule;
  balance: number;
  flavor: number;
  acidity: number;
  bitterness: number;
  body: number;
  roasting: number;
  coffeeingNote: string;
}

interface LinkDTO {
  mallName: string;
  link: string;
  image: string;
}

export interface CapsuleDetailType {
  capsule: Capsule;
  capsuleDetail: CapsuleDetail;
  capsuleScore: CapsuleScore;
  linkDTO: LinkDTO[] | null;
}
/** 캡슐리뷰 타입설정 */
export interface CapsuleReviewType {
  idx: number;
  profile: {
    profileImg: string | null;
    memberEmail: string | null;
    nickname: string | null;
    hashcode: string | null;
    snsType: string | null;
    ageRange: string | null;
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
/** 여기까지 타입설정 */
const DetailCapsule = () => {
  const navigate = useNavigate();
  const { capsuleId } = useParams() as { capsuleId: string };
  const [detailCapsule, setDetailCapsule] = useState<CapsuleDetailType | null>(
    null,
  );
  const [detailReview, setDetailReview] = useState<CapsuleReviewType[] | null>(
    null,
  );

  /**스크롤 이동 */
  const ScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const getDetailCapsule = async () => {
      await detailAPI
        .getCapsule(Number(capsuleId))
        .then((request) => {
          console.log(request.data.value);
          setDetailCapsule(request.data.value);
        })
        .catch((e) => console.log(e));
    };
    const getReviewItems = async () => {
      await reviewAPI
        .getCapsuleReview(Number(capsuleId))
        .then((request) => {
          console.log(request.data.value);
          setDetailReview(request.data.value);
        })
        .catch((e) => console.log(e));
    };
    getDetailCapsule();
    getReviewItems();
  }, []);

  return (
    <DetailBg>
      <SideBar>
        <MoveTop
          onClick={() => {
            ScrollTop();
          }}
        >
          ↑
        </MoveTop>
      </SideBar>
      {/* 캡슐정보 */}
      {detailCapsule ? <CapsuleInfo detailCapsule={detailCapsule} /> : null}
      {/* 캡슐추천 */}
      <CapsuleTop2>
        <div>
          <Title>이런 캡슐은 어떠세요?</Title>
        </div>
        <RecommendCapsule />
      </CapsuleTop2>
      {/* 리뷰관련 */}
      <CapsuleTop3 style={{ marginTop: '40px' }}>
        {detailReview ? <ReviewAll detailReview={detailReview} /> : null}
      </CapsuleTop3>
    </DetailBg>
  );
};

export default DetailCapsule;

const Title = tw.p`text-left text-2xl mt-6 mb-6 ml-20 animate-bounce`;
const Line = tw.hr`h-px bg-red-600 border-dashed w-1040 mx-auto my-10`;

const DetailBg = tw.div`flex-col text-center bg-background w-1200 select-none `;
// SideBar(맨위로이동, 최근조회)
const SideBar = tw.div`w-10 h-10 
border-4 border-brownBorder ml-auto top-100 bottom-40 right-20 rounded-full  hover:bg-brownBorder hover:scale-105 hover:text-white fixed`;
// 해당 항목 이동
const MoveTop = tw.div` h-10 text-3xl font-bold `;

// 두번째 추천칸
const CapsuleTop2 = tw.div`text-center justify-center ml-20 mr-20 mb-10 animate-fade-in-down`;
// 세번째 리뷰칸
const CapsuleTop3 = tw.div`flex w-1040 justify-center mx-auto flex-col mb-10 animate-fade-in-down `;
const MoreBtn = tw.button`w-40 h-10 bg-black text-white rounded-full mt-10 mb-4 cursor-pointer hover:bg-slate-500`;
// 네번째 칸(구매사이트)
const CapsuleTop4 = tw.div`flex w-1040 justify-center mx-auto flex-col mb-10`;
