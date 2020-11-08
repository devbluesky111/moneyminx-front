import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

import { NetworthBarGraphCustomTooltipProps } from 'networth/networth.type';

const NetworthBarGraphCustomTooltip: React.FC<NetworthBarGraphCustomTooltipProps> = ({ netItem }) => {
  console.log("dddddddddd", netItem);
  return (
    <div style={{ overflow: 'scroll' }}>
      dddddddddd
    </div>
  );
};

export default NetworthBarGraphCustomTooltip;
