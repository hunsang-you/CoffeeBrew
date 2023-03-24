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
    KEN: { nation: '케냐', desc: '좆같은나라입니다.', flags: kenya },
    BRA: {
      nation: '브라질',
      desc: '브라질커피는 맛있습니다.',
      flags: brazil,
    },
    ETH: { nation: '에티오피아', desc: 'dd', flags: ethiopia },
    YEM: { nation: '예맨', desc: 'dd', flags: yemen },
    PNG: { nation: '파푸아뉴기니', desc: 'dd', flags: papua },
    PER: { nation: '페루', desc: 'dd', flags: peru },
    COL: { nation: '콜룸비아', desc: 'dd', flags: colombia },
    CRI: { nation: '코스타리카', desc: 'dd', flags: costarica },
    NIC: { nation: '니카라과', desc: 'dd', flags: nicaragua },
    GTM: { nation: '과테말라', desc: 'dd', flags: guatemela },
    VEN: { nation: '베네수엘라', desc: 'dd', flags: venezuela },
    DOM: { nation: '도미니카 공화국', desc: 'dd', flags: dominican },
    CUB: { nation: '쿠바', desc: 'dd', flags: cuba },
    JAM: { nation: '자메이카', desc: 'ddd', flags: jamaica },
    SLV: { nation: '엘살바도르', desc: 'dd', flags: elsalvador },
    HND: { nation: '온두라스', desc: 'dd', flags: honduras },
    ECU: { nation: '에콰도르', desc: 'dd', flags: ecuador },
    CMR: { nation: '카메룬', desc: 'dd', flags: cameroon },
    UGA: { nation: '우간다', desc: 'dd', flags: uganda },
    IND: { nation: '인도', desc: 'dd', flags: india },
    LAO: { nation: '라오스', desc: 'dd', flags: laos },
    VNM: { nation: '베트남', desc: 'dd', flags: vietnam },
    THA: { nation: '태국', desc: 'dd', flags: thailand },
    PHL: { nation: '필리핀', desc: 'dd', flags: philippines },
    IDN: { nation: '인도네시아', desc: 'dd', flags: indonesia },
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
    <div className="App">
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
                variant="h6"
                component="h2"
                textAlign={'center'}
              >
                {region[checkNa].nation}
              </Typography>
              <Typography id="transition-modal-description" sx={{ mt: 2 }}>
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
