import React from 'react';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';

import { ChartData } from 'allocation/allocation.type';

const COLORS = ['#235EE7', '#1F32AD', '#FFBC02', '#29CFD6', '#D3365F'];

interface MMPieChartProps {
  chartData: ChartData;
  width?: number;
  height?: number;
}

export const MMPieChart: React.FC<MMPieChartProps> = ({ chartData, height = 440, width = 440 }) => {
  const data = chartData.map((item) => ({
    name: item.group,
    value: item.per,
  }));

  return (
    <div className='current-allocation-chart-wrapper'>
      <PieChart width={width} height={height} onMouseEnter={() => {}} className='mm-allocation-overview__block--chart'>
        <Pie data={data} cx={250} cy={200} innerRadius={95} outerRadius={155} fill='#000000' stroke='none' dataKey='value'>
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </div>
  );
};
