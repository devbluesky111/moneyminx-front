import React, { useState } from 'react';

import AppHeader from 'common/app.header';
import useAllocation from 'allocation/hooks/useAllocation';
import { AllocationsFilter } from 'allocation/allocation.enum';
import CircularSpinner from 'common/components/spinner/circular-spinner';

import { AllocationProps } from '../allocation.type';
import AllocationOverview from './allocation-overview';
import FooterSection from '../../setting/inc/setting.footer';
import AllocationSubNavigation from './allocation-sub-navigation';

const Allocation: React.FC<AllocationProps> = () => {
  const [filter, setFilter] = useState(AllocationsFilter.TYPE);
  const { fetching, allocations, error, allocationChartData } = useAllocation(filter);
  const [openNav, setOpenNav] = useState<boolean>(false);

  if (fetching || error || !allocations || !allocationChartData) {
    return <CircularSpinner />;
  }

  const handleTypeChange = (type: AllocationsFilter) => {
    setFilter(type);
  };

  return (
    <div className='mm-setting mm-allocation'>
      <AppHeader toggleMenu={() => setOpenNav(!openNav)} />
      <AllocationSubNavigation onTypeChange={handleTypeChange} filter={filter} />
      <AllocationOverview allocations={allocations} chartData={allocationChartData} filter={filter} />
      <FooterSection />
    </div>
  );
};

export default Allocation;
