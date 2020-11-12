import React, { useState } from 'react';

import useAllocation from 'allocation/hooks/useAllocation';
import { AllocationsFilter } from 'allocation/allocation.enum';
import CircularSpinner from 'common/components/spinner/circular-spinner';

import { AllocationProps } from '../allocation.type';
import AllocationOverview from './allocation-overview';
import AllocationSubNavigation from './allocation-sub-navigation';
import AppLayout from 'layouts/app.layout';

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
      <AppLayout>
        <AllocationSubNavigation onTypeChange={handleTypeChange} filter={filter} />
        <AllocationOverview allocations={allocations} chartData={allocationChartData}
          filter={filter} />
      </AppLayout>
      <div className="mm-slider-bg-overlay" />
    </div>
  );
};

export default Allocation;
