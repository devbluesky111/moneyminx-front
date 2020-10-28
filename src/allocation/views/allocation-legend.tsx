import React from 'react';

import { fNumber } from 'common/number.helper';
import { ChartData } from 'allocation/allocation.type';

interface Props {
  chartData: ChartData;
}

const COLORS = ['#235EE7', '#1F32AD', '#FFBC02', '#29CFD6', '#D3365F'];

const AllocationLegend: React.FC<Props> = ({ chartData }) => {
  return (
    <div className='mm-allocation-legend-wrapper'>
      {chartData.map((data, index) => {
        return (
          <div className='legend-row' key={index}>
            <div className='color-title'>
              <span className='legend-color-box' style={{ backgroundColor: COLORS[index % COLORS.length] }} />
              <span className='p-r-1'>
                {data.group} - {fNumber(data.per)}%
              </span>
            </div>
            <span>${fNumber(data.total)}</span>
          </div>
        );
      })}
    </div>
  );
};

export default AllocationLegend;
