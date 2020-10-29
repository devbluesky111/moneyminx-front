import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

import { ChartData } from 'allocation/allocation.type';

const COLORS = ['#235ee7', '#10c273', '#e74f99', '#ffd911', '#1f32ad', '#f7b164', '#16977f', '#158fff', '#ffbc02', '#f5325c', '#b5d539', '#c73cb9', '#29cfd6', '#7854f6', '#ec7100', '#c11a1a', '#d3365f', '#b1c0d2', '#454d7f', '#14b8b8'];

interface MMPieChartProps {
  chartData: ChartData;
  width?: number;
  height?: number;
}

export const MMPieChart: React.FC<MMPieChartProps> = ({ chartData, height = 400, width = 400 }) => {

  const data = chartData.map((item) => ({
    name: item.group,
    value: item.per,
  }));

  return (
    <div className='allocation-chart-wrapper'>
      <ResponsiveContainer width={width} height={height} >
        <PieChart onMouseEnter={() => {}} className='mm-allocation-overview__block--chart'>
          <Pie data={data} cx={width / 2} cy={width / 2} innerRadius={95} outerRadius={155} fill='#000000' stroke='none' dataKey='value'>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip/>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};
