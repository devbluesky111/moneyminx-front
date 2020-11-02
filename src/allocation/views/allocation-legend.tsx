import React from 'react';

import { fNumber } from 'common/number.helper';
import { ChartData } from 'allocation/allocation.type';

interface Props {
  chartData: ChartData;
}

const COLORS = ['#235ee7', '#10c273', '#e74f99', '#ffd911', '#1f32ad', '#f7b164', '#16977f', '#158fff', '#ffbc02', '#f5325c', '#b5d539', '#c73cb9', '#29cfd6', '#7854f6', '#ec7100', '#c11a1a', '#d3365f', '#b1c0d2', '#454d7f', '#14b8b8'];

const AllocationLegend: React.FC<Props> = ({ chartData }) => {
  return (
    <div className='allocation-legend-wrapper'>
      {chartData.map((data, index) => {
        return (
          <div className='legend-row' key={index}>
            <span className='col-1 pl-0'> <span className='legend-color-box' style={{ backgroundColor: COLORS[index % COLORS.length] }} /></span>
              <span className='col-8 legend-label'>{data.group} - {fNumber(data.per)}%</span>
              <span className='col-3 legend-amount'>${fNumber(data.total)}</span>
          </div>
        );
      })}
    </div>
  );
};

export default AllocationLegend;
