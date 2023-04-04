import tw from 'tailwind-styled-components';
import CardComponent from './Card';

type TasteType = { title: string; titleKo: string; content: string }[];

const TasteData: TasteType = [
  {
    title: 'Acidity',
    titleKo: '산도',
    content:
      '추출된 커피 맛의 평가 기준 중 하나로 혀의 가장자리에서 느낄 수 있으며 산도의 정도는 뒷맛에서 감지된다. 산도의 높고 낮음으로 표현한다.',
  },
  {
    title: 'Acerbic',
    titleKo: '시큼한 맛',
    content: '커피의 맛이 혀에서 알알하고 시큼한 느낌을 주는 결함.',
  },
  {
    title: 'Acrid',
    titleKo: '강한 신맛',
    content:
      '시큼한 맛이 변화되어 나타나는 커피의 2차 맛으로 톡 쏘는 강한 신맛으로 브라질 리오커피의 특징적인 맛이다.',
  },
  {
    title: 'Acidy',
    titleKo: '상큼한 맛',
    content:
      '커피의 산이 당분이 결합하여 나타내는 추출 커피의 1차 맛. 콜롬비아 엑셀 소, 케냐, 코스타리카 등 고산지대 수세식 아라비카 커피콩의 특징적인 맛.',
  },
  {
    title: 'Alkaline',
    titleKo: '알칼리 맛',
    content:
      '진하게 볶은 커피의 쏘는 맛이 변화되어 나타나는 커피 맛으로 커피의 쓴맛을 내는 알칼리염과 페놀 화합물이 원인이다.',
  },
  {
    title: 'Astringent',
    titleKo: '떫은 맛',
    content:
      '커피의 자극적인 맛이 변하여 나타나는 커피의 2차 맛. 신맛과 무기질이 혼합되면서 나타난다. 인도네시아 로부스타의 특징적인 맛이다.',
  },
  {
    title: 'Basic tastes',
    titleKo: '기본맛',
    content:
      '단맛, 신맛, 짠맛, 쓴맛으로 설탕, 주석산, 소금, 키니네의 맛이 각각 대표한다.',
  },
  {
    title: 'Balance',
    titleKo: '균형감',
    content: '커피의 맛과 향에서 전반적인 균형감을 말한다.',
  },
  {
    title: 'Harsh',
    titleKo: '거친 맛',
    content: '커피를 마신 후 맛이 거칠게 느껴질 때 쓰는 표현.',
  },
  {
    title: 'Bitter',
    titleKo: '쓴맛',
    content:
      '혀 뒤쪽에서 감지되는 맛으로  커피의 키니네, 카페인, 그리고 다른 알칼로이드 성분에서 쓴맛을 낸다. 일반적으로 사람들은 쓴맛을 좋아하지 않지만 커피에서는 쓴맛이 통상적으로 나타나야 한다. 쓴맛이 없는 커피는 개성이 없고 뭉툭한 느낌을 준다. 쓴맛은 주로 에스프레소를 위한 강한 로스팅이나 진한 추출에서 많이 다루게 되는데, 밸런스가 잘 잡힌 가운데 쓴맛이 포함된 진한 커피는 보통 스트롱하다, 풍부하다 등으로 말할 수 있다. 하지만 쓴맛이 주도적으로 나타나면 밸런스에 문제가 있는 좋지 않은 커피이다.',
  },
  {
    title: 'Bland',
    titleKo: '약한 맛',
    content:
      '혀 가장자리에서 감지할 수 있는 부드럽고 온화함의 정도를 표현하는 커피맛의 평가기준 용어로써 Soft와 Neutral의 범위에서 표현하기도 하고 또 일반적으로는 향이 희미한 커피를 지칭하기도 한다.',
  },
  {
    title: 'Bright',
    titleKo: '시큼한 맛',
    content:
      '얼얼할 정도로 산미가 느껴지는 산도가 높은 커피맛을 표현할 때 주로 쓰는 용어이다.',
  },
  {
    title: 'Briny',
    titleKo: '짠맛',
    content: '추출된 커피를 다시 데웠을때 드러나는 짠맛.',
  },
  {
    title: 'Buttery',
    titleKo: '오일맛',
    content: '오일감이 풍부하게 나는 커피의 풍미를 표현.',
  },
  {
    title: 'Clean',
    titleKo: '깔끔한 맛',
    content:
      '커피맛의 깔끔함의 정도를 보는 평가기준으로써 그린빈의 생산 과정과 직접적인 관련이 있다. 표현 용어로는 Bright, Clear 등을 들 수 있다',
  },
  {
    title: 'Clear',
    titleKo: '깔끔한 맛',
    content: '커피를 마셨을 때 깔끔하게 넘어가는 느낌의 표현 용어이다.',
  },
  {
    title: 'Caustic',
    titleKo: '소다맛',
    content:
      '진하게 볶은 커피의 harsh 맛이 변한 커피의 2차 맛. 찌르는 듯한 쓴맛. 리베리카 커피의 특징적인 맛이다.',
  },
  {
    title: 'Creosoty',
    titleKo: '타르 맛, 심하게 탄맛',
    content:
      '진하게 볶은 커피의 쏘는 맛이 변한 커피의 2차 맛. 로스팅 온도가 높아 탄내와 기름내가 혼합되어 생성된다.',
  },
  {
    title: 'Delicate',
    titleKo: '약한 단맛',
    content:
      '완전히 잘 익은 커피체리로 만든 커피에서 맛볼 수 있는 용어이다. 혀 끝에서 살짝 감지할 수 있는 민감한 맛이다.',
  },
  {
    title: 'Defect',
    titleKo: '결점',
    content:
      '생두에서의 결점두(흑두, 사두, 조 개 두 등) 또는 향미에서 결점이 되는 냄새나 맛.(산패취, 고무 맛 등)',
  },
  {
    title: 'Exotic',
    titleKo: '이국적인 맛',
    content:
      '일반적이지 않은 맛을 표현하고자 할 때 사용하며, 커피에서 일반적이지 않은 향미는 Berry 나 Floral 등을 들 수 있다.',
  },
  {
    title: 'Hard',
    titleKo: '쏘는 신맛',
    content:
      '신맛이 변하여 나타나는 커피의 2차 맛. 자연건조한 브라질 파라나 커피의 특징적인 맛.',
  },
  {
    title: 'Mellow',
    titleKo: '달콤한 맛',
    content:
      '산도가 높지 않아서 익은 과실의 원숙한 달콤함이 입안을 부드럽게 감싸는 듯 느껴질 때 사용하는 용어. 수마트라 아라비카 커피의 특징적인 맛. Medicinal 소독 내 진하게 볶은 커피의 harsh맛이 변하여 나는 커피의 2차 맛. 커피가 식으면서 소독 내가 난다.',
  },
  {
    title: 'Mild',
    titleKo: '부드러운 단맛',
    content:
      '커피 맛의 어떤 특성도 넘치거나 부족함이 없을때 쓰는 표현. 수세 가공한 과테말라 아라비카 특징. ',
  },
  {
    title: 'Muddy',
    titleKo: '탁한 맛',
    content:
      ' 맛이 탁하고 무딜 때 쓰는 표현 용어이며, 그린빈 생산과정에서 땅에 휘저어 말릴 때 감염되어 나타날 수 있는 맛이다.',
  },
  {
    title: 'Newtral',
    titleKo: '안정된 맛',
    content:
      '어떤 특정한 풍미도 튀지 않는 밸런스가 잘 된 커피맛의 표현 용어로써 블렌딩에서 연출할 수 있는 특성이다. 과거에는 개성이 없는 부정적인 의미로 쓰이기도 했다.',
  },
  {
    title: 'Nippy',
    titleKo: '강한 단맛',
    content:
      '상큼한 맛이 변한 커피의 2차 맛. 매콤한 맛. 코스타리카 SHB의 특징적인 맛.',
  },
  {
    title: 'Overall',
    titleKo: '종합평가',
    content: '커피 풍미에 대한 종합적인 평가.',
  },
  {
    title: 'Piquant',
    titleKo: '자극적인 단맛',
    content: '커피의 상큼한 맛이 변한 커피의 2차 맛. 케냐AA 특징적인 맛.',
  },
  {
    title: 'Pungent',
    titleKo: '쏘는 맛',
    content: '아릴 정도로 얼얼한 맛.',
  },
  {
    title: 'Rioy',
    titleKo: '발효취',
    content:
      '브라질의 리오 데 자네이로 항의 명칭을 딴 것으로, 브라질 커피의 특성처럼 약용의 쓴맛이 날 때 표현한다.',
  },
  {
    title: 'Rubbery',
    titleKo: '고무맛',
    content:
      '로부스타 종에서만 나타나는 고무나무에서 나는 듯한 탄성 맛. 나무에 달린 체리가 한쪽만 부분적으로 익은 것들에서 이런 맛이 나타난다.',
  },
  {
    title: 'Primary taste ',
    titleKo: '커피의 1차 맛',
    content:
      '볶은 커피의 상큼한 맛, 달콤한 맛, 와인맛, 약한 맛, 거친 맛, 시큼한 맛 등 6가지 맛을 의미한다.',
  },
  {
    title: 'Rough',
    titleKo: '거친 맛',
    content:
      '커피의 자극적인 맛이 변하여 나타나는 커피의 2차 맛. 무기질이 많을 때 생긴다.',
  },
  {
    title: 'Stale',
    titleKo: '산패취',
    content: '신선하지 않고 오래된 커피 밋밋한 맛.',
  },
  {
    title: 'Salt',
    titleKo: '짠맛',
    content:
      '짠맛은 커피에 감칠맛을 돌게 하고 활력을 불러일으키는 중요한 요소로 커피의 맛을 감별할 때 없어서는 안 되는 요소이다. 그러나 짠맛이 주된 맛으로 나타날 때는 커피빈의 상태가 안 좋은 경우이다. 짠맛의 작용으로 표현되는 커피맛은 Bland와 Sharp의 범위에서 나타나게 된다.',
  },
  {
    title: 'Sharp',
    titleKo: '자극적인 맛',
    content:
      '커피의 산이 무기질과 합하여 생기는 맛으로 자연건조한 아프리카 로부스타의 특징적인 맛.',
  },
  {
    title: 'Soft',
    titleKo: '약한 맛',
    content:
      'Bland의 정도를 구분하여 표현할 때 쓰이는 용어로 혀를 자극하는 맛이 전혀 나타나지 않을 때 쓸 수 있다. 브라질 산토스의 특징적인 맛이다.',
  },
  {
    title: 'Sour',
    titleKo: '신맛',
    content:
      '생생한 산미와는 다른 개념의 신맛으로 주로 덜 익은 빈으로 만든 커피에서 이런 시큼한 맛을 낸다.',
  },
  {
    title: 'Soury',
    titleKo: '시큼한 맛',
    content:
      '커피의 산이 무기질과 합하여 생기는 맛. 매운맛이 산이 더해져 약해짐.',
  },
  {
    title: 'Sweet',
    titleKo: '단맛',
    content:
      '기본적으로 사람이 좋아하는 맛으로 혀의 앞쪽에서 집중적으로 느낄 수 있다. 거친 맛이 없고 결함이 없는 커피에서 감지할 수 있는 감칠맛으로 표현할 수 있는 범위가 넓다. 커피에서 단맛을 내는 내는 요소는 탄수화물과 단백질이다.',
  },
  {
    title: 'Sweetness',
    titleKo: '당도',
    content: '단맛의 정도',
  },
  {
    title: 'Taint',
    titleKo: '오염된 맛',
    content:
      '커피에서 감염된 맛이 날 때 쓰는 평가기준 용어이다. 커피 생산의 전 과정에서 환경에 의해 빈 자체의 화학적 변화나 외부에서 흡수된 물질이 풍미에 영향을 끼쳐 내는 맛이다.',
  },
  {
    title: 'Tart',
    titleKo: '새콤한 와인 맛',
    content: '콩고의 자연 건조한 키부 커피에서 나타난다. 시고 자극적인 맛이다.',
  },
  {
    title: 'Thin',
    titleKo: '얕은 중량감',
    content:
      '추출에 문제가 있어서 산미가 느껴지지 않거나 생기가 없는 커피를 지칭할 때 쓰는 용어이다.',
  },
  {
    title: 'Taste Strength',
    titleKo: '맛의 강도',
    content: '맛의 강하고 약한 정도',
  },
  {
    title: 'Uniformity',
    titleKo: '균일성',
    content: '커피의 향미성분이 결함이 없이 같은 레벨 여부',
  },
  {
    title: 'Wild',
    titleKo: '질이 고르지 못한 맛',
    content:
      '맛에서 활력이 느껴질 때 사용할 수 있는 표현 용어이다. 주로 에티오피아의 야생 커피나무에 수확한 커피에서 와일드한 느낌을 받을 수 있다.',
  },
  {
    title: 'Winey',
    titleKo: '포도주 맛',
    content:
      '포도주의 풍미가 느껴지는 커피의 맛. 신마가 풍부해서 생동감이 있고 레드와인의 풍미를 연상할 수 있다.',
  },
  {
    title: 'Woody',
    titleKo: '나무 맛',
    content: '그대로 커피맛이 약간 거친 목질의 풍미를 낼 때 표현하는 용어이다.',
  },
];

const Taste = () => {
  return (
    <div className="flex flex-row flex-wrap">
      {TasteData.map(
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

export default Taste;
