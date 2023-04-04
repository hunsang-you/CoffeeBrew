import tw from 'tailwind-styled-components';
import CardComponent from './Card';

type BeanType = { title: string; titleKo: string; content: string }[];

const BeanData: BeanType = [
  {
    title: 'Barista',
    titleKo: '바리스타',
    content:
      '이탈리아어로 "바 안에서 만드는 사람"이란 뜻으로 좋은 원두를 골라 커피머신을 활용하여 고객의 입맛에 최대한 만족하는 커피를 만들고 서빙하는 전문가.',
  },
  {
    title: 'Variation',
    titleKo: '바리에이션',
    content: '에스프레소에 다양한 시럽과 술, 소스, 생크림 등을 넣은 커피.',
  },
  {
    title: 'Latte Art',
    titleKo: '라떼아트',
    content:
      '커피에 우유를 이용 각가지 모양과 문양을 만들어 고객에게 시각적인 만족과 즐거움을 제공하는 것.',
  },
  {
    title: 'Etching',
    titleKo: '에칭',
    content:
      '초코 소스 등을 이용하여 커피 위에 모양이나 문양을 내는 일. 초코 에칭 라떼아트라고도 한다.',
  },
  {
    title: 'Sauce',
    titleKo: '소스',
    content:
      '어원은 라틴어의 Sal(소금)에서 나온 것으로 원래는 소금을 기본으로 한 조미 용액이란 뜻이나, 커피에 단맛을 내는 액체. 시럽과는 달리 묵직하고 당도가 있다.',
  },
  {
    title: 'Syrup',
    titleKo: '시럽',
    content:
      '설탕을 녹여서 향료를 첨가한 액체 모양의 가공 설탕. 바닐라 시럽이나 캐러멜 시럽, 헤이즐넛 시럽 등 여러 종류의 향시럽이 있다.',
  },
  {
    title: 'Toping',
    titleKo: '토핑',
    content:
      '음식 위에 고명을 올리는 것처럼 커피 위에 견과류 혹은 소스 등을 올리는 것을 말한다.',
  },
  {
    title: 'Whipping Cream',
    titleKo: '휘핑크림',
    content:
      '생크림에 거품을 일게 한 크림으로 설탕을 넣어 단맛을 첨가하기도 한다. 휘핑기에 넣어 가스를 주입해서 쓰고 있다.',
  },
  {
    title: 'Steam Milk',
    titleKo: '스팀밀크',
    content: '에스프레소 머신의 스팀 기능으로 데운 우유.',
  },
  {
    title: 'Foamed Milk',
    titleKo: '폼 밀크',
    content:
      '거품 우유. 에스프레소 머신의 스팀을 이용해서 우유에 거품을 만들어 카페라떼, 카푸치노에 주로 쓰인다.',
  },
  {
    title: 'Black Coffee',
    titleKo: '블랙커피',
    content: '크림을 넣지 않은 커피로 색깔 때문에 블랙커피라고 한다.',
  },
  {
    title: 'Cafe Americano',
    titleKo: '카페 아메리카노',
    content:
      '에스프레소에 뜨거운 물을 부은 것으로 레귤러(Regular) 보다 더 연하다. 미국에서 많이 마시는 커피와 비슷해서 붙여진 이름이다. 대개 150~180ml 잔에 에스프레소를 뜨거운 물과 1 : 2 정도 비율로 희석하여 사용한다.',
  },
  {
    title: 'Cafe Romano',
    titleKo: '카페 로마노',
    content:
      '에스프레소에 레몬 조각을 얹은 커피. 기호에 다라 오렌지나 라임을 이용하기도 한다.',
  },
  {
    title: 'Coffee Puck',
    titleKo: '커피 퍽',
    content:
      '에스프레소 추출 후 포터 필터에 담겨있는 커피가루를 털어서 제거하는데 이때 포터 필터에서 떨어져 나오는 커피의 모양을 말한다. 일명 커피케잌 이라고도 합니다.',
  },
  {
    title: 'Knock box',
    titleKo: '넉박스',
    content: '포타필터에 담겨 있는 커피가루인 커피퍽을 털어서 담는 박스.',
  },
  {
    title: 'Potafilter',
    titleKo: '포타필터',
    content:
      '에스프레소 머신의 일부로 커피가루를 담아서 머신의 헤드에 끼워 넣는 바스켓. 58.7~58.8mm 사이즈가 많이 사용된다.',
  },
  {
    title: 'Tamper',
    titleKo: '탬퍼',
    content:
      '포터필터 안에 커피가루를 눌러서 다질 때 쓰는 기구로 큰 도장처럼 생겼다. 58.2~58.3mm사이즈가 많이 사용한다.',
  },
  {
    title: 'Tamping',
    titleKo: '탬핑',
    content:
      '포터필터에 담긴 분쇄된 커피를 다져 커피가루 사이의 공기를 빼는 행위. 통상 20T/kg 정도의 압력으로 다진 게 적당하며 커피양과 탬핑 강도에 따라 커피 맛이 달라지는데 커피양이 많고 탬핑 강도가 세면 진한 커피가, 커피양과 탬핑 강도를 약하게 하면 맛이 약한 커피가 나온다.',
  },
  {
    title: 'Group Head',
    titleKo: '그룹 헤드',
    content:
      '에스프레소 머신의 포터 필터를 끼워서 커피를 추출하는 곳을 말한다. 포터필터 안의 물을 공급하는 작동방식으로 주사구, 물 공급밸브, 샤워 스크린, 그룹 개스켓으로 구성되어 있다.',
  },
  {
    title: 'Espresso Machine',
    titleKo: '에스프레소 머신',
    content:
      '에스프레소 머신의 그룹 헤드가 1개면 one Group, 그룹헤드가 2개면 Tow Group, 그룹헤드가 3개면 three Group, 그룹헤드가 4개면 Four Group 에스프레소 머신이라고 부른다.',
  },
  {
    title: 'Just Right',
    titleKo: '적정 추출',
    content:
      '에스프레소가 제대로 된 추출을 말한다. 3~4mm의 황금빛 크레마가 생성되며 향과 풍부한 바디감이 좋다.',
  },
  {
    title: 'Under Extrac-Ted',
    titleKo: '언더추출',
    content:
      '엷은 갈색의 크레마로 큰 거품 생긴 후 금방 사라진다. 농도와 향이 약하다. 탬핑 강도가 약하거나 커피 양이 적었을 때 나타난다. 커피 분쇄도가 너무 굵을 때도 이런 현상이 나타난다.',
  },
  {
    title: 'Over Extrac-Ted',
    titleKo: '오버추출',
    content:
      '짙은 갈색의 크레마로 가장자리에만 형성된다. 쓴맛이 강하고 향이 약하다. 탬핑 강도가 너무 강하거나 커피 양이 많았을 때 나타난다. 커피 분쇄도가 너무 가늘었을 때에도 이런 현상이 나타난다.',
  },
  {
    title: 'Ristreto',
    titleKo: '리스트레토',
    content:
      '이탈리아어로 농축하다는 뜻으로 짧게 추출한 것을 말한다. 약 20ml 추출된 에스프레소.',
  },
  {
    title: 'pocoma buono',
    titleKo: '포코 마 부우노',
    content:
      '이탈리아 사람들이 부르는 리스트레토의 별칭. 작지만 훌륭하다는 뜻이다.',
  },
  {
    title: 'Solo',
    titleKo: '솔로',
    content: '에스프레소 1잔을 말한다. 에스프레소 30ml 분량.(1oz)',
  },
  {
    title: 'Dopio',
    titleKo: '도피오',
    content:
      'Double의 의미로 에스프레소 2잔 분량을 말하며 더블 에스프레소라고 한다. 60ml(2oz). 데미타세보다 더 큰 잔을 사용한다.',
  },
  {
    title: 'Lungo',
    titleKo: '롱고',
    content:
      '이탈리아어로 길다 라는 뜻으로 에스프레소 양을 늘려서 뽑는 것을 말한다. 과다 추출된 맛으로 커피 분량은 리스트레토와 같고 물의 양이 2배 정도로 하여 에스프레소보다는 연하지만 아메리카노보다는 진한 커피이다. 에스프레소 3잔 분량인 90ml(3oz)',
  },
  {
    title: 'Crema',
    titleKo: '크레마',
    content:
      '에스프레소 상부에 갈색 빛을 띠는 거품층을 말한다. 크레마는 커피의 지방성분의 오일의 결합체로 3~4mm 정도가 가장 맛있는 에스프레소가 된다. 커피가 빨리 식는 것을 막아주고 커피 향의 휘발을 늦추어주며 바디감을 높여준다. 고운 입자 거품층으로 되어 있다.',
  },
  {
    title: 'Demitasse',
    titleKo: '데미타세',
    content:
      '에스프레소를 담는 전용컵을 말하는데 약 5cm 높이의 작은 잔으로 30ml 정도의 에스프레소을 담고 보온성을 높이기 위하여 잔과 손잡이를 두껍게 만들고 잔 바닥을 턱을 두어 외부 온도 변화를 최소화시킨 형태를 뛴다. 재료는 도자기와 유리로 되어 있으며 최근에는 스테인리스 이중구조로도 만들어 쓰고 있다.',
  },
  {
    title: 'Shot',
    titleKo: '샷잔',
    content:
      '에스프레소를 담는 잔으로 유리 재질의 눈금이 표시되어 에스프레소의 양을 측정할 때 사용한다.',
  },
  {
    title: 'Steam Pitcher',
    titleKo: '스팀 피쳐',
    content:
      '일명 밀크 저그(Milk Jug)라고 하는데 에스프레소 머신의 스팀을 이용 우유를 데울 때 사용하는 스테인리스 재질로 된 용기.',
  },
  {
    title: 'Grinding',
    titleKo: '그라인딩',
    content: '원두를 커피가루로 분쇄하는 행위.',
  },
  {
    title: 'Tall Size',
    titleKo: '톨 사이즈',
    content: '8온스 잔',
  },
  {
    title: 'Grande Size',
    titleKo: '그란데 사이즈',
    content: '12온스 잔',
  },
];

const Beans = () => {
  return (
    <div className="flex flex-row flex-wrap">
      {BeanData.map(
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

export default Beans;
