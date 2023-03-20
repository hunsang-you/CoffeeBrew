import React from 'react';
import tw from 'tailwind-styled-components';
import './App.css';
import bean from './assets/bean.png';
import RadarChartExample from './chart/rechart';
import Chart from './chart/apexchart';
import { AiOutlineHeart } from 'react-icons/ai';

const Tests = tw.p`bg-slate-600 text-red-600 text-center`;
function App() {
  return (
    <div className="App">
      <Tests>
        유헌상
        바보ssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss
      </Tests>
      <div className="bean_top1">
        <div>
          <img src={bean} alt="img" id="bean_img" width={360} height={360} />
          <div id="heart">{<AiOutlineHeart />}</div>
        </div>

        <div className="bean_desc">
          <div className="desc_left">
            <div id="bean_name">케냐AA</div>
            <div id="bean_country"> 원산지 : 케냐</div>
            <div id="bean_info">
              <Chart />
              {/* <RadarChartExample /> */}
            </div>
          </div>
          <div className="desc_right">
            <p>
              감미로운 향과 과일의 단맛, 쌉쌀한 맛의 조화 감미로운 향과 과일의
              단맛, 쌉쌀한 맛의 조화 감미로운 향과 과일의 단맛, 쌉쌀한 맛의 조화
              감미로운 향과 과일의 단맛, 쌉쌀한 맛의 조화 감미로운 향과 과일의
              단맛, 쌉쌀한 맛의 조화
            </p>
          </div>
        </div>
      </div>
      <hr id="line" />
    </div>
  );
}

export default App;
