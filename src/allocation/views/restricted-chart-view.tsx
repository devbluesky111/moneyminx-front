import React from 'react';
import { Link } from 'react-router-dom';

import { ReactComponent as AllocationChartSVG } from 'assets/images/allocation/allocation-chart.svg';
import { ReactComponent as AllocationLegendSVG } from 'assets/images/allocation/allocation-legend.svg';

const RestrictedChartView = () => {
  return (
    <div className='text-center text-md-left d-xl-block d-md-flex align-items-md-center justify-content-md-center mm-allocation-overview__block-chart-overview'>
      <AllocationChartSVG className='mm-allocation-overview__block--chart' />
      <AllocationLegendSVG className='mm-allocation-overview__block--legend' />
      <div className='mm-allocation-overview__block-element text-center'>
        <div className='mm-allocation-overview__block-element--middle'>
          <p>Your plan only allows you to go back [month_number] month. Upgrade for more history.</p>
          <Link to='/settings?active=Plan' className='mm-btn-animate mm-btn-primary'>
            Compare Plans
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RestrictedChartView;
