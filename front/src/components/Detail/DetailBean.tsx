import React from 'react';
import tw from 'tailwind-styled-components';
import bean from '../../assets/bean.png';
import bean2 from '../../assets/bean2.png';
import machine1 from '../../assets/machine1.png';
// import RadarChartExample from './Chart/rechart';
import Chart from './Chart/apexchart';
import { AiOutlineHeart } from 'react-icons/ai';

const Title = tw.p`text-left text-2xl mt-6 mb-6 ml-20`;
const Null_div = tw.div``;

const Detailbg = tw.div`text-center bg-background mt-10vh`;

const Bean_top1 = tw.div`flex justify-center ml-8 mr-8`;
const Bean_img1 = tw.img`object-cover`;
const Heart_img1 = tw.div`flex justify-center`;

const Bean_desc = tw.div`flex ml-12 border-4 border-brownBorder w-592 `;
const Bean_ImgBox = tw.div`w-360`;
const Desc_left = tw.div`w-1/2 `;

const Bean_name = tw.div`w-1/2 text-left mt-6 ml-6 mb-3.5 text-3xl`;
const Bean_country = tw.div`text-left ml-6 text-2xl`;
const Bean_chart = tw.div`mt-5 mx-auto`;
const Desc_right = tw.div`w-1/2 my-6 mr-6 ml-1 bg-slate-300`;
const Description = tw.div`mx-auto mt-2`;

const Line = tw.hr`h-px bg-red-600 border-dashed w-1040 mx-auto`;

const Bean_top2 = tw.div`text-center justify-center ml-20 mr-20 `;
const Move_bar = tw.div` flex justify-evenly w-1040 mx-auto `;
const Recbar_bean = tw.div`w-344 bg-recBean text-base`;
const Recbar_machine = tw.div`w-344 bg-recMachine text-base`;
const Reviewbar = tw.div`w-344 bg-review text-base`;

const Recbox_bean = tw.div`flex justify-center w-1000 h-400 bg-gradient-to-r from-recBeanbox1 to-recBeanbox2  mx-auto `;
const RecBean_img = tw.img`w-60 h-60`;
const RecBean_name = tw.div`text-3xl `;
const RecBean_country = tw.div``;
const RecBean_score = tw.div``;

const RecMachine = tw.div`flex `;
const RecMachineImg = tw.img``;

const DetailBean = (): JSX.Element => {
  return (
    <Detailbg>
      <Bean_top1>
        <Bean_ImgBox>
          <Bean_img1 src={bean} alt="img" />
          <Heart_img1> {<AiOutlineHeart size={50} />} </Heart_img1>
        </Bean_ImgBox>

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
        <Recbox_bean>
          <RecBean_img src={bean2} />
          <RecBean_name> 파푸아뉴기니 AA</RecBean_name>
        </Recbox_bean>
      </Bean_top2>
      <Line></Line>
      <Bean_top2>
        <Null_div>
          <Title> 이렇게 먹어볼까요? </Title>
        </Null_div>
        <RecMachine>
          <RecMachineImg src={machine1} alt="machine" />
        </RecMachine>
      </Bean_top2>
    </Detailbg>
  );
};

export default DetailBean;
