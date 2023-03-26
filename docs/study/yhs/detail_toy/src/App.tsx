import React from 'react';
import tw from 'tailwind-styled-components';
import './App.css';
import bean from './assets/bean.png';
import RadarChartExample from './chart/rechart';
import Chart from './chart/apexchart';
import { AiOutlineHeart } from 'react-icons/ai';

const Title = tw.p`text-left text-2xl mt-6 mb-6 ml-20`;
const Tests = tw.p`bg-slate-600 text-red-600 text-center`;

const Detail = tw.div`text-center bg-background`;

const Bean_top1 = tw.div`flex justify-center ml-8 mr-8`;
const Bean_desc = tw.div`flex ml-12 border-4 border-brownBorder w-592 `;
const Desc_left = tw.div`w-1/2 `;
const Bean_name = tw.div`w-1/2 text-left mt-6 ml-6 mb-3.5 text-3xl`;

const Bean_country = tw.div`text-left ml-6 text-1.5xl`;
const Bean_chart = tw.div`mt-5 mx-auto`;
const Null_div = tw.div``;
const Desc_right = tw.div`w-1/2 my-6 mr-6 ml-1 bg-slate-300`;
const Description = tw.div`mx-auto mt-2`;

const Line = tw.hr`h-px bg-red-600 border-dashed w-1040 mx-auto`;

const Bean_top2 = tw.div`text-center justify-center ml-20 mr-20 `;
const Move_bar = tw.div` flex justify-evenly w-1040 mx-auto `;
const Recbar_bean = tw.div`w-344 bg-rec_bean text-base`;
const Recbar_machine = tw.div`w-344 bg-rec_machine text-base`;
const Reviewbar = tw.div`w-344 bg-review text-base`;

const Recbox_bean = tw.div`w-1000 h-400 bg-gradient-to-r from-rec_beanbox1 to-rec_beanbox2 mx-auto`;
const Arrow_left = tw.div``;
const RecBean_img = tw.div``;
const RecBean_name = tw.div``;
const RecBean_country = tw.div``;
const RecBean_score = tw.div``;
const Arrow_right = tw.div``;

function App() {
  return (
    <Detail>
      <Tests>nav</Tests>
      <Bean_top1>
        <Null_div>
          <img src={bean} alt="img" id="bean_img" />
          <div className="icon-heart">{<AiOutlineHeart size={50} />}</div>
        </Null_div>

        <Bean_desc>
          <Desc_left>
            <Bean_name> 케냐 AA </Bean_name>
            <Bean_country> 원산지 : 케냐</Bean_country>
            <Bean_chart>
              <Chart />
              {/* <RadarChartExample /> */}
            </Bean_chart>
          </Desc_left>
          <Desc_right>
            <Description>
              감미로운 향과 과일의 단맛, 쌉쌀한 맛의 조화 감미로운 향과 과일의
              단맛, 쌉쌀한 맛의 조화 감미로운 향과 과일의 단맛, 쌉쌀한 맛의 조화
              감미로운 향과 과일의 단맛, 쌉쌀한 맛의 조화 감미로운 향과 과일의
              단맛, 쌉쌀한 맛의 조화
            </Description>
          </Desc_right>
        </Bean_desc>
      </Bean_top1>
      <Line></Line>

      <Bean_top2>
        <Move_bar>
          <Recbar_bean> 원두 추천 </Recbar_bean>
          <Recbar_machine> 기기 추천 </Recbar_machine>
          <Reviewbar> 리뷰 </Reviewbar>
        </Move_bar>
        <Null_div>
          <Title>이런 원두는 어떠세요?</Title>
        </Null_div>
        <Recbox_bean></Recbox_bean>
      </Bean_top2>
    </Detail>
  );
}

export default App;
