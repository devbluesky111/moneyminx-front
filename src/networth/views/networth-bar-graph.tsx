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
        <XAxis dataKey='interval' tickSize={0} tickMargin={10} tick={{fontSize: 14}} stroke='#969eac'/>
        <YAxis
          orientation='right'
          minTickGap={10}
          axisLine={false}
          tickSize={0}
          tickMargin={10}
          tick={{fontSize: 14}}
          stroke='#969eac'
          tickFormatter={(tick) => `$${tick}m`}
        />
        <Bar dataKey='investmentAssets' barSize={10} fill='#235EE7' radius={[2, 2, 0, 0]}/>
        <Bar dataKey='liabilities' barSize={10} fill='#29CFD6' radius={[2, 2, 0, 0]}/>
        <Bar dataKey='otherAssets' barSize={10} fill='#D3365F' radius={[2, 2, 0, 0]}/>
      </BarChart>
    </div>
  );
};

export default NetworthBarGraph;
