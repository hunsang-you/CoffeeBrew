import tw from 'tailwind-styled-components';
import CardComponent from './Card';

type AromaType = { title: string; titleKo: string; content: string }[];

const AromaData: AromaType = [
  {
    title: 'Flavor',
    titleKo: '풍미',
    content:
      '커피를 입 안에 넣고 느껴지는 맛과 향기의 성분을 코에서 지각하는 감각. 아로마로 감지한 향이 입안에서 느껴지는 맛을 표현하고자 할 때 쓰는 용어이다.',
  },
  {
    title: 'Aroma',
    titleKo: '방향',
    content:
      '커피를 분쇄할 때나 추출한 상태에서 방출되어 나오는 향기(후각으로만 느낌). 과일향(Fruty), 허브향(Herby), 견과 향(Nutty)으로 표현한다.',
  },
  {
    title: 'After taste',
    titleKo: '뒷맛',
    content:
      '커피를 마신 후 약 30초 후에 입안에서 느껴지는 향기과 맛으로 탄내(Carbony), 초콜릿향(Chocolaty), 향신료 향(Spicy)등으로 표현한다.',
  },
  {
    title: 'Bouquet',
    titleKo: '와인의 숙성향',
    content:
      '아로마와 같은 뜻으로 쓰이는 경향이 있다. 추출 커피의 기체나 수증기 상태로 느껴지는 전체적인 향기. 볶은 커피 향기, 추출 커피 향기, 마시면서 느껴지는 향기, 입안에 남는 향기등 4가지 향기로 구성된다. 후각으로 느끼는 맛의 인상.',
  },
  {
    title: 'Fragrance',
    titleKo: '볶은 커피 향기',
    content:
      '커피콩이나 가루를 코로 들이마시면서 맡게되는 향기. 꽃향기(Floral), 향신료 향(Spicy)등으로 표현한다.',
  },
  {
    title: 'Flat',
    titleKo: '향기없는',
    content:
      '커피를 마신 후 향이 밋밋하거나 평이할 때 쓰는 표현. 잘못된 로스팅이나 보관법에 문제가 있을 때 발생한다.',
  },
  {
    title: 'Full',
    titleKo: '향기가 풍부한',
    content:
      '가스와 증기 상태의  네가지 향기가 적당한 강도로 균형되어 있는 것을 표현.',
  },
  {
    title: 'Caramelly',
    titleKo: '캐러멜향',
    content:
      '아로마에서 감지할 수 있으며 사탕이나 시럽을 연상하게 할 때 표현하는 용어이다. ',
  },
  {
    title: 'Carbony',
    titleKo: '탄내',
    content:
      '아로마에서 감지할 수 있으며 탄맛을 연상시키는 향미의 표현. 주로 강한 로스팅을 한 커피빈으로 만든 커피에서 느낄 수 있다.',
  },
  {
    title: 'Chocolaty',
    titleKo: '초콜릿향',
    content:
      '커피를 마신 다음 입안에서 느껴지는 후미, 달지 않은 다크 초콜릿이나 바닐라 맛을 연상하게 하는 향기.',
  },
  {
    title: 'Dirty',
    titleKo: '곰팡이내',
    content:
      '커피에서 깨끗하지 않은 곰팡이 냄새나 케케묵은 신맛이 날 때 쓰는 표현. 오염된 냄새.',
  },
  {
    title: 'Earthy',
    titleKo: '흙내',
    content:
      '글자 그대로 흙의 느낌이 커피맛에 배어나오는 경우에 쓰는 표현 용어이다. 그린빈을 건조하는 과정에서 감염되는 맛이다. 대체로 커피 전문가들은 그린빈 생산라인의 결함으로 보지만 일부 전문가들은 생산지의 이국적인 풍미라는 긍정적인 평가를 하기도 한다.',
  },
  {
    title: 'Fruity',
    titleKo: '과일향기',
    content:
      '볶은 커피나 추출된 커피에서 느껴지는 과일향기, 주로 밀감류나 베리 종류의 과실 향을 연상시키는 향을 일컫는다.',
  },
  {
    title: 'Grassy',
    titleKo: '풋내',
    content:
      '냄새와 맛에서 감지할 수 있는 풍미로 청정한 잔디밭을 연상할 수 있다.',
  },
  {
    title: 'Herby',
    titleKo: '허브향',
    content:
      '추출 커피에서 나는 향기로 휘발성이 강한 알데하이드와 에스텔에 의하여 생성되며 향기로운 야채 향기와 그린피스와 같은 향기가 있다.',
  },
  {
    title: 'Malty',
    titleKo: '맥아향',
    content: '커피를 마실 때 느껴지는 향기성분 중 하나로 볶은 곡물 향.',
  },
  {
    title: 'Musty',
    titleKo: '곰팡이내',
    content:
      '커피 맛에서 곰팡이 냄새처럼 묵네가 날 때 쓰는 표현(건조 시 습도 조절의 문제)',
  },
  {
    title: 'Spicy',
    titleKo: '향신료 향',
    content:
      '커피를 마신 다음 입안에 느껴지는 향기로 보통 계피나무나 정향나무 향기를 연상시킨다.',
  },
  {
    title: 'Nutty',
    titleKo: '견과향',
    content:
      '커피를 마실 때 느껴지는 향기로 고소한 견과류 향이나 볶은 땅콩 향을 연상하게 한다.',
  },
  {
    title: 'Turpeny',
    titleKo: '송진 내',
    content:
      '커피를 마신 다음  입안에서 느껴지는 향기로 송진 같은 수지 냄새와 소독 내를 연상케 한다.',
  },

  {
    title: 'Nose',
    titleKo: '마시면서 느끼는 향기',
    content: '캐러멜향, 초콜릿향, 텔핀향(송진내) 등이 있다.',
  },
  {
    title: 'Rich',
    titleKo: '향기가 진항',
    content:
      '볶은커피향, 추출 커피 향, 마시면서 느껴지는 향, 입안에 남는 향기 등 커피의 전체적인 향기가 진한 정도를 표현.',
  },
  {
    title: 'Rounded',
    titleKo: '향기가 부드러운',
    content: '향기가 보통보다 약한 정도를 표현.',
  },
  {
    title: 'Smoky',
    titleKo: '연기냄새',
    content: '탄내',
  },
];

const Aroma = () => {
  return (
    <div className="flex flex-row flex-wrap">
      {AromaData.map(
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

export default Aroma;
