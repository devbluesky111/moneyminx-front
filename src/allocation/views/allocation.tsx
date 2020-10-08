import React, { useState } from 'react';

import useAllocation from 'allocation/hooks/useAllocation';
import { AllocationsFilter } from 'allocation/allocation.enum';
import CircularSpinner from 'common/components/spinner/circular-spinner';

import { AllocationProps } from '../allocation.type';
import AllocationOverview from './allocation-overview';
import NavBarSection from '../../setting/inc/setting.header';
import FooterSection from '../../setting/inc/setting.footer';
import AllocationSubNavigation from './allocation-sub-navigation';

const Allocation: React.FC<AllocationProps> = () => {
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
      <NavBarSection />
      <AllocationSubNavigation onTypeChange={handleTypeChange} filter={filter} />
      <AllocationOverview allocations={allocations} chartData={allocationChartData} filter={filter} />
      <FooterSection />
    </div>
  );
};

export default Allocation;
