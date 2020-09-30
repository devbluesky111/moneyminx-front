import React from 'react';
import { BarChart, Bar, XAxis, YAxis } from 'recharts';

import { NetworthBarGraphProps } from 'networth/networth.type';
import CircularSpinner from 'common/components/spinner/circular-spinner';

const NetworthBarGraph: React.FC<NetworthBarGraphProps> = ({ networth }) => {
  if (!networth.length) {
    return <CircularSpinner />;
  }

  return (
    <div style={{ overflow: 'scroll' }}>
      <BarChart
        width={800}
        height={354}
        data={networth}
        barGap={2}
        barCategoryGap={20}
        margin={{
          top: 5,
          right: 5,
          left: 5,
          bottom: 5,
        }}
      >
        <XAxis dataKey='interval' tickSize={0} tickMargin={10} />
        <YAxis
          orientation='right'
          minTickGap={10}
          axisLine={false}
          tickSize={0}
          tickMargin={10}
          tickFormatter={(tick) => `$${tick}m`}
        />
        <Bar dataKey='investmentAssets' fill='#235EE7' />
        <Bar dataKey='liabilities' fill='#29CFD6' />
        <Bar dataKey='otherAssets' fill='#D3365F' />
      </BarChart>
    </div>
  );
};

export default NetworthBarGraph;
