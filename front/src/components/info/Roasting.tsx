import tw from 'tailwind-styled-components';
import CardComponent from './Card';

type RoastingType = { title: string; titleKo: string; content: string }[];

const RoastingData: RoastingType = [
  {
    title: ' Light',
    titleKo: '라이트',
    content:
      '가장 덜 볶은 상태이다. 색은 노란빛을 띤 갈색이다. 바디와 향이 희박해 이 상태로 유통되는 경우는 거의 없다.',
  },
  {
    title: 'Cinnamon',
    titleKo: '시나몬',
    content:
      '콩의 수분이 증발하기 시작했음을 나타내는 시나몬 색이 특징이다. 제법 커피다운 향이 올라오지만 마시기에는 아직 적합지 않다.',
  },
  {
    title: 'Medium',
    titleKo: '미디엄',
    content:
      '밤색을 띤다. 1차 크랙이 시작된 후 끝날 때까지의 볶음도이다. 흔히 마시는 커피에는 대개 이 단계부터 사용된다.',
  },
  {
    title: 'High',
    titleKo: '하이',
    content:
      '미디엄 로스팅에 비해 향미가 강해지며 추출 시 맑은 액체 속에서 신맛과 은은한 바디가 느껴진다.',
  },
  {
    title: 'City',
    titleKo: '시티',
    content:
      '2차 크랙이 시작된 직후에 로스팅을 멈춘 상태이다. 초콜릿색을 띠며 신맛과 바디의 밸런스가 좋다. 초심자가 맛의 기준으로 삼기 좋다.',
  },
  {
    title: 'Full City',
    titleKo: '풀시티',
    content:
      '2차 크랙이 진행 되는 도중 로스팅을 멈춘 상태로 바디 속에서 존재감을 드러낼 정도의 쓴맛이 우러나오는 단계이다. 신맛은 거의 없다.',
  },
  {
    title: 'French',
    titleKo: '프렌치',
    content:
      '2차 크랙 이후 가열을 지속한 상태이다. 짙은 초콜릭색을 띠며 추출 시 강한 바디와 부드러운 쓴맛을 낸다.',
  },
  {
    title: 'Italian',
    titleKo: '이탈리안',
    content:
      '강볶음의 최상급으로 검정에 가깝다. 표면에 유지가 듬뿍 배어 나오며 살짝 탄 듯한 향미와 자극적인 쓴맛이 특징이다. ',
  },
];

const Roasting = () => {
  return (
    <div className="flex flex-row flex-wrap">
      {RoastingData.map(
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

export default Roasting;
