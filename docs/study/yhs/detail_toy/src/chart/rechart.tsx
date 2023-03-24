import React from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  Legend,
  PolarAngleAxis,
  PolarRadiusAxis,
} from "recharts";

interface Data {
  score: string;
  A: number;
  fullMark: number;
}

const data: Data[] = [
  { score: "맛", A: 5, fullMark: 5 },
  { score: "향", A: 4, fullMark: 5 },
  { score: "산미", A: 3, fullMark: 5 },
  { score: "밸런스", A: 2, fullMark: 5 },
  { score: "바디감", A: 1, fullMark: 5 },
];

const RadarChartExample: React.FC = () => {
  return (
    <RadarChart
      cx={150}
      cy={150}
      outerRadius={80}
      width={300}
      height={250}
      data={data}
    >
      <PolarGrid />
      <PolarAngleAxis dataKey="score" tick={{ fontSize: 12 }} />
      <PolarRadiusAxis angle={18} domain={[0, 5]} tick={{ fontSize: 10 }} />

      <Radar
        name="Mike"
        dataKey="A"
        stroke="#8884d8"
        fill="#8884d8"
        fillOpacity={0.3}
      />
      {/* <Legend /> */}
    </RadarChart>
  );
};

export default RadarChartExample;
