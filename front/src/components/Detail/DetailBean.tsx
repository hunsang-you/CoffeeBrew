import { useState, useRef } from 'react';
// import { useNavigate } from 'react-router-dom';
import tw from 'tailwind-styled-components';
import bean from '../../assets/bean.png';
import grinding2 from '../../assets/grinding2.png';
import machine1 from '../../assets/machine1.png';
import ratingempty from '../../assets/rating-empty.png';

// import RadarChartExample from './Chart/rechart';
import Chart from './Chart/apexchart';
import { AiOutlineHeart, AiOutlineQuestionCircle } from 'react-icons/ai';
import RecommendBean from './RecommendBean';
// import RecommendMachine from './RecommendMachine';

const Title = tw.p`text-left text-2xl mt-6 mb-6 ml-20 animate-bounce`;
const NullDiv = tw.div``;
const Line = tw.hr`h-px bg-red-600 border-dashed w-1040 mx-auto my-10`;

const DetailBg = tw.div`text-center bg-background`;

// 최상단 좌측
const BeanTop1 = tw.div`flex justify-center ml-8 mr-8 mb-10 animate-fade-in-down`;
const BeanImg1 = tw.img`object-cover mt-10 drop-shadow-xl`;
const HeartImg1 = tw.div`flex justify-center  `;

// 최상단 우측 설명
const BeanDesc = tw.div`flex ml-12 border-4 border-brownBorder w-592 mt-10 `;
const BeanImgBox = tw.div`w-360`;
const DescLeft = tw.div`w-1/2 `;
const BeanName = tw.div`w-1/2 text-left mt-6 ml-6 mb-3.5 text-3xl`;
const BeanCountry = tw.div`text-left ml-6 text-2xl`;
const BeanChart = tw.div`mt-5 mx-auto`;
const DescRight = tw.div`w-1/2 my-6 mr-6 ml-1 bg-slate-300`;
const Description = tw.div`mx-auto mt-2`;

// 두번째 추천칸
const BeanTop2 = tw.div`text-center justify-center ml-20 mr-20 mb-10 animate-fade-in-down`;
// 이동바
const MoveBar = tw.div` flex justify-evenly w-1040 mx-auto drop-shadow-xl`;
const RecbarBean = tw.div`w-344 bg-recBean text-base cursor-pointer hover:bg-slate-500`;
const RecbarMachine = tw.div`w-344 bg-recMachine text-base cursor-pointer hover:bg-slate-500`;
const ReviewBar = tw.div`w-344 bg-review text-base cursor-pointer hover:bg-slate-500`;

// 추천원두
const RecboxBean = tw.div`flex justify-center w-1000  bg-gradient-to-r from-recBeanbox1 to-recBeanbox2  mx-auto flex-col `;
// const RecBeanImg = tw.img`w-60 h-60`;
// const RecBeanName = tw.div`text-3xl `;
// const RecBeanCountry = tw.div``;
// const RecBeanScore = tw.div``;

// 기기 및 분쇄도
const RecOther = tw.div`w-1040  flex justify-between `;
const RecMachine = tw.div`flex-col w-460 justify-center bg-gradient-to-br from-recMachine1 to-recMachine2 mx-auto rounded-3xl drop-shadow-2xl`;
const RecMachineImg = tw.img`w-60 h-60 rounded-full my-4 mx-auto`;
const MachineBtn = tw.button`w-52 h-16 bg-pinkColor rounded-full text-white my-4 mx-auto drop-shadow-xl`;
const Grinding = tw.div`flex-row w-460 justify-center bg-gradient-to-r from-grinding1 to-grinding2 mr-10 rounded-3xl drop-shadow-2xl`;
const GrindingImg = tw.img`w-60 h-60 rounded-full mt-4 mx-auto`;
const GrindingInfo = tw.div`mt-6 text-2xl `;
const Question = tw.div`w-12 h-12 mx-auto cursor-pointer mt-8 `;

