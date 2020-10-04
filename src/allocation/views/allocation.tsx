import React from 'react';
import { AllocationProps } from '../allocation.type';
import AllocationSubNavigation from './allocation-sub-navigation';
import NavBarSection from '../../setting/inc/setting.header';
import FooterSection from '../../setting/inc/setting.footer';
import AllocationOverview from './allocation-overview';
const Allocation: React.FC<AllocationProps> = () => {
  return (
    <div className='mm-setting mm-allocation'>
      <NavBarSection />
      <AllocationSubNavigation />
      <AllocationOverview />
      <FooterSection />
    </div>
  );
};

export default Allocation;
