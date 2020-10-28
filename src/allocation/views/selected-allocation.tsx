import React, { useState } from 'react';

import { fNumber } from 'common/number.helper';
import ReactDatePicker from 'react-datepicker';
import { MMPieChart } from 'common/components/pie-chart';
import useAllocation from 'allocation/hooks/useAllocation';
import { SelectedAllocationProps } from 'allocation/allocation.type';
import CircularSpinner from 'common/components/spinner/circular-spinner';
import { ReactComponent as Share } from 'assets/images/allocation/share.svg';
import { ReactComponent as Calendar } from 'assets/images/allocation/calendar.svg';
import { ReactComponent as Download } from 'assets/images/allocation/download.svg';
import { ReactComponent as SettingsIcon } from 'assets/images/allocation/settings.svg';

import AllocationLegend from './allocation-legend';
import { getStringDate } from 'common/moment.helper';

export const SelectedAllocations: React.FC<SelectedAllocationProps> = ({ filter }) => {
  const [date, setDate] = useState<Date | null>(null);
  const { fetching, allocations, error, allocationChartData: chartData } = useAllocation(filter, date?.toISOString());

  if (fetching || error || !allocations || !chartData) {
    return <CircularSpinner />;
  }

  const getTotal = (key: string) => {
    return chartData.find((datum) => datum.group === key);
  };

  return (
    <div className='col-xl-4'>
      <div className='mm-allocation-overview__block'>
        <div className='allocation-card-top'>
          <div className='mm-allocation-overview__block--date'>
            {getStringDate(date || undefined)}
            <span className='float-right'>
              <ReactDatePicker
                selected={date}
                customInput={<Calendar />}
                dateFormat='MM/yyyy'
                showMonthYearPicker
                onChange={(val: Date) => {
                  setDate(val);
                }}
              />
            </span>
          </div>
          <div className='mm-allocation-overview__block--title'>Previous allocations</div>
          <p className='mm-allocation-overview__block--subtitle'>
            Use the arrows above to see your previous allocations
          </p>
          <div className='mm-allocation-overview__block--action'>
            <SettingsIcon className='mr-3' />
            <Download className='mr-3' />
            <Share />
          </div>
        </div>
        <div className='allocation-content'>
          <div className='text-center text-md-left d-xl-block d-md-flex align-items-md-center justify-content-md-center'>
            <MMPieChart chartData={chartData} />
            <AllocationLegend chartData={chartData} />
          </div>
          <div className='mm-allocation-overview__table'>
            <table>
              <thead>
                <tr>
                  <th className='mm-allocation-overview__table--head'>Position</th>
                  <th className='mm-allocation-overview__table--head'>Allocation</th>
                  <th className='mm-allocation-overview__table--head'>Value</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(allocations).map((allocationKey, index) => {
                  const allocation = allocations[allocationKey];

                  return (
                    <React.Fragment key={index}>
                      <tr>
                        <td className='mm-allocation-overview__table--title'>{allocationKey}</td>
                      </tr>
                      {allocation?.map((al) => {
                        return (
                          <React.Fragment key={al.id}>
                            <tr className='mm-allocation-overview__table--data-row-mobile'>
                              <span className='mt-2 mb-0'>{al.description}</span>
                            </tr>
                            <tr className='mm-allocation-overview__table--data-row'>
                              <td>{al.description}</td>
                              <td>
                                <span className='d-block'>Allocation</span>
                                {fNumber(al.per)}%
                              </td>
                              <td>
                                <span className='d-block'>Value</span>${fNumber(al.value)}
                              </td>
                            </tr>
                          </React.Fragment>
                        );
                      })}
                      <tr className='mm-allocation-overview__table--footer'>
                        <td>Total</td>
                        <td>{fNumber(getTotal(allocationKey)?.per || 0)}%</td>
                        <td>${fNumber(getTotal(allocationKey)?.total || 0)}</td>
                      </tr>
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