// 세번째 리뷰칸
const BeanTop3 = tw.div`flex w-1040 justify-center mx-auto flex-col mb-10 animate-fade-in-down`;
// 최신순, 추천순
const ReviewFilter = tw.div`flex flex-row mb-4 justify-end mr-14`;
const FilterOn = tw.div`w-20 h-10 rounded-full border-2 text-xl text-center leading-9  bg-black text-white ml-4`;
const FilterOff = tw.div`w-20 h-10 rounded-full border-2 bg-gray-300 text-xl  text-black leading-9 ml-4 cursor-pointer hover:bg-slate-500`;

const ReviewList = tw.div`w-1000 mx-auto`;
const ReviewDelete = tw.div`w-16 h-9 bg-brownBorder text-white leading-9 rounded-t-lg ml-14 cursor-pointer hover:bg-slate-500`;
const ReviewItem = tw.div`flex w-1000 border-y-4 border-brownBorder`;
const ReviewName = tw.div`text-xl  mt-12 mb-4`;
const ReviewImg = tw.img`w-60 h-60 rounded-full mb-4 mx-auto`;

// 리뷰내 평가도 (2줄)
const ReviewStandard = tw.div`justify-center mx-auto mt-6`;
const ReviewStandardTop = tw.div`w-720 text-2xl mb-2`;
const ReviewStandardBottom = tw.div`w-720 text-2xl mt-2 mb-2`;

// 리뷰내용
const ReviewArticle = tw.div`w-720 border-t-4 border-gray-500 `;
const ReviewTitle = tw.div`text-left text-2xl text-gray-600 ml-4 mt-4 mb-auto mr-auto`;
const ReviewContent = tw.div`text-left ml-4 mt-2 h-fit mb-4`;
const ReviewCreated = tw.p`text-sm ml-10`;
const MoreBtn = tw.button`w-40 h-10 bg-black text-white rounded-full mt-10 mb-4 cursor-pointer hover:bg-slate-500`;

// 네번째 칸(구매사이트)
const BeanTop4 = tw.div`flex w-1040 justify-center mx-auto flex-col mb-10`;
const ShopList = tw.div`flex justify-between `;
const ShopItemT = tw.div`w-40  border-2 justify-center rounded-t-2xl`;
const ShopItemT1 = tw(ShopItemT)`bg-brownBorder border-0`;
const ShopItemImg = tw.img`w-24 h-24 rounded-full mx-auto mt-2 `;

const ShopItemB = tw(ShopItemT1)`w-40 justify-center bg-navColor mt-2`;
const ShopItemName = tw.div`text-nameColor pt-4 font-bold text-ellipsis overflow-hidden ... whitespace-nowrap mx-1`;
const LinkBtn = tw.button`w-20 h-8 rounded-full bg-black text-white mt-2 mb-4 cursor-pointer hover:bg-slate-500`;

// SideBar(맨위로이동, 최근조회)
const SideBar = tw.div`w-20  border-2  border-brownBorder ml-auto top-100 right-44 bottom-60 fixed`;
const RecentItems = tw.div`text-lg font-bold`;
const RecentItem = tw.div` h-20 text-sm border-t-4 border-brownBorder text-ellipsis overflow-hidden`;
const MoveTop = tw.div`h-20 border-8 border-gray-500`;

