import React from 'react';
import { ReactComponent as SettingsIcon } from '../../assets/images/allocation/settings.svg';
import { ReactComponent as Download } from '../../assets/images/allocation/download.svg';
import { ReactComponent as Share } from '../../assets/images/allocation/share.svg';
import { ReactComponent as AllocationChart } from
'../../assets/images/allocation/allocation-chart.svg';
import { ReactComponent as AllocationLegend } from
'../../assets/images/allocation/allocation-legend.svg';
import { ReactComponent as Calendar } from '../../assets/images/allocation/calendar.svg';
import { ReactComponent as MeasureUpIcon } from
'../../assets/images/allocation/measure-up-icon.svg';
import Button from 'react-bootstrap/Button'

const AllocationOverview = () => {
return (
<section className='mm-allocation-overview'>
  <div className='row mm-allocation-overview__wrapper'>
    <div className='col-xl-4'>
      <div className='mm-allocation-overview__block'>
        <div className='mm-allocation-overview__block--date'>June 30, 2020</div>
        <div className='mm-allocation-overview__block--title'>Currnet allocation</div>
        <p>Current allocation based on your holdings</p>
        <div className='mm-allocation-overview__block--action'>
          <SettingsIcon className='mr-3' />
          <Download className='mr-3' />
          <Share />
        </div>
        <hr className='mb-4' />
        <div
          className='text-center d-xl-block d-md-flex align-items-md-center justify-content-md-center'>
          <AllocationChart className='mm-allocation-overview__block--chart' />
          <AllocationLegend className='mm-allocation-overview__block--legend' />
        </div>
        <hr className='my-5' />
        <div className='mm-allocation-overview__table'>
          <table>
            <tr>
              <th className='mm-allocation-overview__table--head'>Position</th>
              <th className='mm-allocation-overview__table--head'>Type</th>
              <th className='mm-allocation-overview__table--head'>Allocation</th>
              <th className='mm-allocation-overview__table--head'>Value</th>
            </tr>
            <tr>
              <td className='mm-allocation-overview__table--title'>
                401K
              </td>
            </tr>
            <tr className='mm-allocation-overview__table--data-row-mobile'>
              <p className='mt-2 mb-0'>WealthFront</p>
            </tr>
            <tr className='mm-allocation-overview__table--data-row'>
              <td>WealthFront</td>
              <td><span className='d-block'>Type</span>Bonds</td>
              <td><span className='d-block'>Allocation</span>20%</td>
              <td><span className='d-block'>Value</span>$75,000</td>
            </tr>
            <tr className='mm-allocation-overview__table--data-row-mobile'>
              <p className='mt-2 mb-0'>401K</p>
            </tr>
            <tr className='mm-allocation-overview__table--data-row'>
              <td>401K</td>
              <td><span className='d-block'>Type</span>Mutual Funds</td>
              <td><span className='d-block'>Allocation</span>20%</td>
              <td><span className='d-block'>Value</span>$75,000</td>
            </tr>
            <tr className='mm-allocation-overview__table--data-row-mobile'>
              <p className='mt-2 mb-0'>Merill Edge IRA</p>
            </tr>
            <tr className='mm-allocation-overview__table--data-row'>
              <td>Merill Edge IRA</td>
              <td><span className='d-block'>Type</span>Munis</td>
              <td><span className='d-block'>Allocation</span>20%</td>
              <td><span className='d-block'>Value</span>$75,000</td>
            </tr>
            <tr className='mm-allocation-overview__table--data-row-mobile'>
              <p className='mt-2 mb-0'>Fundraise</p>
            </tr>
            <tr className='mm-allocation-overview__table--data-row'>
              <td>Fundraise</td>
              <td><span className='d-block'>Type</span>Real Estate</td>
              <td><span className='d-block'>Allocation</span>20%</td>
              <td><span className='d-block'>Value</span>$75,000</td>
            </tr>
            <tr className='mm-allocation-overview__table--data-row-mobile'>
              <p className='mt-2 mb-0'>Peer Street</p>
            </tr>
            <tr className='mm-allocation-overview__table--data-row'>
              <td>Peer Street</td>
              <td><span className='d-block'>Type</span>Update</td>
              <td><span className='d-block'>Allocation</span>20%</td>
              <td><span className='d-block'>Value</span>$75,000</td>
            </tr>
            <tr className='mm-allocation-overview__table--footer'>
              <td>Total</td>
              <td></td>
              <td>15%</td>
              <td>$1,075.000</td>
            </tr>
            <tr>
              <td className='mm-allocation-overview__table--title'>
                WealtFront
              </td>
            </tr>
            <tr className='mm-allocation-overview__table--data-row'>
              <td>WealthFront</td>
              <td><span className='d-block'>Type</span>Bonds</td>
              <td><span className='d-block'>Allocation</span>20%</td>
              <td><span className='d-block'>Value</span>$75,000</td>
            </tr>
            <tr className='mm-allocation-overview__table--data-row-mobile'>
              <p className='mt-2 mb-0'>401K</p>
            </tr>
            <tr className='mm-allocation-overview__table--data-row'>
              <td>401K</td>
              <td><span className='d-block'>Type</span>Mutual Funds</td>
              <td><span className='d-block'>Allocation</span>20%</td>
              <td><span className='d-block'>Value</span>$75,000</td>
            </tr>
            <tr className='mm-allocation-overview__table--data-row-mobile'>
              <p className='mt-2 mb-0'>Merill Edge IRA</p>
            </tr>
            <tr className='mm-allocation-overview__table--data-row'>
              <td>Merill Edge IRA</td>
              <td><span className='d-block'>Type</span>Munis</td>
              <td><span className='d-block'>Allocation</span>20%</td>
              <td><span className='d-block'>Value</span>$75,000</td>
            </tr>
            <tr className='mm-allocation-overview__table--data-row-mobile'>
              <p className='mt-2 mb-0'>Fundraise</p>
            </tr>
            <tr className='mm-allocation-overview__table--data-row'>
              <td>Fundraise</td>
              <td><span className='d-block'>Type</span>Real Estate</td>
              <td><span className='d-block'>Allocation</span>20%</td>
              <td><span className='d-block'>Value</span>$75,000</td>
            </tr>
            <tr className='mm-allocation-overview__table--data-row-mobile'>
              <p className='mt-2 mb-0'>Peer Street</p>
            </tr>
            <tr className='mm-allocation-overview__table--data-row'>
              <td>Peer Street</td>
              <td><span className='d-block'>Type</span>Update</td>
              <td><span className='d-block'>Allocation</span>20%</td>
              <td><span className='d-block'>Value</span>$75,000</td>
            </tr>
            <tr className='mm-allocation-overview__table--footer'>
              <td>Total</td>
              <td></td>
              <td>15%</td>
              <td>$1,075.000</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
    <div className='col-xl-4'>
      <div className='mm-allocation-overview__block'>
        <div className='mm-allocation-overview__block--date'>June 30, 2020
          <span className='float-right'>
            <Calendar /></span>
        </div>
        <div className='mm-allocation-overview__block--title'>Previous allocations</div>
        <p>Use the dropdown above to see your previous allocations</p>
        <div className='mm-allocation-overview__block--action'>
          <SettingsIcon className='mr-3' />
          <Download className='mr-3' />
          <Share />
        </div>
        <hr className='mb-4' />
        <div
          className='text-center d-xl-block d-md-flex align-items-md-center justify-content-md-center'>
          <AllocationChart className='mm-allocation-overview__block--chart' />
          <AllocationLegend className='mm-allocation-overview__block--legend' />
        </div>
        <hr className='my-5' />
        <div className='mm-allocation-overview__table'>
          <table>
            <tr>
              <th className='mm-allocation-overview__table--head'>Position</th>
              <th className='mm-allocation-overview__table--head'>Type</th>
              <th className='mm-allocation-overview__table--head'>Allocation</th>
              <th className='mm-allocation-overview__table--head'>Value</th>
            </tr>
            <tr>
              <td className='mm-allocation-overview__table--title'>
                401K
              </td>
            </tr>
            <tr className='mm-allocation-overview__table--data-row-mobile'>
              <p className='mt-2 mb-0'>WealthFront</p>
            </tr>
            <tr className='mm-allocation-overview__table--data-row'>
              <td>WealthFront</td>
              <td><span className='d-block'>Type</span>Bonds</td>
              <td><span className='d-block'>Allocation</span>20%</td>
              <td><span className='d-block'>Value</span>$75,000</td>
            </tr>
            <tr className='mm-allocation-overview__table--data-row-mobile'>
              <p className='mt-2 mb-0'>401K</p>
            </tr>
            <tr className='mm-allocation-overview__table--data-row'>
              <td>401K</td>
              <td><span className='d-block'>Type</span>Mutual Funds</td>
              <td><span className='d-block'>Allocation</span>20%</td>
              <td><span className='d-block'>Value</span>$75,000</td>
            </tr>
            <tr className='mm-allocation-overview__table--data-row-mobile'>
              <p className='mt-2 mb-0'>Merill Edge IRA</p>
            </tr>
            <tr className='mm-allocation-overview__table--data-row'>
              <td>Merill Edge IRA</td>
              <td><span className='d-block'>Type</span>Munis</td>
              <td><span className='d-block'>Allocation</span>20%</td>
              <td><span className='d-block'>Value</span>$75,000</td>
            </tr>
            <tr className='mm-allocation-overview__table--data-row-mobile'>
              <p className='mt-2 mb-0'>Fundraise</p>
            </tr>
            <tr className='mm-allocation-overview__table--data-row'>
              <td>Fundraise</td>
              <td><span className='d-block'>Type</span>Real Estate</td>
              <td><span className='d-block'>Allocation</span>20%</td>
              <td><span className='d-block'>Value</span>$75,000</td>
            </tr>
            <tr className='mm-allocation-overview__table--data-row-mobile'>
              <p className='mt-2 mb-0'>Peer Street</p>
            </tr>
            <tr className='mm-allocation-overview__table--data-row'>
              <td>Peer Street</td>
              <td><span className='d-block'>Type</span>Update</td>
              <td><span className='d-block'>Allocation</span>20%</td>
              <td><span className='d-block'>Value</span>$75,000</td>
            </tr>
            <tr className='mm-allocation-overview__table--footer'>
              <td>Total</td>
              <td></td>
              <td>15%</td>
              <td>$1,075.000</td>
            </tr>
            <tr>
              <td className='mm-allocation-overview__table--title'>
                WealtFront
              </td>
            </tr>
            <tr className='mm-allocation-overview__table--data-row'>
              <td>WealthFront</td>
              <td><span className='d-block'>Type</span>Bonds</td>
              <td><span className='d-block'>Allocation</span>20%</td>
              <td><span className='d-block'>Value</span>$75,000</td>
            </tr>
            <tr className='mm-allocation-overview__table--data-row-mobile'>
              <p className='mt-2 mb-0'>401K</p>
            </tr>
            <tr className='mm-allocation-overview__table--data-row'>
              <td>401K</td>
              <td><span className='d-block'>Type</span>Mutual Funds</td>
              <td><span className='d-block'>Allocation</span>20%</td>
              <td><span className='d-block'>Value</span>$75,000</td>
            </tr>
            <tr className='mm-allocation-overview__table--data-row-mobile'>
              <p className='mt-2 mb-0'>Merill Edge IRA</p>
            </tr>
            <tr className='mm-allocation-overview__table--data-row'>
              <td>Merill Edge IRA</td>
              <td><span className='d-block'>Type</span>Munis</td>
              <td><span className='d-block'>Allocation</span>20%</td>
              <td><span className='d-block'>Value</span>$75,000</td>
            </tr>
            <tr className='mm-allocation-overview__table--data-row-mobile'>
              <p className='mt-2 mb-0'>Fundraise</p>
            </tr>
            <tr className='mm-allocation-overview__table--data-row'>
              <td>Fundraise</td>
              <td><span className='d-block'>Type</span>Real Estate</td>
              <td><span className='d-block'>Allocation</span>20%</td>
              <td><span className='d-block'>Value</span>$75,000</td>
            </tr>
            <tr className='mm-allocation-overview__table--data-row-mobile'>
              <p className='mt-2 mb-0'>Peer Street</p>
            </tr>
            <tr className='mm-allocation-overview__table--data-row'>
              <td>Peer Street</td>
              <td><span className='d-block'>Type</span>Update</td>
              <td><span className='d-block'>Allocation</span>20%</td>
              <td><span className='d-block'>Value</span>$75,000</td>
            </tr>
            <tr className='mm-allocation-overview__table--footer'>
              <td>Total</td>
              <td></td>
              <td>15%</td>
              <td>$1,075.000</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
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
        <div
          className='text-center d-xl-block d-md-flex align-items-md-center justify-content-md-center mm-allocation-overview__block-chart-overview'>
          <AllocationChart className='mm-allocation-overview__block--chart' />
          <AllocationLegend className='mm-allocation-overview__block--legend' />
          <div className='mm-allocation-overview__block-element text-center'>
            <div className='mm-allocation-overview__block-element--middle'>
              <div className='d-inline-flex align-items-center'>
                <MeasureUpIcon />
                <div className='mm-allocation-overview__block-element--text ml-2'>Minx Measure-up
                </div>
              </div>
              <p>
                Portfolio comparisons are coming soon.
                Complete your profile for better results
                once live.
              </p>
              <Button className='w-100' variant="primary">Complete Profile</Button>
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
