import tw from 'tailwind-styled-components';
import CardComponent from './Card';

type BasicType = { title: string; titleKo: string; content: string }[];

const BasicData: BasicType = [
  {
    title: 'Coffee Cherry',
    titleKo: '커피체리',
    content:
      '과육과 씨를 가지고 있고 빨간색으로 익은 커피 열매를 말한다. 푸른색 열매가 익으면 빨간색으로 변하는데 체리와 같다 하여 커피체리라고 부른다. 품종에 따라 열매가 노란색으로 익는 아마렐로(Amarelo)가 있다.',
  },
  {
    title: 'Coffee Bean',
    titleKo: '커피콩',
    content:
      '가공되지 않은 콩을 말하는데 통상적으로 생두나 원두를 말하는 포괄적인 개념으로도 쓰인다.',
  },
  {
    title: 'Green Bean',
    titleKo: '생두',
    content:
      '커피체리 상태에서 과육을 제거하고 건조하는 가공공정을 거처 파치먼트를 제거한  속 씨앗을 말하는데 보통 한 개의 열매에서 두 개의 생두가 생산된다.',
  },
  {
    title: 'Parchment',
    titleKo: '파치먼트',
    content:
      '커피콩(생두)을 감싸고 있는 껍질. 파치먼트가 있는 상태의 커피콩을 심어야  재배가 가능하다. ',
  },
  {
    title: 'Carocolillo',
    titleKo: '카라콜리로',
    content:
      '일명 피베리(Peaberry;PB)라고 한다. 커피체리 안에는 두 개의 빈이 자라는데 유전적인 수정의 결함으로 인해 한 개 빈만 자라는 경우를 가리켜 스페인어로 달팽이 모양의 콩이라는 뜻의 "카라콜리로"라 한다. 정상 생두보다 작고 둥글며 독특한 향미를 지니고 있다.',
  },
  {
    title: 'Defective Beans',
    titleKo: '결점두',
    content:
      '커피의 재배 과정이나 가공공정에서 생긴 비정상적인 생두. SCAA에서 결점두를 16가지로 분류하여 생두 등급의 판단 기준으로 삼는다.',
  },
  {
    title: 'Hard Bean',
    titleKo: '하드 빈',
    content:
      '향미 품질이 낮은 생두를 의미하며 브라질에서 주로 사용하는 용어이다.',
  },
  {
    title: 'Soft Bean',
    titleKo: '소프트 빈',
    content: '향미 품질이 좋은 생두를 의미한다.',
  },
  {
    title: 'Regular Bean',
    titleKo: '원두커피',
    content: '볶은 커피를 말하며 인스턴트커피와 구분할 때 사용하기도 한다.',
  },
  {
    title: 'Washed',
    titleKo: '수세 가공',
    content:
      '커피체리를 발효 후 펄핑 하고 과육과 껍질을 물로 세척하여 건조하는 가공방법.',
  },
  {
    title: 'Netural',
    titleKo: '자연건조',
    content:
      '커피체리를 건조한 후 껍질과 과육을 기게로 탈피하여 건조하는 가공방법.',
  },
  {
    title: 'SHB',
    titleKo: 'Strictly hard bean',
    content:
      '1,000m 이상 고산지에서 재배한 아라비카 커피 중 주로 중앙아메리카 생산되는 커피의 최고등급을 말한다.',
  },
  {
    title: 'Gourmet Coffee',
    titleKo: '고멧 커피',
    content:
      '고급 커피 또는 프리미엄 커피, 스페셜티 커피라고 부르며, 최근에는 COE(Cup of Excellence)라고 한다. 고멧은 프랑스어로 식도락, 미식가를 뜻하며 미식가들이 즐겨 마시는 좋은 커피 의미로 고품질의 생두를 사용한 커피를 뜻한다. 생두 300g에 결점두가 5점 이하이고  향과 바디가 풍부하고 상큼한 신맛이 있고 덜 볶아진 것이 없어야 한다. 보통 중배전이나 중강배전으로 로스팅한다.',
  },
  {
    title: 'Cupping',
    titleKo: '커핑',
    content:
      '커피의 관능적 평가 또는 향미 평가로 커피의 본질적인 맛 테스트로 커피를 감별하거나 맛에 대한 등급을 매기는 일이다. 테스트에 컵을 이용하여 컵 테스트라고도 한다.',
  },
  {
    title: 'Blend',
    titleKo: '블렌드',
    content: '2종 이상 커피를 섞는 것을 말한다.',
  },
  {
    title: 'Straight',
    titleKo: '스트레이트',
    content: '단종 커피. 한 가지로 된 커피를 말한다.',
  },
  {
    title: 'Triangular Bean',
    titleKo: '트라이앵귤러 빈',
    content: '한 개의 커피 체리 안에 생두가 3개 들어있는 커피.',
  },
  {
    title: 'New Crop',
    titleKo: '햇콩',
    content: '갓 수확한 햇콩. 청록색의 커피콩',
  },
  {
    title: 'Current',
    titleKo: '녹색커피콩',
    content: '수확한 지 얼마 안 된 녹색의 커피콩',
  },
  {
    title: 'Past Crop',
    titleKo: '패스트크롭',
    content: '1년 지난 갈색의 커피콩',
  },
  {
    title: 'Arabica Coffee',
    titleKo: '아라비카 커피',
    content:
      '세계 커피 생산량의 60~70%를 차지하는 대표적인 커피 품종으로 에티오피아가 원산지이다. 주로 해발 600m 이상 고산지에서 재재 되고 단맛과 신맛이 강하여 고급 커피로 불린다. 카페인 함량이 0.8~1.4%로 다소 적다.',
  },
  {
    title: 'Robusta Coffee',
    titleKo: '로부스타 커피',
    content:
      '코페아 카네포라의 대표 품종으로 세계 커피 생산량의 30~40% 차지한다. 주로 해발 600m 이하에서 재배하며 병충해에 강하고 쓴맛과 구수한 맛이 좋고 카페인 함량이 1.7~4%로 아라비카보다 높다.',
  },
  {
    title: 'Liberica Coffee',
    titleKo: '리베리카 커피',
    content:
      '아프리카 리베리아가 원산지로 고온다습한 지역에 잘 자라지만 병충해에 약하고 수확시기가 일정하지 않아 열매 채취가 어렵다. 상품가치가 적어 재배 지역이 극히 드물다.',
  },
];

const Basic = () => {
  return (
    <div className="flex flex-row flex-wrap">
      {BasicData.map(
        (
          data: { title: string; titleKo: string; content: string },
          i: number,
        ) => {
          return (
            <CardComponent
              key={i}
              title={data.title}
              titleKo={data.titleKo}
              content={data.content}
            />
          );
        },
      )}
    </div>
  );
};

export default Basic;
