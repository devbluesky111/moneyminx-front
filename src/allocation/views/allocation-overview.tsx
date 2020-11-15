import React from 'react';
import { Link } from 'react-router-dom';

import { fNumber } from 'common/number.helper';
import { useModal } from 'common/components/modal';
import { getStringDate } from 'common/moment.helper';
import { MMPieChart } from 'common/components/pie-chart';
import SettingModal from 'allocation/modal/setting-modal';
import useFileDownload from 'common/hooks/useFileDownload';
import ChartShareModal from 'allocation/modal/chart-share-modal';
import FieldChangeModal from 'allocation/modal/field-change-modal';
import { AllocationOverviewProps } from 'allocation/allocation.type';
import { ReactComponent as Share } from 'assets/images/allocation/share.svg';
import { ReactComponent as Download } from 'assets/images/allocation/download.svg';
import { ReactComponent as SettingsIcon } from 'assets/images/allocation/settings.svg';
import { ReactComponent as MeasureUpIcon } from 'assets/images/allocation/measure-up-icon.svg';
import { ReactComponent as AllocationChartSVG } from 'assets/images/allocation/allocation-chart.svg';
import { ReactComponent as AllocationLegendSVG } from 'assets/images/allocation/allocation-legend.svg';

import AllocationLegend from './allocation-legend';
import { SelectedAllocations } from './selected-allocation';

const AllocationOverview: React.FC<AllocationOverviewProps> = ({ allocations, chartData, filter }) => {
  const { df } = useFileDownload();
  const chartShareModal = useModal();
  const fieldChangeModal = useModal();
  const chartSettingModal = useModal();

  const getTotal = (key: string) => {
    return chartData.find((datum) => datum.group === key);
  };

  return (
    <section className='mm-allocation-overview'>
      <div className='row mm-allocation-overview__wrapper'>
        <div className='col-xl-4'>
          <div className='mm-allocation-overview__block'>
            <div className='allocation-card-top'>
              <div className='mm-allocation-overview__block--date'>{getStringDate()}</div>
              <div className='mm-allocation-overview__block--title'>Current allocation</div>
              <p className='mm-allocation-overview__block--subtitle'>Current allocation based on your holdings</p>
              <div className='mm-allocation-overview__block--action'>
                <SettingsIcon className='mr-3' onClick={() => chartSettingModal.open()} />
                <Download className='mr-3' onClick={() => df('current-allocation-pie-chart', 'current-allocation')} />
                <Share onClick={() => chartShareModal.open()} />
              </div>
            </div>
            <div className='allocation-content'>
              <div
                className='text-center text-md-left d-xl-block d-md-flex align-items-md-center justify-content-md-center p-b-4'
                id='current-allocation-pie-chart'
              >
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
                            <td
                              className='mm-allocation-overview__table--title'
                              onClick={() => fieldChangeModal.open()}
                            >
                              {allocationKey}
                            </td>
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
                                    {fNumber(al.per, 2)}%
                                  </td>
                                  <td>
                                    <span className='d-block'>Value</span>${fNumber(al.value, 2)}
                                  </td>
                                </tr>
                              </React.Fragment>
                            );
                          })}
                          <tr className='mm-allocation-overview__table--footer'>
                            <td>Total</td>
                            <td>{fNumber(getTotal(allocationKey)?.per || 0, 2)}%</td>
                            <td>${fNumber(getTotal(allocationKey)?.total || 0, 2)}</td>
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

        <SelectedAllocations filter={filter} />

        <div className='col-xl-4'>
          <div className='mm-allocation-overview__block'>
            <div className='allocation-card-top no-border'>
              <div className='mm-allocation-overview__block--date'>{getStringDate()}</div>
              <div className='mm-allocation-overview__block--title'>Similar Investors</div>
              <p className='mm-allocation-overview__block--subtitle'>
                Here’s how investors with similar profiles are currently allocated
              </p>
              <div className='mm-allocation-overview__block--action'>
                <Download className='mr-3' />
                <Share />
              </div>
            </div>
            <div className='text-center text-md-left d-xl-block d-md-flex align-items-md-center justify-content-md-center mm-allocation-overview__block-chart-overview'>
              <AllocationChartSVG className='mm-allocation-overview__block--chart' />
              <AllocationLegendSVG className='mm-allocation-overview__block--legend' />
              <div className='mm-allocation-overview__block-element text-center'>
                <div className='mm-allocation-overview__block-element--middle'>
                  <div className='d-inline-flex align-items-center'>
                    <MeasureUpIcon />
                    <div className='mm-allocation-overview__block-element--text ml-2'>Minx Measure-up</div>
                  </div>
                  <p>Portfolio comparisons are coming soon. Complete your profile for better results once live.</p>
                  <Link to='#' className='mm-btn-animate mm-btn-primary'>
                    Complete Profile
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <SettingModal settingModal={chartSettingModal} />
      <ChartShareModal
        chartShareModal={chartShareModal}
        chartComponent={<MMPieChart chartData={chartData} share />}
        chartLegendComponent={<AllocationLegend chartData={chartData} />}
      />
      <FieldChangeModal fieldChangeModal={fieldChangeModal} />
    </section>
  );
};

export default AllocationOverview;