const DetailBean = (): JSX.Element => {
  // 리뷰 최신/추천 순 조회버튼
  const [isActive, setIsActive] = useState(true);
  const activeBtn = () => {
    setIsActive(!isActive);
  };

  // 스크롤 이동
  const ScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  // const ScrollRec = () => {
  //   window.scrollTo({ top: 0, behavior: 'smooth' });
  // };

  // let location = document.querySelector('#Recbean').offsetTop;
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
      // console.log(location);
      window.scrollTo({ top: location - 80, behavior: 'smooth' });
    }
  };

  const handleClick3 = () => {
    if (reviewRef.current) {
      const location: number = reviewRef.current.offsetTop;
      // console.log(location);
      window.scrollTo({ top: location - 80, behavior: 'smooth' });
    }
  };

  return (
    <DetailBg>
      {/* 최상단 좌측(이미지) */}
      <BeanTop1 id="Top">
        <BeanImgBox>
          <BeanImg1 src={bean} alt="img" />
          <HeartImg1> {<AiOutlineHeart size={50} />} </HeartImg1>
        </BeanImgBox>
        {/* 최상단 우측(정보, 차트) */}
        <BeanDesc>
          <DescLeft>
            <BeanName> 케냐 AA </BeanName>
            <BeanCountry> 원산지 : 케냐</BeanCountry>

            <BeanChart>
              <Chart />
              {/* <RadarChartExample /> */}
            </BeanChart>
          </DescLeft>
          <DescRight>
            <Description>
              감미로운 향과 과일의 단맛, 쌉쌀한 맛의 조화 감미로운 향과 과일의
              단맛, 쌉쌀한 맛의 조화 감미로운 향과 과일의 단맛, 쌉쌀한 맛의 조화
              감미로운 향과 과일의 단맛, 쌉쌀한 맛의 조화 감미로운 향과 과일의
              단맛, 쌉쌀한 맛의 조화 감미로운 향과 과일의 단맛, 쌉쌀한 맛의 조화
              감미로운 향과 과일의 단맛, 쌉쌀한 맛의 조화 감미로운 향과 과일의
              단맛, 쌉쌀한 맛의 조화 감미로운 향과 과일의 단맛, 쌉쌀한 맛의 조화
            </Description>
          </DescRight>
        </BeanDesc>
      </BeanTop1>
      {/* <Line></Line> */}

      {/* 두번째 칸 (원두추천) */}
      <BeanTop2>
        {/* 이동 버튼 */}
        <MoveBar>
          <RecbarBean onClick={handleClick}> 원두 추천 </RecbarBean>
          <RecbarMachine onClick={handleClick2}> 기기 추천 </RecbarMachine>
          <ReviewBar onClick={handleClick3}> 리 뷰 </ReviewBar>
        </MoveBar>
        <NullDiv ref={recbeanRef} id="Recbean">
          <Title onClick={handleClick}>이런 원두는 어떠세요?</Title>
        </NullDiv>
        {/* 캐러셀 부분 */}
        <RecboxBean>
          {/* <RecBeanImg src={bean2} />
          <RecBeanName> 파푸아뉴기니 AA</RecBeanName>
          <RecBeanCountry> 파푸아 뉴기니 </RecBeanCountry>
          <RecBeanScore> 111</RecBeanScore> */}
          <RecommendBean />
        </RecboxBean>
      </BeanTop2>
      {/* <Line></Line> */}

      {/* 추가 추천기능(머신, 분쇄도) */}
      <BeanTop2>
        <NullDiv ref={recotherRef}>
          <Title id="RecOther">이렇게 먹어볼까요?</Title>
        </NullDiv>
        <RecOther>
          <RecMachine>
            <RecMachineImg src={machine1} alt="machine" onClick={() => {}} />
            <div
              style={{ fontSize: '24px', marginTop: '24px', color: '#A71717' }}
            >
              드롱기 디스틴타 드립 커피 메이커
            </div>
            <MachineBtn>
              <div style={{ fontSize: '24px', margin: 'auto' }}>보러가기 →</div>
            </MachineBtn>
          </RecMachine>
          {/* <RecommendMachine /> */}
          <Grinding>
            <GrindingImg src={grinding2} alt="분쇄도" />
            <GrindingInfo style={{ color: '#B49150' }}> 모카포트</GrindingInfo>
            <GrindingInfo style={{ color: '#B49150' }}>
              (조금고운 타입)
            </GrindingInfo>
            <Question>{<AiOutlineQuestionCircle size={50} />}</Question>
          </Grinding>
        </RecOther>
      </BeanTop2>
      {/* <Line></Line> */}
      <BeanTop3 ref={reviewRef} id="Reivew">
        <ReviewFilter>
          {isActive ? (
            <FilterOn>최신순</FilterOn>
          ) : (
            <FilterOff onClick={activeBtn}>최신순</FilterOff>
          )}
          {isActive ? (
            <FilterOff onClick={activeBtn}>추천순</FilterOff>
          ) : (
            <FilterOn>추천순</FilterOn>
          )}
        </ReviewFilter>
        <ReviewList>
          <ReviewDelete>삭제</ReviewDelete>
          <ReviewItem>
            <ReviewName>
              <ReviewImg src={bean} />
              원두이름원두이름원두이름원두이름원두이름원두이름
            </ReviewName>
            <ReviewStandard>
              <ReviewStandardTop>
                향 ★★★★★ 산미 ★★★★★ 후미 ★★★★★
              </ReviewStandardTop>
              <ReviewStandardBottom>
                바디감 ★★★★★ 바디감 ★★★★★
              </ReviewStandardBottom>
              <ReviewArticle>
                <ReviewTitle>
                  리뷰제목리뷰제목
                  <ReviewCreated> 2023-03-23 </ReviewCreated>
                </ReviewTitle>
                <ReviewContent>
                  리뷰내용 감미로운 향과 과일의 단맛, 쌉쌀한 맛의 조화 감미로운
                  향과 과일의 단맛, 쌉쌀한 맛의 조화 감미로운 향과 과일의 단맛,
                  쌉쌀한 맛의 조화 감미로운 향과 과일의 단맛, 쌉쌀한 맛의 조화
                  감미로운 향과 과일의 단맛, 쌉쌀한 맛의 조화 감미로운 향과
                  과일의 단맛, 쌉쌀한 맛의 조화 감미로운 향과 과일의 단맛,
                  쌉쌀한 맛의 조화 감미로운 향과 과일의 단맛, 쌉쌀한 맛의 조화
                  단맛, 쌉쌀한 맛의 조화 감미로운 향과 과일의 단맛, 쌉쌀한 맛의
                  조화 감미로운 향과 과일의 단맛, 쌉쌀한 맛의 조화 감미로운 향과
                  과일의 단맛, 단맛, 쌉쌀한 맛의 조화 감미로운 향과 과일의 단맛,
                  쌉쌀한 맛의 조화 감미로운 향과 과일의 단맛, 쌉쌀한 맛의 조화
                  감미로운 향과 과일의 단맛,감미로운 향과 과일의 단맛, 쌉쌀한
                  맛의 조화 감미로운 향과
                </ReviewContent>
              </ReviewArticle>
            </ReviewStandard>
          </ReviewItem>
          <MoreBtn>리뷰 더보기 ▼</MoreBtn>
        </ReviewList>
      </BeanTop3>
      <Line></Line>
      <BeanTop4>
        <Title> 여기서 구매해볼 수 있어요</Title>
        <ShopList>
          <ShopItemT1>
            <ShopItemImg src={bean} />
            <ShopItemB>
              <ShopItemName>
                레스트빈레스트빈레스트빈레스트빈레스트빈레스트빈
              </ShopItemName>
              <LinkBtn>이동</LinkBtn>
            </ShopItemB>
          </ShopItemT1>
          <ShopItemT1>
            <ShopItemImg src={bean} />
            <ShopItemB>
              <ShopItemName>레스트빈</ShopItemName>
              <LinkBtn>이동</LinkBtn>
            </ShopItemB>
          </ShopItemT1>
          <ShopItemT1>
            <ShopItemImg src={bean} />
            <ShopItemB>
              <ShopItemName>레스트빈</ShopItemName>
              <LinkBtn>이동</LinkBtn>
            </ShopItemB>
          </ShopItemT1>
          <ShopItemT1>
            <ShopItemImg src={bean} />{' '}
            <ShopItemB>
              <ShopItemName>레스트빈</ShopItemName>
              <LinkBtn>이동</LinkBtn>
            </ShopItemB>
          </ShopItemT1>
          <ShopItemT1>
            <ShopItemImg src={bean} />{' '}
            <ShopItemB>
              <ShopItemName>레스트빈</ShopItemName>
              <LinkBtn>이동</LinkBtn>
            </ShopItemB>
          </ShopItemT1>
        </ShopList>
      </BeanTop4>
      <SideBar>
        <RecentItems>
          최근 조회
          <RecentItem>케냐AA케냐AA케냐AA케냐AA케냐AA</RecentItem>
          <RecentItem>파푸아뉴기니파푸아뉴기니파푸아뉴기니</RecentItem>
          <RecentItem>
            스타벅스스타벅스스타벅스스타벅스스타벅스스타벅스 스타벅스
          </RecentItem>
        </RecentItems>
        <MoveTop onClick={ScrollTop}>↑</MoveTop>
      </SideBar>
      <MoreBtn> 돌아가기 </MoreBtn>
    </DetailBg>
  );
};

export default DetailBean;
