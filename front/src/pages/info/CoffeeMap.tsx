import { Fragment } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
//지도국기 이미지
import brazil from '../../assets/flags/brazil.svg';
import kenya from '../../assets/flags/kenya.svg';
import angola from '../../assets/flags/angola.svg';
import cambodia from '../../assets/flags/cambodia.svg';
import cameroon from '../../assets/flags/cameroon.svg';
import colombia from '../../assets/flags/colombia.svg';
import costarica from '../../assets/flags/costa rica.svg';
import cuba from '../../assets/flags/cuba.svg';
import dominican from '../../assets/flags/dominican republic.svg';
import ecuador from '../../assets/flags/ecuador.svg';
import elsalvador from '../../assets/flags/el salvador.svg';
import ethiopia from '../../assets/flags/ethiopia.svg';
import guatemela from '../../assets/flags/guatemala.svg';
import honduras from '../../assets/flags/honduras.svg';
import india from '../../assets/flags/india.svg';
import indonesia from '../../assets/flags/indonesia.svg';
import ivorycoast from '../../assets/flags/ivory coast.svg';
import jamaica from '../../assets/flags/jamaica.svg';
import laos from '../../assets/flags/laos.svg';
import madagascar from '../../assets/flags/madagascar.svg';
import nicaragua from '../../assets/flags/nicaragua.svg';
import papua from '../../assets/flags/papua new guinea.svg';
import peru from '../../assets/flags/peru.svg';
import philippines from '../../assets/flags/philippines.svg';
import thailand from '../../assets/flags/thailand.svg';
import uganda from '../../assets/flags/uganda.svg';
import venezuela from '../../assets/flags/venezuela.svg';
import vietnam from '../../assets/flags/vietnam.svg';
import yemen from '../../assets/flags/yemen.svg';

//여기까지
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  Annotation,
  ZoomableGroup,
} from 'react-simple-maps';
import { useState } from 'react';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  height: 400,
  overflow: 'auto',
  textOverflow: 'clip',
};

interface Country {
  nation: string;
  desc: string;
  flags: string;
}
interface CountryList {
  [code: string]: Country;
}

