import React, { useState } from 'react';

import AppHeader from 'common/app.header';
import AppFooter from 'common/app.footer';
import AppSidebar from 'common/app.sidebar';
import useAllocation from 'allocation/hooks/useAllocation';
import { AllocationsFilter } from 'allocation/allocation.enum';
import CircularSpinner from 'common/components/spinner/circular-spinner';

import { AllocationProps } from '../allocation.type';
import AllocationOverview from './allocation-overview';
import AllocationSubNavigation from './allocation-sub-navigation';

const Allocation: React.FC<AllocationProps> = () => {
  const [openLeftNav, setOpenLeftNav] = useState<boolean>(false);
  const [openRightNav, setOpenRightNav] = useState<boolean>(false);
  const [filter, setFilter] = useState(AllocationsFilter.TYPE);
  const { fetching, allocations, error, allocationChartData } = useAllocation(filter);

  if (fetching || error || !allocations || !allocationChartData) {
    return <CircularSpinner />;
  }

  const handleTypeChange = (type: AllocationsFilter) => {
    setFilter(type);
  };

  return (
    <div className='mm-setting mm-allocation'>
      <AppHeader
        toggleLeftMenu={() => setOpenLeftNav(!openLeftNav)}
        toggleRightMenu={() => setOpenRightNav(!openRightNav)}
      />
      <AppSidebar openLeft={openLeftNav} openRight={openRightNav} />
      <AllocationSubNavigation onTypeChange={handleTypeChange} filter={filter} />
      <div className='mm-slider-bg-overlay' />
      <AllocationOverview allocations={allocations} chartData={allocationChartData} filter={filter} />
      <AppFooter />
    </div>
  );
};

export default Allocation;
