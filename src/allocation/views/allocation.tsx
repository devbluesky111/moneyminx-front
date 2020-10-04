import React from 'react';
import { AllocationProps } from '../allocation.type';
import AllocationOverview from './allocation-overview';
import NavBarSection from '../../setting/inc/setting.header';
import FooterSection from '../../setting/inc/setting.footer';
import AllocationSubNavigation from './allocation-sub-navigation';
import useAllocation from 'allocation/hooks/useAllocation';
import CircularSpinner from 'common/components/spinner/circular-spinner';

const Allocation: React.FC<AllocationProps> = () => {
  const { fetching, allocations, error, allocationChartData } = useAllocation();

  if (fetching || error || !allocations || !allocationChartData) {
    return <CircularSpinner />;
  }

  return (
    <div className='mm-setting mm-allocation'>
      <NavBarSection />
      <AllocationSubNavigation />
      <AllocationOverview allocations={allocations} chartData={allocationChartData} />
      <FooterSection />
    </div>
  );
};

export default Allocation;
