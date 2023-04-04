import tw from 'tailwind-styled-components';
import CardComponent from './Card';

type BodyType = { title: string; titleKo: string; content: string }[];

const BodyData = [
  {
    title: 'Body',
    titleKo: '농도',
    content:
      '커피를 마실 때 입 안에서 느껴지는 무게감, 점성도, 질감 등 물리적인 촉감(Mouth Feel). Light(Thin), Medium, Full로 표현한다.',
  },
  {
    title: 'Buttery',
    titleKo: '매우 기름진',
    content:
      '오일감이 풍부하게 나는 커피의 풍미를 표현.추출 커피에 지방과 섬유질 성분이 매우 많이 있을때 나타나는 입안의 촉감. 중후함이 가장 강한 상태. 에스프레소에서 많이 느껴진다.',
  },
  {
    title: 'Creamy',
    titleKo: '기름진',
    content:
      '생두 중 기름 성분이 많이 나타날때 쓰는 표현. 중후함이 강한 상태의 촉감. ',
  },
  {
    title: 'Heavy',
    titleKo: '무거운',
    content:
      '추출 커피의 중후함이 강한 상태. Creamy와 같다. 추출액에 고형분, 작은  섬유질과 단백질이 많을 때 느껴진다.',
  },
  {
    title: 'Light',
    titleKo: '연한',
    content:
      '커피량을 적게 넣고 추출한 커피에서 느껴진다.중후함의 정도가 약할 때 쓰는 표현.',
  },
  {
    title: 'Smooth',
    titleKo: '부드러운',
    content:
      '생두나 추출 커피의 지방 성분이 약간 적을 때 느껴지는 촉감. 중후함이 Light와 같다.',
  },
  {
    title: 'Thick',
    titleKo: '진한',
    content:
      '추출 커피 중에 고형분이 많이 있을 때 느껴지는 촉감. 에스프레소의 특징중 하나.',
  },
  {
    title: 'Thin',
    titleKo: '묽은',
    content:
      '추출 커피 중 고형분이 적게 들어 있을 때 느껴지는 촉감. 커피량이 적을 때 주로 나타난다.',
  },
  {
    title: 'Watery',
    titleKo: '싱거운',
    content:
      '맛 커피 추출 시 물의 양이 적절한 비율이 아니었을 때 지방의 함유량이 떨어져 나타나는 맛의 표현 용어이다.',
  },
];

const BodyGam = () => {
  return (
    <div className="flex flex-row flex-wrap">
      {BodyData.map(
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

export default BodyGam;
