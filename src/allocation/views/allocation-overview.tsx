import React from 'react';
import Button from 'react-bootstrap/Button';

import { fNumber } from 'common/number.helper';
import { MMPieChart } from 'common/components/pie-chart';
import { Allocations, ChartData } from 'allocation/allocation.type';
import { ReactComponent as Share } from 'assets/images/allocation/share.svg';
import { ReactComponent as Download } from 'assets/images/allocation/download.svg';
import { ReactComponent as SettingsIcon } from 'assets/images/allocation/settings.svg';
import { ReactComponent as MeasureUpIcon } from 'assets/images/allocation/measure-up-icon.svg';
import { ReactComponent as AllocationChartSVG } from 'assets/images/allocation/allocation-chart.svg';
import { ReactComponent as AllocationLegendSVG } from 'assets/images/allocation/allocation-legend.svg';

import AllocationLegend from './allocation-legend';
import { SelectedAllocations } from './selected-allocation';

interface AllocationOverviewProps {
  allocations: Allocations;
  chartData: ChartData;
}

const AllocationOverview: React.FC<AllocationOverviewProps> = ({ allocations, chartData }) => {
  const getTotal = (key: string) => {
    return chartData.find((datum) => datum.group === key);
  };

  return (
    <section className='mm-allocation-overview'>
      <div className='row mm-allocation-overview__wrapper'>
        <div className='col-xl-4'>
          <div className='mm-allocation-overview__block'>
            <div className='mm-allocation-overview__block--date'>June 30, 2020</div>
            <div className='mm-allocation-overview__block--title'>Current allocation</div>
            <p>Current allocation based on your holdings</p>
            <div className='mm-allocation-overview__block--action'>
              <SettingsIcon className='mr-3' />
              <Download className='mr-3' />
              <Share />
            </div>
            <hr className='mb-4' />
            <div className='allocation-content'>
              <div className='text-center d-xl-block d-md-flex align-items-md-center justify-content-md-center'>
                <MMPieChart chartData={chartData} />
                <AllocationLegend chartData={chartData} />
              </div>
              <hr className='my-5' />
              <div className='mm-allocation-overview__table'>
                <table>
                  <tr>
                    <th className='mm-allocation-overview__table--head'>Position</th>
                    <th className='mm-allocation-overview__table--head'>Allocation</th>
                    <th className='mm-allocation-overview__table--head'>Value</th>
                  </tr>
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
                                <p className='mt-2 mb-0'>{al.description}</p>
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
                </table>
              </div>
            </div>
          </div>
        </div>

        <SelectedAllocations allocations={allocations} chartData={chartData} />

        <div className='col-xl-4'>
          <div className='mm-allocation-overview__block'>
            <div className='mm-allocation-overview__block--date'>June 30, 2020</div>
            <div className='mm-allocation-overview__block--title'>Similar Investors</div>
            <p>Here’s how investors with similar profiles are currently allocated</p>
            <div className='mm-allocation-overview__block--action'>
              <Download className='mr-3' />
              <Share />
            </div>
            <hr className='mb-4' />
            <div className='text-center d-xl-block d-md-flex align-items-md-center justify-content-md-center mm-allocation-overview__block-chart-overview'>
              <AllocationChartSVG className='mm-allocation-overview__block--chart' />
              <AllocationLegendSVG className='mm-allocation-overview__block--legend' />
              <div className='mm-allocation-overview__block-element text-center'>
                <div className='mm-allocation-overview__block-element--middle'>
                  <div className='d-inline-flex align-items-center'>
                    <MeasureUpIcon />
                    <div className='mm-allocation-overview__block-element--text ml-2'>Minx Measure-up</div>
                  </div>
                  <p>Portfolio comparisons are coming soon. Complete your profile for better results once live.</p>
                  <Button className='w-100' variant='primary'>
                    Complete Profile
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AllocationOverview;