function CoffeeMap() {
  const [open, setOpen] = useState(false);
  const [checkNa, setChcekNa] = useState(''); //나라 id를 줘서
  const [region, setRegion] = useState<CountryList>({
    KEN: {
      nation: '케냐',
      desc: '아프리카 대표 생산국중 하나인 케냐입니다. 대표 커피로는 케냐 AA로 19세기 에티오피아를 통해 처음 커피 재배를 시작하였습니다. 국가 차원에서 관리하고 있습니다. 재배 품종은 아라비카 종으로 습식법으로 가공합니다. 4등급으로 커피 종류가 나뉘며 고급 커피로 케냐 수출품의 40%를 커피가 차지할 정도로 케냐의 대표 식품입니다. 짙은 향기가 특징이며 신맛, 와인맛, 과일맛을 가지고 있으며 진한 풍미를 가지고 있습니다. 생두는 대체로 밝은 청록 색이고 짙은 향미, 강한 향이 특징입니다.',
      flags: kenya,
    },
    BRA: {
      nation: '브라질',
      desc: '브라질 생두는 대부분 아라비카 품종으로 브라질산 커피중 고급으로 평가 받는 것은 상파올로 지역의 산토스 이며, 아라비카 품종으로 3~4년산에 수확 되는 산토스 버본이 좋은 평가를 받은 커피이다. 주로 재배하는 품종은 아라비카(Arabica) 뿐만 아니라, 버본(Bourbon), 티피카(Typica), 문도 노보(Mundo Novo), 카투라(Caturra), 카투아이(Catuai), 마라고지페(Maragogype) 등 아라비카(Arabica)의 변종 및 교배종, 코닐론(Conilon)이라는 로부스타(Robusta) 종이다. 커피 생산지역이 넓어서 지역별 기후 조건과 토양 특성에 따라 다양한 품종, 품질의 커피를 생산한다. 자연당도를 유지하기 위하여 건식가공법(Dry Method)을 이용한다. 저지대에서 재배되기 때문에 뚜렷한 특징이 있는 커피라기보다는 중성적인 커피로 에스프레소 베이스 블랜딩(Espresso Base Blending)에 주로 사용된다.',
      flags: brazil,
    },
    ETH: {
      nation: '에티오피아',
      desc: '아라비카 커피의 원산지로 아프리카 최대의 커피를 생각하는 지역입니다. 자연적으로 천혜커피의 커피 재배 환경을 가지고 있습니다. 열악한 자본과 환경 때문에 전통적인 유기농방법과 그늘 경작법 건식법으로 커피를 생산하고 있습니다. 대표적으로 예가체프(커피의 귀부인) 시다모(고지대에서 재배되는) 하라르(에티오피아의 축복) 원두가 있습니다. ',
      flags: ethiopia,
    },
    YEM: {
      nation: '예맨',
      desc: '예멘 모카는 가장 오랜 커피로 예멘의 모카항에서 많은 커피가 수출이 되면서 모카항의 이름을 따서 모카라 불리우고 있습니다. 모카 커피는 커피의 전통적인 맛을 잘 간직하고 있으며, 신미와 초코릿과 같은 풍미를 가지고 있다. 대부분 자연 경작되고 가공방식도 수작업으로 이루어져 생두의 모양이 제각각으로 울퉁불퉁하고 로스팅(ROasting) 후에도 원두의 색깔이 제각각이다. 생두를 통째로 빻아 이브릭(ibriq)이라는 주전자에 넣고 끓이는 터키식 커피를 주로 마시기 때문에 크기나 결점두에 따른 생두의 등급분류는 사실상 불가능하다고 볼 수 있다. 그러나 베니 마타르(Bani Mattar), 베니 이즈마일리(Bani Ismail), 히라지(Hiarazi), 수도인 사나(Sana.s) 인근 지역의 커피는 커피의 귀부인이라는 칭호를 받으며 고급커피로 인정받고 있다',
      flags: yemen,
    },
    PNG: {
      nation: '파푸아뉴기니',
      desc: '1937년경 자메이카 블루마운틴(Jamaica Blue Mountain) 종자가 이식되어 커피의 재배가 시작되었다. 가장 큰 섬인 뉴기니(New Guinea)에는 해발 4,694m의 빌헬름(Mt. Wilhelm)산이 있는데 이 지역을 중심으로 한 고원지대를 하이랜드(Highland)라고 부른다. 파푸아뉴기니 커피의 대부분이 생산되는 하이랜드는 적당한 강수량과 일조량 등 커피재배에 적합한 조건을 갖추고 있다. 주로 재배되는 품종은 아라비카(Arabica)이며 소량의 로부스타(Robusta)도 재배된다. 수확 시기는 4월~9월이고, 커피의 가공은 습식법(Wet Method)과 건식법(Dry Method)을 모두 사용한다. 커피가 재배되는 곳은 하겐(Mt. Hagen)산을 중심으로 한 시그리(Sigri), 아로나(Arona)지역이고, 대표적인 커피로는 위 지역명칭을 붙인 파푸아뉴기니 시그리(PNG AA)와 파푸아뉴기니 아로나가 있다. 달콤한 맛이 일품인 것으로 알려져 있고 신맛, 꽃과 과일 향 등 풍부한 향미를 가진 것으로 유명하다. 무엇보다도 품질도 뛰어나고 가격도 합리적인 것으로 알려져 있다.',
      flags: papua,
    },
    PER: {
      nation: '페루',
      desc: '남아메리카 중부 태평양 연악국가인 페루는 안데스 산맥 계곡지대를 중심으로 5곳의 주요 재배지에서 주로 생산합니다. 페루 커피 원두 95%가 북미와 유럽 아시아 등으로 수출되고 있으며, 남미 국가 중 커피 생산은 3위이며 페루 농산물 생산품으로는 1위를 차지합니다. 유기농 원두시장에서는 점차 그 위상이 높아지고 있으며, 국가에서 페루 커피의 날을 지정하여 커피축제를 열기도 한다. 페루 원두는 싱글 오리진 보다 블렌딩에 더 많이 사용됩니다. ',
      flags: peru,
    },
    COL: {
      nation: '콜룸비아',
      desc: '콜롬비아 커피의 대표적은 제품은 콜롬비아 중앙산맥에서 재배되는 MAM, 동부산맥에서 재배 되는 보고타와 부카라망가이며, 크기에 따라 등급을 나누며, 원두 크기가 큰 최상품이 슈프리모(Supremo)이며, 다음이 엑셀소(Excelso)이다. 유럽 선교사들을 통해 소개되어 1800년대 초부터 커피 경작이 시작되었고, 1900년을 기점으로 세계 최대 커피 생산국가로 발전하였다. 커피를 생산하는 안데스 산맥 지역은 해발고도 1,400m 이상으로 비옥한 화산재토양과 온화한 기후, 적절한 강수량 등 이상적인 재배 조건을 갖추고 있다. 카페테로(Cafetero)라고 불리는 농부들이 습식법(Wet Method)으로 생산하고 수확기는 10월~2월과 4월~6월 두 번이다.',
      flags: colombia,
    },
    CRI: {
      nation: '코스타리카',
      desc: '코스타리카 커피는 정부의 주도로 품질 관리를 하여 좋은 품질의 원두로 평가를 받고 있으며, 커피를 대부분 습식법으로 재배 생산하여 깔끔한 신맛과 풍부한 와인의 맛이 나는 커피로 재배 지역의 고도에 따라 품질이 구분되며, 가장 고급으로 평가 되는 원두는 산마르코스 드 타라수 (San Marcos de Tarrazu)이다. 국토 대부분이 무기질이 풍부한 화산토양과 온화한 기후로 이루어져 있어 커피 생산국 중에서도 면적당 커피 생산량이 가장 높고 커피의 품질 또한 우수한 것으로 알려져 있다. 커피 품종은 아라비카(Arabica)만을 재배할 수 있도록 법적으로 규제하고 커피 고유의 품질을 최대로 유지할 수 있는 습식 가공법(Wet Method)만을 고집하여 세계적으로 완벽한 커피로 칭송받고 있다.',
      flags: costarica,
    },
    NIC: {
      nation: '니카라과',
      desc: '국내에서는 많이 알려지지 않는 커피 생산국입니다. 높은 고산지대에서 커피를 대부분 생산합니다. 니카라과 커피는 쓴맛과 신맛이 높은 편이지만 단맛이 강한 편입니다. 대부분의 맛과 향이 높은 편이라 꽉차있는 느낌이 좋습니다. 전체적인 맛과 향이 높은 편이라서 전문가들은 매우 부드럽고 맛과 향이 우수한데 사람들에겐 잘 알려지지 않았다고 평가를 하는 원두입니다. 향은 오렌지향과 초콜릿향이 절묘하게 어울러진 향이 난다고 합니다.',
      flags: nicaragua,
    },
    GTM: {
      nation: '과테말라',
      desc: '과테말라의 대표적 명품 원두는 생산지명을 딴 안티구아(Antigua) 이며, 안티과 커피는 특유의 스모크향을 지니고 있는 것으로 그 이유로 많은 화산 활동으로 풍부해진 질소를 커피나무가 흡수를 하면서 특유의 향을 가진다. 1750년대에 커피가 처음 소개되었으나 19세기 초반에 이르러 본격적인 생산이 시작되었다. 전형적인 아라비카(Arabica) 품종인 타이피카(Typica)와 버본(Bourbon)종을 주로 경작한다. 국토 대부분이 미네랄이 풍부한 화산재 토양으로 이루어져 있고, 기후 또한 건기와 우기가 뚜렷하며, 일교차와 습도 차가 커서 커피 재배에 이상적이다. 특히 태평양 연안지역은 33개의 화산지역으로 이루어져 있어 고급 스모크 커피(Smoke Coffee; 타는 듯한 향을 가진 커피)의 대명사인 안티쿠아(Antigua)를 생산한다.',
      flags: guatemela,
    },
    VEN: { nation: '베네수엘라', desc: 'dd', flags: venezuela },
    DOM: { nation: '도미니카 공화국', desc: 'dd', flags: dominican },
    CUB: { nation: '쿠바', desc: 'dd', flags: cuba },
    JAM: {
      nation: '자메이카',
      desc: '자메이카 블루마운틴은 커피로서의 모든 매력 뛰어난 맛과 향을 지니고 있는 커피로 평가 되어 높은 가격에 거래가 되고 있는 커피이며, 산악 고지대에서 생산 되는 생두를 블루마운틴이라 합니다. (그보다 낮은지대에서 생산 되는 생두는 하이마운틴이다.) 1728년 커피 경작이 시작되었고 1768년 커피 산업이 크게 발전하였다. 섬의 대부분이 고지대 산악지역으로 기후가 서늘하고 안개가 잦으며 강수량이 많고 배수가 잘 되는 토양으로 이루어져 커피 재배에 이상적이다. 특히 동쪽 블루마운틴(Mt. Blue mountain) 기슭의 해발 1,200m 이상 지역의 짙은 안개는 커피나무의 성장을 더디게 하여 타 지역에 비해 생두의 밀도가 높고 우수한데, 이 커피를 블루마운틴(Blue mountain)이라고 부른다. 재배되는 품종은 아라비카(Arabica)이며 수확은 8월~9월경, 습식법(Wet Method)으로 가공한다.',
      flags: jamaica,
    },
    SLV: { nation: '엘살바도르', desc: 'dd', flags: elsalvador },
    HND: {
      nation: '온두라스',
      desc: '18세기 이전부터 커피가 재배되었을 것으로 추정된다. 국토의 70~80%가 고지대 산악지형으로 이루어져 있고, 커피 재배에 적합한 화산재 토양을 갖고 있다. 커피의 수확은 5월~10월경이며 재배 품종은 아라비카(Arabica)로 습식법(Wet Method)을 이용하여 가공한다. 가장 유명한 커피는 온두라스 SHG, 온두라스 HG이며 지역명 또는 컵 오브 엑셀런스(COE)에서 우승한 농장명을 함께 사용하기도 한다. 원두는 대체로 둥글고 외형이 균일한 편이다. 맛은 부드러운 신맛과 캐러멜향, 약간의 쓴맛이 조화를 이루어 스트레이트 커피(Straight Coffee)로도 이용하지만 주로 블렌딩(Blending)에 많이 사용된다.',
      flags: honduras,
    },
    ECU: { nation: '에콰도르', desc: 'dd', flags: ecuador },
    CMR: { nation: '카메룬', desc: 'dd', flags: cameroon },
    UGA: { nation: '우간다', desc: 'dd', flags: uganda },
    IND: {
      nation: '인도',
      desc: '1585년 이슬람의 메카(Mecca)에서 전래되어 1840년 이후부터 본격적인 커피 생산이 시작되었다. 열대성 기후인 인도는 커피 재배에 적합한 강수량과 배수가 잘되는 비옥한 고원지대를 갖추고 있다. 아라비카(Arabica)와 로부스타(Robusta)가 1:6 정도의 비율로 재배되며 수확은 11월~2월에 이루어진다. 주요 생산지는 남부지방의 고지대에 있는 마이소르(Mysore), 말라바르(Malabar), 마드라스(Madras) 등이 있다. 생두는 대체로 큰 편이고 껍질이 매끄러운 녹색을 띤다. 유명한 스페셜티 커피(Specialty Coffe) 3종으로 몬순 말라바르(Monsooned Malabar), 마이소르 너깃 엑스트라 볼드(Mysore Nuggets Extra Bold), 로부스타 카피 로얄(Robusta Kaapi Royale)이 있다. 그 중 세계 최초의 스페셜티 커피로 가장 유명한 것은 몬순 말라바르인데 노란빛을 띠며 톡 쏘는 맛, 풀 맛이 밴 풍부한 맛, 진한 쓴맛으로 에스프레소 용으로 적합하다는 평가를 받는다.',
      flags: india,
    },
    LAO: { nation: '라오스', desc: 'dd', flags: laos },
    VNM: { nation: '베트남', desc: 'dd', flags: vietnam },
    THA: { nation: '태국', desc: 'dd', flags: thailand },
    PHL: { nation: '필리핀', desc: 'dd', flags: philippines },
    IDN: {
      nation: '인도네시아',
      desc: '인도네시아는 자바섬을 중심으로 수마트라, 술라베시 3개 지역에서 커피를 재배 하고 있으며, 자바 원두중 명품 원두는 올드자바이며, 수마트라섬 고산지대에서 생산 되는 만델링(Mandheling) 산도가 높고 단맛과 쓴맛의 조화가 좋은 커피이며, 술라베시 섬에서는 산도가 약간 강한 셀레베스 토라야(Celebes Toraja) 가 생산 되고 있습니다. 네덜란드에서 커피나무가 이식되면서 1696년 자바섬에서 커피재배가 시작되었다. 대체로 무기질이 풍부한 화산지형을 갖고 있어 커피재배에 이상적이지만, 1877년 커피 녹병(Coffee Leaf Rust)으로 전체 커피농장들이 초토화되면서 병충해에 강한 로부스타 커피(Robusta Coffee)를 주로 재배하게 되었다.',
      flags: indonesia,
    },
    AGO: { nation: '앙고라', desc: 'dd', flags: angola },
    MDG: { nation: '마다가스카르', desc: 'dd', flags: madagascar },
    CIV: { nation: '코트디부아르', desc: 'dd', flags: ivorycoast },
    LKA: { nation: '캄보디아', desc: 'dd', flags: cambodia },
  }); // 그것을 이용해서 바로 찾는다 O(1)구현
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [content, setContent] = useState('');
  const handleClick = (geo: any) => () => {
    console.log(geo);
  };
  const showModal = (id: string) => {
    setChcekNa(id);
    handleOpen();
  };
  const regionColor = (geo: any) => {
    //지도 색깔체크
    if (
      geo.id === 'KEN' ||
      geo.id === 'ETH' ||
      geo.id === 'YEM' ||
      geo.id === 'PNG' ||
      geo.id === 'PER' ||
      geo.id === 'COL' ||
      geo.id === 'CRI' ||
      geo.id === 'NIC' ||
      geo.id === 'GTM' ||
      geo.id === 'VEN' ||
      geo.id === 'DOM' ||
      geo.id === 'CUB' ||
      geo.id === 'JAM' ||
      geo.id === 'SLV' ||
      geo.id === 'HND'
    ) {
      return '#F53';
    } else if (
      geo.id === 'BRA' ||
      geo.id === 'ECU' ||
      geo.id === 'CIV' ||
      geo.id === 'CMR' ||
      geo.id === 'UGA' ||
      geo.id === 'IND' ||
      geo.id === 'LKA' ||
      geo.id === 'LAO' ||
      geo.id === 'VNM' ||
      geo.id === 'THA' ||
      geo.id === 'PHL' ||
      geo.id === 'IDN'
    ) {
      return '#B2FA5C';
    } else if (geo.id === 'AGO' || geo.id === 'MDG') {
      return '#3296FF';
    } else {
      return '#F6F5EF';
    }
  };
  const markers = [
    {
      posi: [48.24, 15.95],
      dx: 20,
      dy: -6,
      x: 24,
      name: '예맨',
      id: 'YEM',
    },
    {
      posi: [42.16, 8.77],
      dx: 20,
      dy: -6,
      x: 55,
      name: '에티오피아',
      id: 'ETH',
    },
    {
      posi: [39.16, 0.77],
      dx: 20,
      dy: -6,
      x: 23,
      name: '케냐',
      id: 'KEN',
    },
    {
      posi: [32.67, 1.91],
      dx: -20,
      dy: -40,
      x: -2,
      name: '우간다',
      id: 'UGA',
    },
    {
      posi: [12.8, 5.07],
      dx: -20,
      dy: -30,
      x: -2,
      name: '카메룬',
      id: 'CMR',
    },
    {
      posi: [-5.54, 7.31],
      dx: -20,
      dy: -6,
      x: -4,
      name: '코트디부아르',
      id: 'CIV',
    },
    {
      posi: [17.56, -12.9],
      dx: -20,
      dy: -6,
      x: -2,
      name: '앙고라',
      id: 'AGO',
    },
    {
      posi: [47.23, -19],
      dx: 20,
      dy: -6,
      x: 66,
      name: '마다가스카르',
      id: 'MDG',
    },
    {
      posi: [76.24, 19.95],
      dx: -20,
      dy: -6,
      x: -2,
      name: '인도',
      id: 'IND',
    },
    {
      posi: [80.64, 7.95],
      dx: -20,
      dy: 10,
      x: -2,
      name: '캄보디아',
      id: 'LKA',
    },
    {
      posi: [100.24, 15.95],
      dx: -20,
      dy: -6,
      x: -2,
      name: '태국',
      id: 'THA',
    },
    {
      posi: [102.24, 18.95],
      dx: -20,
      dy: -45,
      x: -2,
      name: '라오스',
      id: 'LAO',
    },
    {
      posi: [108.24, 11.95],
      dx: 20,
      dy: -30,
      x: 35,
      name: '베트남',
      id: 'VNM',
    },
    {
      posi: [123.24, 12.95],
      dx: 20,
      dy: -6,
      x: 34,
      name: '필리핀',
      id: 'PHL',
    },
    {
      posi: [110.24, -2.95],
      dx: -20,
      dy: -6,
      x: -2,
      name: '인도네시아',
      id: 'IDN',
    },
    {
      posi: [144.24, -5.91],
      dx: 0,
      dy: -30,
      x: 15,
      y: -8,
      name: '파푸아뉴기니',
      id: 'PNG',
    },
    {
      posi: [-45, -7.22],
      dx: 25,
      dy: -6,
      x: 35,
      name: '브라질',
      id: 'BRA',
    },
    {
      posi: [-76, -8.9],
      dx: -20,
      dy: -6,
      x: -2,
      name: '페루',
      id: 'PER',
    },
    {
      posi: [-78.5, -0.9],
      dx: -20,
      dy: -6,
      x: -2,
      name: '에콰도르',
      id: 'ECU',
    },
    {
      posi: [-72.5, 3],
      dx: -20,
      dy: -6,
      x: -2,
      name: '콜롬비아',
      id: 'COL',
    },
    {
      posi: [-65, 7],
      dx: 30,
      dy: -20,
      x: 55,
      name: '베네수엘라',
      id: 'VEN',
    },
    {
      posi: [-84.5, 10],
      dx: -40,
      dy: 6,
      x: -2,
      name: '코스타리카',
      id: 'CRI',
    },
    {
      posi: [-84.5, 13],
      dx: 20,
      dy: -3,
      x: 42,
      name: '니카라과',
      id: 'NIC',
    },
    {
      posi: [-88.9, 13.5],
      dx: -40,
      dy: 6,
      x: -2,
      name: '엘살바도르',
      id: 'SLV',
    },
    {
      posi: [-90.5, 15],
      dx: -40,
      dy: -6,
      x: -2,
      name: '과테말라',
      id: 'GTM',
    },
    {
      posi: [-87, 15],
      dx: 0,
      dy: -30,
      x: 22,
      y: -7,
      name: '온두라스',
      id: 'HND',
    },
    {
      posi: [-78, 22],
      dx: 10,
      dy: -10,
      x: 23,
      name: '쿠바',
      id: 'CUB',
    },
    {
      posi: [-77.4, 18.3],
      dx: 10,
      dy: -10,
      x: 43,
      name: '자메이카',
      id: 'JAM',
    },
    {
      posi: [-70.5, 18.8],
      dx: 30,
      dy: 6,
      x: 72,
      name: '도미니카공화국',
      id: 'DOM',
    },
  ];

  return (
    <div className="bg-white">
      <div>
        <div>react-simple-maps test</div>
        <ComposableMap
          projectionConfig={{
            scale: 155,
            rotate: [-11, 0, 0],
          }}
          width={700}
          height={400}
          style={{ width: '100%', height: 'auto' }}
        >
          <Geographies geography="/features.json">
            {({ geographies }) => {
              return (
                <Fragment>
                  {geographies.map((geo: any) => (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      onClick={() => {
                        if (
                          geo.id === 'KEN' ||
                          geo.id === 'ETH' ||
                          geo.id === 'YEM' ||
                          geo.id === 'PNG' ||
                          geo.id === 'PER' ||
                          geo.id === 'COL' ||
                          geo.id === 'CRI' ||
                          geo.id === 'NIC' ||
                          geo.id === 'GTM' ||
                          geo.id === 'VEN' ||
                          geo.id === 'DOM' ||
                          geo.id === 'CUB' ||
                          geo.id === 'JAM' ||
                          geo.id === 'SLV' ||
                          geo.id === 'HND' ||
                          geo.id === 'BRA' ||
                          geo.id === 'ECU' ||
                          geo.id === 'CIV' ||
                          geo.id === 'CMR' ||
                          geo.id === 'UGA' ||
                          geo.id === 'IND' ||
                          geo.id === 'LKA' ||
                          geo.id === 'LAO' ||
                          geo.id === 'VNM' ||
                          geo.id === 'THA' ||
                          geo.id === 'PHL' ||
                          geo.id === 'IDN' ||
                          geo.id === 'AGO' ||
                          geo.id === 'MDG'
                        ) {
                          showModal(geo.id);
                        }
                      }}
                      style={{
                        default: {
                          fill: regionColor(geo),
                          stroke: '#607D8B',
                          strokeWidth: 0.55,
                          outline: 'none',
                        },
                        hover: {
                          fill: regionColor(geo),
                          stroke: '#607D8B',
                          strokeWidth: 0.55,
                          outline: 'none',
                        },
                        pressed: {
                          fill: '#EEE',
                          stroke: '#607D8B',
                          strokeWidth: 0.75,
                          outline: 'none',
                        },
                      }}
                    />
                  ))}
                  {markers.map(({ name, dx, dy, x, y, posi, id }) => (
                    <Annotation
                      key={name}
                      subject={[posi[0], posi[1]]}
                      dx={dx}
                      dy={dy}
                      curve={0.7}
                      connectorProps={{
                        stroke: '#000',
                        strokeWidth: 2,
                        strokeLinecap: 'round',
                        strokeOpacity: 0.6, //투명도
                        // strokeDasharray: 2,//점선
                      }}
                    >
                      <text
                        cursor="default"
                        onClick={() => {
                          if (
                            id === 'KEN' ||
                            id === 'ETH' ||
                            id === 'YEM' ||
                            id === 'PNG' ||
                            id === 'PER' ||
                            id === 'COL' ||
                            id === 'CRI' ||
                            id === 'NIC' ||
                            id === 'GTM' ||
                            id === 'VEN' ||
                            id === 'DOM' ||
                            id === 'CUB' ||
                            id === 'JAM' ||
                            id === 'SLV' ||
                            id === 'HND' ||
                            id === 'BRA' ||
                            id === 'ECU' ||
                            id === 'CIV' ||
                            id === 'CMR' ||
                            id === 'UGA' ||
                            id === 'IND' ||
                            id === 'LKA' ||
                            id === 'LAO' ||
                            id === 'VNM' ||
                            id === 'THA' ||
                            id === 'PHL' ||
                            id === 'IDN' ||
                            id === 'AGO' ||
                            id === 'MDG'
                          ) {
                            showModal(id);
                          }
                        }}
                        x={x}
                        y={y ? y : 0}
                        textAnchor="end"
                        alignmentBaseline="middle"
                        fill="#000"
                        fontSize={10}
                      >
                        {name}
                      </text>
                    </Annotation>
                  ))}
                </Fragment>
              );
            }}
          </Geographies>
        </ComposableMap>
      </div>
      <div></div>
      {checkNa !== '' ? (
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          onClose={handleClose}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              timeout: 500,
            },
          }}
        >
          <Fade in={open}>
            <Box sx={style}>
              <img
                src={region[checkNa].flags}
                width={64}
                height={64}
                alt="nono"
                className="block m-auto"
              />

              <Typography
                id="transition-modal-title"
                variant="h3"
                component="h2"
                textAlign={'center'}
              >
                {region[checkNa].nation}
              </Typography>
              <Typography
                id="transition-modal-description"
                sx={{ mt: 3 }}
                variant="h6"
              >
                {region[checkNa].desc}
              </Typography>
            </Box>
          </Fade>
        </Modal>
      ) : null}
    </div>
  );
}

export default CoffeeMap;
