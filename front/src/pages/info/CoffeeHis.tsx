import tw from 'tailwind-styled-components';
import highlands from '../../assets/ethiopiahighlands.webp';
import turkey from '../../assets/turkey.jpeg';
import coffeehis from '../../assets/coffeehis.jpeg';
import espresso from '../../assets/espresso.jpeg';

const CoffeeHis = () => {
  return (
    <div>
      <div className="mt-3 ml-6 text-4xl font-bold text-mainColorBrown">
        커피의 역사
      </div>
      <div className="flex flex-row bg-lightgray my-6">
        <ImgDiv>
          <img
            src={highlands}
            className="w-full h-full object-fill"
            alt="no img"
          />
        </ImgDiv>
        <ContentDiv>
          <span className="text-3xl">커피</span>는 7세기 이전 에티오피아에서
          자랐으며, <br />
          전설에 따르면 염소 목동인 칼디가 열매를 발견하고 <br /> 마을에서
          커피를 마시기 시작했다. <br /> 커피는 이집트와 예멘에서 종교적
          의식에도 사용되었고, <br />
          15세기에는 페르시아, 터키, 북아프리카로 전파되었다.
        </ContentDiv>
      </div>
      <div className="flex flex-row bg-lightgray my-24">
        <ContentDiv>
          <span className="text-3xl">커피</span>는 1511년 메카에선 보수적인
          이맘에 의해
          <br />
          금지되었지만 인기가 계속해서 상승하여 <br /> 오스만 투르크 셀림 1세에
          의해 금지령이 폐지되었다.
          <br /> 1554년 이스탄불에선 카페 키바 한이 세계 최초의
          <br />
          커피 가게로 개업하게 되었다.
        </ContentDiv>
        <ImgDiv>
          <img
            src={turkey}
            className="w-full h-full object-fill"
            alt="no img"
          />
        </ImgDiv>
      </div>
      <div className="flex flex-row bg-lightgray my-24">
        <ImgDiv>
          <img
            src={coffeehis}
            className="w-full h-full object-fill"
            alt="no img"
          />
        </ImgDiv>
        <ContentDiv>
          <span className="text-3xl">커피</span>는 영국, 프랑스로도 퍼지기
          시작했고 <br />
          1690년대 부터는 본격적으로 미국에 퍼지기 시작했다. <br />
          1700년이 넘어가면서부터 뉴욕에서는
          <br />
          맥주보다 커피가 아침 음료로 선호받게 된다.
        </ContentDiv>
      </div>
      <div className="flex flex-row bg-lightgray my-24">
        <ContentDiv>
          <span className="text-3xl">커피</span>의 급진적인 발전은 20세기부터
          나타났다.
          <br />
          1900년엔 진공 포장 커피 개발에 성공하였고,
          <br />
          이듬해엔 인스턴트 커피를 발명했다.
          <br /> 1938년 중기압에서 벗어난 에스프레소 커피머신
          <br />
          개발에 성공하였다.
        </ContentDiv>
        <ImgDiv>
          <img
            src={espresso}
            className="w-full h-full object-fill"
            alt="no img"
          />
        </ImgDiv>
      </div>
    </div>
  );
};

const ContentDiv = tw.div`w-480 pl-8 my-auto text-xl leading-12`;
const ImgDiv = tw.div`h-400 w-720`;
export default CoffeeHis;
