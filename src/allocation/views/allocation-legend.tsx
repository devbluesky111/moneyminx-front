import React from 'react';

import { fNumber, numberWithCommas } from 'common/number.helper';
import { ellipseText } from 'common/common-helper';
import { ChartData } from 'allocation/allocation.type';
import { useAllocationState } from 'allocation/allocation.context';

interface Props {
  chartData: ChartData;
}

const COLORS = [
  '#235ee7',
  '#10c273',
  '#e74f99',
  '#ffd911',
  '#1f32ad',
  '#f7b164',
  '#16977f',
  '#158fff',
  '#ffbc02',
  '#f5325c',
  '#b5d539',
  '#c73cb9',
  '#29cfd6',
  '#7854f6',
  '#ec7100',
  '#c11a1a',
  '#d3365f',
  '#b1c0d2',
  '#454d7f',
  '#14b8b8',
];

const AllocationLegend: React.FC<Props> = ({ chartData }) => {
  const { allocationChartSetting } = useAllocationState();

  return (
    <div className='allocation-legend-wrapper'>
      {chartData.map((data, index) => {
        return (
          <div className='legend-row' key={index}>
              <span className='legend-color-box pl-0 col-1' style={{ backgroundColor: COLORS[index % COLORS.length] }} />
              {allocationChartSetting?.showAmounts ? <span className='legend-label col-8'>{ellipseText(data.group)} - {fNumber(data.per, 2)}%</span> : <span className='legend-label col-9'>{ellipseText(data.group)}</span>}
            {allocationChartSetting?.showAmounts ? <span className='legend-amount col-3'>${numberWithCommas(fNumber(data.total, 0))}</span> : <span className='legend-amount col-2'>{fNumber(data.per, 2)}%</span>}
          </div>
        );
      })}
    </div>
  );
};

export default AllocationLegend;
