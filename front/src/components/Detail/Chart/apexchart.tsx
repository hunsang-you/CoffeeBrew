import React, { useEffect, useRef } from 'react';
import ApexCharts from 'apexcharts';
import { detailType } from '../DetailBean';

interface PropsTypes {
  detailBean: detailType | null;
}

const Chart = ({ detailBean }: PropsTypes) => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const options = {
      series: [
        {
          name: 'coffee',
          data: [
            detailBean?.flavor,
            detailBean?.sweetness,
            detailBean?.acidity,
            detailBean?.body,
            detailBean?.bitterness,
          ],
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
        // background: {
        //   enabled: true,
        //   borderRadius: 7,
        // },
        // style: {
        //   colors: ['#D9D9D9'],
        // },
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
              colors: ['#D7DADC', '#D9D9D9'],
            },
          },
        },
      },

      // 각 평가도 항목
      xaxis: {
        categories: ['향', '단맛', '산미', '바디감', '쓴맛'],
        labels: {
          show: true,
          formatter: (subject: string, score: number) => {
            // 각 항목의 점수가 들어갈 예정
            score = 1;
            return subject + `(${score})`;
          },
          //   rotate: -45,
          //   formatter: (value, index) => {
          //     return this.props.subjects[index];
          //   },
        },
      },

      // y축으로 기준점수 표시
      yaxis: {
        // show -> true시 y축에 기준 표시, style로 조정
        show: false,
        // labels: {
        //   style: {
        //     fontSize: '12px',
        //     fontWeight: 500,
        //   },
        //   offsetX: 8,
        //   offsetY: 0,
        // },
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
