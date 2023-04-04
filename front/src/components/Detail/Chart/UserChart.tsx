import React, { useState, useEffect, useRef } from 'react';
import ApexCharts from 'apexcharts';

type ChartProps = {};

const Chart: React.FC<ChartProps> = () => {
  const chartRef = useRef<HTMLDivElement>(null);
  const [categories, setCategories] = useState([
    '향',
    '단맛',
    '산미',
    '바디감',
    '쓴맛',
    '총점',
  ]);

  useEffect(() => {
    const options = {
      series: [
        {
          name: 'coffee',
          data: [1, 4, 3.5, 4, 1, 3],
        },
      ],

      // 차트 속성
      chart: {
        height: 270,
        type: 'radar',

        // toolbar true => 다운로드 버튼 생김
        toolbar: {
          show: false,
        },
        dropShadow: {
          enabled: true,
          blur: 1,
          left: 1,
          top: 1,
        },
      },
      // enabled : true => 점마다 label생김
      dataLabels: {
        enabled: false,
      },
      plotOptions: {
        // 차트의 크기,위치 및 색깔 지정
        radar: {
          size: 100,
          offsetX: 20,
          offsetY: 0,
          polygons: {
            strokeColors: '#FFFFFF',
            fill: {
              colors: [
                '#B1662F',
                '#B1662F',
                '#CC651A',
                '#CC651A',
                '#FB8C3B',
                '#FB8C3B',
                '#E48642',
                '#E48642',
                '#F8B584',
              ],
            },
          },
        },
      },

      // 각 평가도 항목
      xaxis: {
        categories: ['향', '단맛', '산미', '바디감', '쓴맛', '총점'],
        labels: {
          show: true,
          formatter: (subject: string) => {
            const index = categories.indexOf(subject);
            if (index >= 0) {
              return subject + `(${options.series[0].data[index]})`;
            }
          },
        },
      },

      // y축으로 기준점수 표시
      yaxis: {
        // show -> true시 y축에 기준 표시, style로 조정
        show: false,
        max: 6,
      },
      // mousehover시 툴팁생김
      tooltip: {
        enabled: false,
      },
    };
    const Chart = new ApexCharts(chartRef.current, options);
    Chart.render();

    return () => {
      Chart.destroy();
    };
  }, []);

  return <div ref={chartRef} />;
};

export default Chart;
