import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Label, CartesianAxis } from 'recharts';

const SimpleBarChart = () => {
  const data = [
    {
      name: 'Jan 20',
      uv: 4000,
      tv: 4000,
      pv: 2400,
      amt: 20,
    },
    {
      name: 'Feb 20',
      uv: 3000,
      tv: 4000,
      pv: 1398,
      amt: 21,
    },
    {
      name: 'Mar 20',
      uv: 2000,
      tv: 4000,
      pv: 1800,
      amt: 22,
    },
    {
      name: 'Apr 20',
      uv: 2780,
      tv: 4000,
      pv: 3908,
      amt: 45,
    },
    {
      name: 'May 20',
      uv: 1890,
      tv: 4000,
      pv: 4800,
      amt: 67,
    },
    {
      name: 'Jun 20',
      uv: 2390,
      tv: 4000,
      pv: 3800,
      amt: 45,
    },
    {
      name: 'Jul 20',
      uv: 3490,
      tv: 4000,
      pv: 4300,
      amt: 23,
    },
    {
      name: 'Aug 20',
      uv: 3490,
      tv: 4000,
      pv: 4300,
      amt: 56,
    },
    {
      name: 'Sep 20',
      uv: 3490,
      tv: 6000,
      pv: 5000,
      amt: 78,
    },
  ];

  return (
    <div style={{ overflow: 'scroll' }}>
      <BarChart
        width={800}
        height={354}
        data={data}
        barGap={2}
        barCategoryGap={20}
        margin={{
          top: 5,
          right: 5,
          left: 5,
          bottom: 5,
        }}
      >
        <XAxis dataKey='name' tickSize={0} tickMargin={10} />
        <YAxis
          orientation='right'
          minTickGap={10}
          axisLine={false}
          tickSize={0}
          tickMargin={10}
          tickFormatter={(tick) => `$${tick}m`}
        />
        <Bar dataKey='pv' fill='#235EE7' />
        <Bar dataKey='tv' fill='#29CFD6' />
        <Bar dataKey='uv' fill='#D3365F' />
      </BarChart>
    </div>
  );
};

export default SimpleBarChart;
